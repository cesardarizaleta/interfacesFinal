const boom = require('@hapi/boom');
const fs = require('fs').promises;
const path = require('path');

class ColorsService {

  constructor(){
    this.filePath = path.join(__dirname, '../data/colors.json');
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
    const colors = await this._readData();
    const newColor = {
      id: Date.now().toString(),
      ...data,
      lastUsedAt: null
    };
    colors.push(newColor);
    await this._writeData(colors);
    return newColor;
  }

  async find() {
    const colors = await this._readData();
    return colors;
  }

  async findByUser(userId){
    const colors = await this._readData();
    return colors.filter(color => color.userId === userId);
  }

  async findOne(id) {
    const colors = await this._readData();
    const color = colors.find(color => color.id === id);
    if (!color) {
      throw boom.notFound('Color not found');
    }
    // Update lastUsedAt
    color.lastUsedAt = new Date().toISOString();
    await this._writeData(colors);
    return color;
  }

  async update(id, changes) {
    const colors = await this._readData();
    const index = colors.findIndex(color => color.id === id);
    if (index === -1) {
      throw boom.notFound('Color not found');
    }
    colors[index] = { ...colors[index], ...changes };
    await this._writeData(colors);
    return colors[index];
  }

  async delete(id) {
    const colors = await this._readData();
    const index = colors.findIndex(color => color.id === id);
    if (index === -1) {
      throw boom.notFound('Color not found');
    }
    colors.splice(index, 1);
    await this._writeData(colors);
    return { id };
  }

  async findLastUsedByUserId(userId) {
    const colors = await this._readData();
    const userColors = colors.filter(color => color.userId === userId && color.lastUsedAt);
    if (userColors.length === 0) {
      throw boom.notFound('No se ha encontrado ninguna configuración de color reciente para este usuario.');
    }
    userColors.sort((a, b) => new Date(b.lastUsedAt) - new Date(a.lastUsedAt));
    return userColors[0];
  }

  async findOneByIdAndUserId(colorId, userId) {
    const colors = await this._readData();
    const color = colors.find(color => color.id === colorId && color.userId === userId);
    if (!color) {
      throw boom.notFound('Color not found or does not belong to the authenticated user.');
    }
    // Update lastUsedAt
    color.lastUsedAt = new Date().toISOString();
    await this._writeData(colors);
    return color;
  }
}

module.exports = ColorsService;
