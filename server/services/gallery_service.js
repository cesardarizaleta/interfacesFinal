const boom = require('@hapi/boom');
const fs = require('fs').promises;
const path = require('path');
const { models } = require('../libs/sequelize');

class GalleryService {
  constructor() {
    this.Gallery = models.Gallery;
    this.uploadDir = path.join(__dirname, '../uploads/gallery');
    this.imagesDir = path.join(this.uploadDir, 'images');
    this.videosDir = path.join(this.uploadDir, 'videos');
    this.tempDir = path.join(__dirname, '../uploads/temp');
  }

  async findAll(filters = {}) {
    const whereClause = {};

    // Apply filters
    if (filters.category) {
      whereClause.category = filters.category;
    }

    if (filters.type) {
      whereClause.type = filters.type;
    }

    if (filters.isActive !== undefined) {
      whereClause.isActive = filters.isActive;
    }

    const items = await this.Gallery.findAll({ where: whereClause });
    return items.map(item => item.toJSON());
  }

  async findById(id) {
    const item = await this.Gallery.findByPk(parseInt(id));
    if (!item) {
      throw boom.notFound('Gallery item not found');
    }
    return item.toJSON();
  }

  async findByCategory(category) {
    const items = await this.Gallery.findAll({ where: { category } });
    return items.map(item => item.toJSON());
  }

