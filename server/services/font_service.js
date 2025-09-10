const boom = require('@hapi/boom');
const logger = require('../utils/logger');
const { models } = require('../libs/sequelize');
const { GoogleDriveService } = require('./google_drive_service');
const fs = require('fs');
const path = require('path');

class FontsService {
  constructor() {
    this.Font = models.Font;
    this.driveService = new GoogleDriveService();
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
      fontFamily: data.fontFamily,
      fontType: data.fontType || 'general',
      fontFilePath: data.fontFilePath || null,
      fontWeight: data.fontWeight || 'normal',
      fontStyle: data.fontStyle || 'normal',
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

  async uploadFontToDrive(userId, file, fontData) {
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
        'application/font-woff2'
      ];

      if (!allowedMimes.includes(file.mimetype)) {
        throw boom.badRequest('Tipo de archivo no válido. Solo se permiten archivos .ttf, .otf, .woff, .woff2');
      }

      // Upload to Google Drive
      const driveResult = await this.driveService.uploadFile(
        userId,
        file.buffer,
        file.originalname,
        file.mimetype
      );

      // Create font record in database
      const fontRecord = {
        name: fontData.name || path.parse(file.originalname).name,
        fontFamily: fontData.fontFamily || fontData.name || path.parse(file.originalname).name,
        fontType: fontData.fontType || 'general',
        fontFilePath: driveResult.downloadUrl, // Store the Drive URL
        fontWeight: fontData.fontWeight || 'normal',
        fontStyle: fontData.fontStyle || 'normal',
        fontFormat: path.extname(file.originalname).substring(1) || 'ttf',
        userId: userId,
        uploadedAt: new Date(),
        lastUsedAt: null,
        driveFileId: driveResult.fileId, // Store Drive file ID for potential deletion
      };

      const newFont = await this.Font.create(fontRecord);

      // No local file to clean up since we're using memory storage
      logger.info(`Font uploaded successfully for user ${userId}: ${newFont.name}`);

      return newFont.toJSON();
    } catch (error) {
      logger.error('Error uploading font to Drive:', error);
      throw error;
    }
  }
}

module.exports = { FontsService };
