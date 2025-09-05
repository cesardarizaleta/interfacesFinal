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
      console.error('Error reading colors data:', error.message);
      // Return empty array if file doesn't exist or is corrupted
      return [];
    }
  }

  async _writeData(data) {
    try {
      await fs.writeFile(this.filePath, JSON.stringify(data, null, 2));
    } catch (error) {
      console.error('Error writing colors data:', error.message);
      throw boom.internal('Failed to save color data');
    }
  }

  async create(data) {
    const colors = await this._readData();
    const newColor = {
      id: Date.now().toString(),
      ...data,
      lastUsedAt: null,
      isDefault: data.isDefault || false,
      isActive: data.isActive || false
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
    if (colors[index].isDefault) {
      throw boom.badRequest('Cannot delete default palette');
    }
    colors.splice(index, 1);
    await this._writeData(colors);
    return { id };
  }

  async findLastUsedByUserId(userId) {
    const colors = await this._readData();
    const userColors = colors.filter(color => color.userId === userId && color.lastUsedAt);
    if (userColors.length === 0) {
      // Return null so route handlers can decide how to respond
      return null;
    }
    userColors.sort((a, b) => new Date(b.lastUsedAt) - new Date(a.lastUsedAt));
    return userColors[0];
  }

  async findActiveByUserId(userId) {
    const colors = await this._readData();
    const activeColor = colors.find(color => color.userId === userId && color.isActive);
    if (!activeColor) {
      // Return default palette if no active palette found
      const defaultPalette = colors.find(color => color.isDefault);
      return defaultPalette || null;
    }
    return activeColor;
  }

  async activatePalette(id, userId) {
    const colors = await this._readData();
    const index = colors.findIndex(color => color.id === id && color.userId === userId);
    if (index === -1) {
      throw boom.notFound('Color not found');
    }
    // Deactivate all palettes for this user
    colors.forEach(color => {
      if (color.userId === userId) {
        color.isActive = false;
      }
    });
    // Activate the selected palette
    colors[index].isActive = true;
    colors[index].lastUsedAt = new Date().toISOString();
    await this._writeData(colors);
    return colors[index];
  }

  async deactivatePalette(id, userId) {
    const colors = await this._readData();
    const index = colors.findIndex(color => color.id === id && color.userId === userId);
    if (index === -1) {
      throw boom.notFound('Color not found');
    }
    if (colors[index].isDefault) {
      throw boom.badRequest('Cannot deactivate default palette');
    }
    colors[index].isActive = false;
    await this._writeData(colors);
    return colors[index];
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