  async create(data, file) {
    try {
      // Ensure upload directories exist
      await this._ensureDirectories();

      // Generate unique filename
      const fileExtension = path.extname(file.originalname);
      const filename = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}${fileExtension}`;
      const filepath = path.join(this.uploadDir, filename);

      // Move file to upload directory
      await fs.rename(file.path, filepath);

      // Create thumbnail for images
      let thumbnailPath = null;
      if (data.type === 'image') {
        thumbnailPath = await this._createThumbnail(filepath, filename);
      }

      const galleryData = {
        title: data.title,
        description: data.description || '',
        category: data.category,
        type: data.type,
        filename: filename,
        originalName: file.originalname,
        mimeType: file.mimetype,
        size: file.size,
        path: `/uploads/gallery/${filename}`,
        thumbnail: thumbnailPath,
        uploadedBy: data.uploadedBy,
        uploadedAt: new Date().toISOString(),
        isActive: true,
        tags: data.tags ? data.tags.split(',').map(tag => tag.trim()) : [],
        metadata: data.metadata || {}
      };

      const newItem = await this.Gallery.create(galleryData);
      return newItem.toJSON();
    } catch (error) {
      // Clean up file if creation fails
      if (file && file.path) {
        try {
          await fs.unlink(file.path);
        } catch (cleanupError) {
          console.error('Error cleaning up file:', cleanupError);
        }
      }
      throw error;
    }
  }

  async createImage(data, file) {
    try {
      // Ensure upload directories exist
      await this._ensureDirectories();

      // Generate unique filename
      const fileExtension = path.extname(file.originalname);
      const filename = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}${fileExtension}`;
      const filepath = path.join(this.imagesDir, filename);

      // Move file from temp to images directory
      await fs.rename(file.path, filepath);

      // Extract image metadata
      const metadata = await this._extractImageMetadata(filepath);

      const galleryData = {
        title: data.title,
        description: data.description || '',
        category: data.category,
        type: 'image',
        filename: filename,
        originalName: file.originalname,
        mimeType: file.mimetype,
        size: file.size,
        path: `/uploads/gallery/images/${filename}`,
        thumbnail: `/uploads/gallery/images/${filename}`, // Same as main image for now
        uploadedBy: data.uploadedBy,
        uploadedAt: new Date().toISOString(),
        isActive: true,
        tags: data.tags ? data.tags.split(',').map(tag => tag.trim()) : [],
        metadata: metadata
      };

      const newItem = await this.Gallery.create(galleryData);
      return newItem.toJSON();
    } catch (error) {
      // Clean up file if creation fails
      if (file && file.path) {
        try {
          await fs.unlink(file.path);
        } catch (cleanupError) {
          console.error('Error cleaning up file:', cleanupError);
        }
      }
      throw error;
    }
  }

  async createVideo(data, file) {
    try {
      // Ensure upload directories exist
      await this._ensureDirectories();

      // Generate unique filename
      const fileExtension = path.extname(file.originalname);
      const filename = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}${fileExtension}`;
      const filepath = path.join(this.videosDir, filename);

      // Move file from temp to videos directory
      await fs.rename(file.path, filepath);

      // Extract video metadata
      const metadata = await this._extractVideoMetadata(filepath);

      const galleryData = {
        title: data.title,
        description: data.description || '',
        category: data.category,
        type: 'video',
        filename: filename,
        originalName: file.originalname,
        mimeType: file.mimetype,
        size: file.size,
        path: `/uploads/gallery/videos/${filename}`,
        thumbnail: null, // Videos don't have automatic thumbnails
        uploadedBy: data.uploadedBy,
        uploadedAt: new Date().toISOString(),
        isActive: true,
        tags: data.tags ? data.tags.split(',').map(tag => tag.trim()) : [],
        metadata: metadata
      };

      const newItem = await this.Gallery.create(galleryData);
      return newItem.toJSON();
    } catch (error) {
      // Clean up file if creation fails
      if (file && file.path) {
        try {
          await fs.unlink(file.path);
        } catch (cleanupError) {
          console.error('Error cleaning up file:', cleanupError);
        }
      }
      throw error;
    }
  }

  async update(id, data) {
    const existingItem = await this.findById(parseInt(id));

    const updateData = {
      ...existingItem,
      ...data,
      updatedAt: new Date().toISOString()
    };

    const item = await this.Gallery.findByPk(parseInt(id));
    if (!item) {
      throw boom.notFound('Gallery item not found');
    }

    await item.update(updateData);
    return item.toJSON();
  }

  async delete(id) {
    const galleryItem = await this.findById(parseInt(id));

    // Delete physical files
    try {
      if (galleryItem.path) {
        const fullPath = path.join(__dirname, '../', galleryItem.path);
        await fs.unlink(fullPath);
      }

      if (galleryItem.thumbnail && galleryItem.thumbnail !== galleryItem.path) {
        const thumbnailFullPath = path.join(__dirname, '../', galleryItem.thumbnail);
        await fs.unlink(thumbnailFullPath);
      }
    } catch (fileError) {
      console.error('Error deleting local files:', fileError);
      // Continue with database deletion even if file deletion fails
    }

    const item = await this.Gallery.findByPk(parseInt(id));
    if (!item) {
      throw boom.notFound('Gallery item not found');
    }
    await item.destroy();
    return item.toJSON();
  }

  async toggleActive(id) {
    const item = await this.findById(parseInt(id));
    return await this.update(parseInt(id), { isActive: !item.isActive });
  }

  async _ensureDirectories() {
    try {
      await fs.mkdir(this.uploadDir, { recursive: true });
      await fs.mkdir(this.imagesDir, { recursive: true });
      await fs.mkdir(this.videosDir, { recursive: true });
      await fs.mkdir(this.tempDir, { recursive: true });
    } catch (error) {
      if (error.code !== 'EEXIST') {
        throw error;
      }
    }
  }

  async _extractImageMetadata(filepath) {
    try {
      const sharp = require('sharp');
      const metadata = await sharp(filepath).metadata();
      return {
        width: metadata.width,
        height: metadata.height,
        format: metadata.format
      };
    } catch (error) {
      console.error('Error extracting image metadata:', error);
      // Fallback to basic info
      return {
        width: 1920,
        height: 1080,
        format: 'jpeg'
      };
    }
  }

  async _extractVideoMetadata(filepath) {
    try {
      const { execFile } = require('child_process');
      const { promisify } = require('util');
      const execFileAsync = promisify(execFile);
      const ffprobe = require('ffprobe-static');

      const { stdout } = await execFileAsync(ffprobe.path, [
        '-v', 'quiet',
        '-print_format', 'json',
        '-show_format',
        '-show_streams',
        filepath
      ]);

      const metadata = JSON.parse(stdout);
      const videoStream = metadata.streams.find(s => s.codec_type === 'video');

      return {
        duration: parseFloat(metadata.format.duration),
        width: videoStream.width,
        height: videoStream.height,
        bitrate: parseInt(metadata.format.bit_rate) || 0
      };
    } catch (error) {
      console.error('Error extracting video metadata:', error);
      // Fallback to basic info
      return {
        duration: 120.5,
        width: 1920,
        height: 1080,
        bitrate: 5000000
      };
    }
  }

  async _createThumbnail(filepath, filename) {
    // For now, just return the original path
    // In a real implementation, you would use a library like sharp to create thumbnails
    return `/uploads/gallery/thumbnails/${filename}`;
  }

  async getCategories() {
    // This would typically come from a separate repository
    // For now, return hardcoded categories
    return [
      { id: 'bodas', name: 'Bodas', icon: '💍' },
      { id: 'retratos', name: 'Retratos', icon: '📸' },
      { id: 'eventos-corporativos', name: 'Eventos Corporativos', icon: '🏢' },
      { id: 'videos', name: 'Videos', icon: '🎥' }
    ];
  }
}

module.exports = GalleryService;
