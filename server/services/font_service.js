const boom = require('@hapi/boom');
const logger = require('../utils/logger');

class FontsService {
  constructor(repository) {
    this.repository = repository;
  }

  async find() {
    return await this.repository.findAll();
  }

  async findOne(id) {
    return await this.repository.findById(id);
  }

  async findByUser(userId) {
    const fonts = await this.repository.findAll();
    return fonts.filter(font => font.userId === userId);
  }

  async findByName(name) {
    const font = await this.repository.findByName(name);
    if (!font) {
      throw boom.notFound('Font not found');
    }
    return font;
  }

  async findByFamily(family) {
    const font = await this.repository.findByFamily(family);
    if (!font) {
      throw boom.notFound('Font not found');
    }
    return font;
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
      uploadedAt: new Date().toISOString(),
      lastUsedAt: null
    };
    return await this.repository.create(fontData);
  }

  async update(id, data) {
    const fontData = {
      ...data,
      lastUsedAt: data.lastUsedAt || new Date().toISOString()
    };
    return await this.repository.update(id, fontData);
  }

  async delete(id) {
    return await this.repository.delete(id);
  }

  async findLastUsedByUserId(userId) {
    const fonts = await this.repository.findAll();
    const userFonts = fonts.filter(font => font.userId === userId);
    return userFonts.sort((a, b) => new Date(b.lastUsedAt || 0) - new Date(a.lastUsedAt || 0));
  }

  async findOneByIdAndUserId(fontId, userId) {
    const font = await this.repository.findById(fontId);
    if (font.userId !== userId) {
      throw boom.forbidden('Access denied');
    }
    return font;
  }
}

module.exports = { FontsService };
