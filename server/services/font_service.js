const boom = require('@hapi/boom');
const logger = require('../utils/logger');
const { models } = require('../libs/sequelize');
const { GoogleDriveService } = require('./google_drive_service');
const fs = require('fs');
const path = require('path');

class FontsService {
  constructor() {
    this.Font = models.Font;
    // No longer need Google Drive service
    // this.driveService = new GoogleDriveService();

    // Initialize directories on startup
    this.initializeDirectories();
  }

  async find() {
    const fonts = await this.Font.findAll();
    return fonts.map(font => font.toJSON());
  }

  async findOne(id) {
    const font = await this.Font.findByPk(id);
    if (!font) {
      throw boom.notFound('Font not found');
    }
    return font.toJSON();
  }

  async findByUser(userId) {
    const fonts = await this.Font.findAll({ where: { userId } });
    return fonts.map(font => font.toJSON());
  }

  async findByName(name) {
    const font = await this.Font.findOne({ where: { name } });
    if (!font) {
      throw boom.notFound('Font not found');
    }
    return font.toJSON();
  }

  async findByFamily(family) {
    const font = await this.Font.findOne({ where: { fontFamily: family } });
    if (!font) {
      throw boom.notFound('Font not found');
    }
    return font.toJSON();
  }

  async create(data) {
    const fontData = {
      name: data.name,
      fontFamily: data.fontFamily || data.name,
      fontType: data.fontType || 'general',
      fontFilePath: data.fontFilePath || null,
      fontWeight: data.weight || 'normal',
      fontStyle: data.style || 'normal',
      fontFormat: data.fontFormat || 'ttf',
      userId: data.userId,
      uploadedAt: new Date(),
      lastUsedAt: null
    };
    const newFont = await this.Font.create(fontData);
    return newFont.toJSON();
  }

  async update(id, data) {
    const font = await this.Font.findByPk(id);
    if (!font) {
      throw boom.notFound('Font not found');
    }

    const fontData = {
      ...data,
      fontWeight: data.weight || data.fontWeight,
      fontStyle: data.style || data.fontStyle,
      lastUsedAt: data.lastUsedAt || new Date()
    };

    await font.update(fontData);
    return font.toJSON();
  }

  async delete(id) {
    const font = await this.Font.findByPk(id);
    if (!font) {
      throw boom.notFound('Font not found');
    }

    // Delete local file if it exists
    if (font.fontFilePath && font.fontFilePath.startsWith('/uploads/')) {
      try {
        const filePath = path.join(__dirname, '../../', font.fontFilePath);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
          logger.info(`Local font file deleted: ${filePath}`);
        }
      } catch (error) {
        logger.warn(`Failed to delete local font file: ${error.message}`);
        // Don't throw error, continue with database deletion
      }
    }

    await font.destroy();
    return font.toJSON();
  }

  async findLastUsedByUserId(userId) {
    const fonts = await this.Font.findAll({
      where: { userId },
      order: [['lastUsedAt', 'DESC']]
    });
    return fonts.map(font => font.toJSON());
  }

  async findOneByIdAndUserId(fontId, userId) {
    const font = await this.Font.findOne({
      where: { id: fontId, userId }
    });
    if (!font) {
      throw boom.forbidden('Access denied');
    }
    return font.toJSON();
  }

  // Initialize fonts directory structure
  async initializeDirectories() {
    const fontsDir = path.join(__dirname, '../../uploads/fonts');
    try {
      if (!fs.existsSync(fontsDir)) {
        fs.mkdirSync(fontsDir, { recursive: true });
        logger.info('Fonts directory created:', fontsDir);
      }
    } catch (error) {
      logger.error('Failed to create fonts directory:', error);
    }
  }

  async uploadFontLocally(userId, file, fontData) {
    try {
      // Validate file type
      const allowedMimes = [
        'font/ttf',
        'font/otf',
        'font/woff',
        'font/woff2',
        'application/x-font-ttf',
        'application/x-font-otf',
        'application/font-woff',
        'application/font-woff2',
        'application/octet-stream',
        'application/font-otf'
      ];

      if (!allowedMimes.includes(file.mimetype)) {
        console.log('Service rejected file:', file.originalname, 'MIME:', file.mimetype);
        throw boom.badRequest('Tipo de archivo no válido. Solo se permiten archivos .ttf, .otf, .woff, .woff2');
      }

      // File is already saved by multer, get the path
      const filePath = file.path;
      const relativePath = `/uploads/fonts/${userId}/${path.basename(filePath)}`;

      // Create font record in database
      const fontRecord = {
        name: fontData.name || path.parse(file.originalname).name,
        fontFamily: fontData.fontFamily || fontData.name || path.parse(file.originalname).name,
        fontType: fontData.fontType || 'general',
        fontFilePath: relativePath, // Store relative path for serving
        fontWeight: fontData.weight || 'normal',
        fontStyle: fontData.style || 'normal',
        fontFormat: path.extname(file.originalname).substring(1) || 'ttf',
        userId: userId,
        uploadedAt: new Date(),
        lastUsedAt: null,
        driveFileId: null, // No longer using Google Drive
      };

      const newFont = await this.Font.create(fontRecord);

      logger.info(`Font uploaded locally for user ${userId}: ${newFont.name} -> ${filePath}`);

      return newFont.toJSON();
    } catch (error) {
      logger.error('Error uploading font locally:', error);
      throw error;
    }
  }

  // Legacy method for backward compatibility (redirects to new method)
  async uploadFontToDrive(userId, file, fontData) {
    return this.uploadFontLocally(userId, file, fontData);
  }
}

module.exports = { FontsService };
