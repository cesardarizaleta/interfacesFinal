const fs = require('fs').promises;
const path = require('path');
const boom = require('@hapi/boom');

class BaseRepository {
  constructor(fileName) {
    this.filePath = path.join(__dirname, '../data', `${fileName}.json`);
  }

  async _readData() {
    try {
      const data = await fs.readFile(this.filePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error(`Error reading ${this.filePath}:`, error.message);
      return [];
    }
  }

  async _writeData(data) {
    try {
      await fs.writeFile(this.filePath, JSON.stringify(data, null, 2));
    } catch (error) {
      console.error(`Error writing ${this.filePath}:`, error.message);
      throw boom.internal('Failed to save data');
    }
  }

  async findAll() {
    return await this._readData();
  }

  async findById(id) {
    const items = await this._readData();
    const item = items.find(item => item.id === id);
    if (!item) {
      throw boom.notFound('Item not found');
    }
    return item;
  }

  async create(data) {
    const items = await this._readData();
    const newItem = {
      id: Date.now().toString(),
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    items.push(newItem);
    await this._writeData(items);
    return newItem;
  }

  async update(id, data) {
    const items = await this._readData();
    const index = items.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('Item not found');
    }
    items[index] = {
      ...items[index],
      ...data,
      updatedAt: new Date().toISOString()
    };
    await this._writeData(items);
    return items[index];
  }

  async delete(id) {
    const items = await this._readData();
    const index = items.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('Item not found');
    }
    const deletedItem = items.splice(index, 1)[0];
    await this._writeData(items);
    return deletedItem;
  }
}

module.exports = BaseRepository;
