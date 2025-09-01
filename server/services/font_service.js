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
      ...data,
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

  async update(id, changes) {
    const fonts = await this._readData();
    const index = fonts.findIndex(font => font.id === id);
    if (index === -1) {
      throw boom.notFound('Font not found');
    }
    fonts[index] = { ...fonts[index], ...changes };
    await this._writeData(fonts);
    return fonts[index];
  }

  async delete(id) {
    const fonts = await this._readData();
    const index = fonts.findIndex(font => font.id === id);
    if (index === -1) {
      throw boom.notFound('Font not found');
    }
    const font = fonts[index];

    // Delete files
    if (font.fontTitleFilePath) {
      try {
        await fs.unlink(path.join(process.cwd(), font.fontTitleFilePath));
      } catch (err) {
        console.error(`Error al eliminar el archivo de fuente del título: ${font.fontTitleFilePath}`, err);
      }
    }

    if (font.fontSubtitleFilePath) {
      try {
        await fs.unlink(path.join(process.cwd(), font.fontSubtitleFilePath));
      } catch (err) {
        console.error(`Error al eliminar el archivo de fuente del subtítulo: ${font.fontSubtitleFilePath}`, err);
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

}

module.exports = FontsService;
