const boom = require('@hapi/boom');
const logger = require('../utils/logger');
const { models } = require('../libs/sequelize');

class FontsService {
  constructor() {
    this.Font = models.Font;
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
}

module.exports = { FontsService };
