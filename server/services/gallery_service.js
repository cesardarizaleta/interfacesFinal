const boom = require('@hapi/boom');
const fs = require('fs').promises;
const path = require('path');

class GalleryService {
  constructor(repository) {
    this.repository = repository;
    this.uploadDir = path.join(__dirname, '../uploads/gallery');
    this.thumbnailDir = path.join(this.uploadDir, 'thumbnails');
  }

  async findAll(filters = {}) {
    let items = await this.repository.findAll();

    // Apply filters
    if (filters.category) {
      items = items.filter(item => item.category === filters.category);
    }

    if (filters.type) {
      items = items.filter(item => item.type === filters.type);
    }

    if (filters.isActive !== undefined) {
      items = items.filter(item => item.isActive === filters.isActive);
    }

    return items;
  }

  async findById(id) {
    const item = await this.repository.findById(id);
    if (!item) {
      throw boom.notFound('Gallery item not found');
    }
    return item;
  }

  async findByCategory(category) {
    return await this.repository.findByCategory(category);
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
        id: `gallery-${Date.now()}`,
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

      return await this.repository.create(galleryData);
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
    const existingItem = await this.findById(id);

    const updateData = {
      ...existingItem,
      ...data,
      updatedAt: new Date().toISOString()
    };

    return await this.repository.update(id, updateData);
  }

  async delete(id) {
    const item = await this.findById(id);

    // Delete physical files
    try {
      if (item.path) {
        const fullPath = path.join(__dirname, '../', item.path);
        await fs.unlink(fullPath);
      }

      if (item.thumbnail) {
        const thumbnailFullPath = path.join(__dirname, '../', item.thumbnail);
        await fs.unlink(thumbnailFullPath);
      }
    } catch (fileError) {
      console.error('Error deleting files:', fileError);
    }

    return await this.repository.delete(id);
  }

  async toggleActive(id) {
    const item = await this.findById(id);
    return await this.update(id, { isActive: !item.isActive });
  }

  async _ensureDirectories() {
    try {
      await fs.mkdir(this.uploadDir, { recursive: true });
      await fs.mkdir(this.thumbnailDir, { recursive: true });
    } catch (error) {
      if (error.code !== 'EEXIST') {
        throw error;
      }
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
