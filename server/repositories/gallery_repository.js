const BaseRepository = require('./base_repository');
const boom = require('@hapi/boom');

class GalleryRepository extends BaseRepository {
  constructor() {
    super('gallery');
  }

  async findByCategory(category) {
    const items = await this.findAll();
    return items.filter(item => item.category === category);
  }

  async findByType(type) {
    const items = await this.findAll();
    return items.filter(item => item.type === type);
  }

  async findActive() {
    const items = await this.findAll();
    return items.filter(item => item.isActive === true);
  }

  async searchByTitle(query) {
    const items = await this.findAll();
    const lowercaseQuery = query.toLowerCase();
    return items.filter(item =>
      item.title.toLowerCase().includes(lowercaseQuery) ||
      item.description.toLowerCase().includes(lowercaseQuery) ||
      item.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
  }

  async update(id, data) {
    const items = await this._readData();
    const index = items.findIndex(item => item.id === id);

    if (index === -1) {
      throw boom.notFound('Gallery item not found');
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
      throw boom.notFound('Gallery item not found');
    }

    const deletedItem = items.splice(index, 1)[0];
    await this._writeData(items);
    return deletedItem;
  }
}

module.exports = GalleryRepository;
