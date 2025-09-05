const boom = require('@hapi/boom');

class ColorsService {
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
    const colors = await this.repository.findAll();
    return colors.filter(color => color.userId === userId);
  }

  async findByName(name) {
    const color = await this.repository.findByName(name);
    if (!color) {
      throw boom.notFound('Color not found');
    }
    return color;
  }

  async findByHex(hex) {
    const color = await this.repository.findByHex(hex);
    if (!color) {
      throw boom.notFound('Color not found');
    }
    return color;
  }

  async create(data) {
    const colorData = {
      ...data,
      lastUsedAt: null,
      isDefault: data.isDefault || false,
      isActive: data.isActive || false
    };
    return await this.repository.create(colorData);
  }

  async update(id, data) {
    const colorData = {
      ...data,
      lastUsedAt: data.lastUsedAt || new Date().toISOString()
    };
    return await this.repository.update(id, colorData);
  }

  async delete(id) {
    return await this.repository.delete(id);
  }

  async toggleActive(id) {
    const color = await this.repository.findById(id);
    const updatedColor = await this.repository.update(id, {
      isActive: !color.isActive
    });
    return updatedColor;
  }

  async setAsDefault(id, userId) {
    const colors = await this.repository.findAll();
    const userColors = colors.filter(color => color.userId === userId);

    // Remove default from all user colors
    for (const color of userColors) {
      if (color.isDefault) {
        await this.repository.update(color.id, { isDefault: false });
      }
    }

    // Set the specified color as default
    return await this.repository.update(id, { isDefault: true });
  }

  async findLastUsedByUserId(userId) {
    const colors = await this.repository.findAll();
    const userColors = colors.filter(color => color.userId === userId);
    return userColors.sort((a, b) => new Date(b.lastUsedAt || 0) - new Date(a.lastUsedAt || 0));
  }

  async findActiveByUserId(userId) {
    const colors = await this.repository.findAll();
    return colors.filter(color => color.userId === userId && color.isActive);
  }

  async activatePalette(id, userId) {
    const color = await this.repository.findById(id);
    if (color.userId !== userId) {
      throw boom.forbidden('Access denied');
    }
    return await this.repository.update(id, { isActive: true });
  }

  async deactivatePalette(id, userId) {
    const color = await this.repository.findById(id);
    if (color.userId !== userId) {
      throw boom.forbidden('Access denied');
    }
    return await this.repository.update(id, { isActive: false });
  }

  async findOneByIdAndUserId(colorId, userId) {
    const color = await this.repository.findById(colorId);
    if (color.userId !== userId) {
      throw boom.forbidden('Access denied');
    }
    return color;
  }
}

module.exports = { ColorsService };
