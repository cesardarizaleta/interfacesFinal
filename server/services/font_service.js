const fs = require('fs').promises;
const path = require('path');
const boom = require('@hapi/boom');

class FontsService {

  constructor(){
    this.filePath = path.join(__dirname, '../data/fonts.json');
  }

  async _readData() {
    try {
      const data = await fs.readFile(this.filePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  async _writeData(data) {
    await fs.writeFile(this.filePath, JSON.stringify(data, null, 2));
  }

  async create(data) {
    const fonts = await this._readData();
    const newFont = {
      id: Date.now().toString(),
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
    fonts.push(newFont);
    await this._writeData(fonts);
    return newFont;
  }

  async find() {
    const fonts = await this._readData();
    return fonts;
  }

  async findByUser(userId){
    const fonts = await this._readData();
    return fonts.filter(font => font.userId === userId);
  }

  async findByType(userId, fontType) {
    const fonts = await this._readData();
    return fonts.filter(font => font.userId === userId && font.fontType === fontType);
  }

  async findOne(id) {
    const fonts = await this._readData();
    const font = fonts.find(font => font.id === id);
    if (!font) {
      throw boom.notFound('Font not found');
    }
    // Update lastUsedAt
    font.lastUsedAt = new Date().toISOString();
    await this._writeData(fonts);
    return font;
  }

  async assignFontType(fontId, fontType, userId) {
    const fonts = await this._readData();
    const fontIndex = fonts.findIndex(font => font.id === fontId && font.userId === userId);
    if (fontIndex === -1) {
      throw boom.notFound('Font not found or does not belong to user');
    }

    // Reset previous font of this type
    fonts.forEach((font, index) => {
      if (font.userId === userId && font.fontType === fontType && index !== fontIndex) {
        font.fontType = 'general';
      }
    });

    // Assign new type
    fonts[fontIndex].fontType = fontType;
    fonts[fontIndex].lastUsedAt = new Date().toISOString();

    await this._writeData(fonts);
    return fonts[fontIndex];
  }

  async delete(id) {
    const fonts = await this._readData();
    const index = fonts.findIndex(font => font.id === id);
    if (index === -1) {
      throw boom.notFound('Font not found');
    }
    const font = fonts[index];

    // Delete files
    if (font.fontFilePath) {
      try {
        await fs.unlink(path.join(process.cwd(), font.fontFilePath));
      } catch (err) {
        console.error(`Error al eliminar el archivo de fuente: ${font.fontFilePath}`, err);
      }
    }

    fonts.splice(index, 1);
    await this._writeData(fonts);
    return { id };
  }

  async findLastUsedByUserId(userId) {
    const fonts = await this._readData();
    const userFonts = fonts.filter(font => font.userId === userId && font.lastUsedAt);
    if (userFonts.length === 0) {
      throw boom.notFound('No se ha encontrado ninguna configuración de fuente reciente para este usuario.');
    }
    userFonts.sort((a, b) => new Date(b.lastUsedAt) - new Date(a.lastUsedAt));
    return userFonts[0];
  }

  async findOneByIdAndUserId(fontId, userId) {
    const fonts = await this._readData();
    const font = fonts.find(font => font.id === fontId && font.userId === userId);
    if (!font) {
      throw boom.notFound('Font not found or does not belong to the authenticated user.');
    }
    // Update lastUsedAt
    font.lastUsedAt = new Date().toISOString();
    await this._writeData(fonts);
    return font;
  }

  async getAssignedFonts(userId) {
    const fonts = await this._readData();
    const assignedFonts = {};

    fonts.forEach(font => {
      if (font.userId === userId && font.fontType !== 'general') {
        assignedFonts[font.fontType] = font;
      }
    });

    return assignedFonts;
  }

}

module.exports = FontsService;
