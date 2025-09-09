const boom = require('@hapi/boom');
const { models } = require('../db/models/index');

class ColorsService {
  constructor() {
    this.Color = models.Color;
  }

  async find() {
    const colors = await this.Color.findAll();
    return colors.map(color => color.toJSON());
  }

  async findOne(id) {
    const color = await this.Color.findByPk(id);
    if (!color) {
      throw boom.notFound('Color not found');
    }
    return color.toJSON();
  }

  async findByUser(userId) {
    const colors = await this.Color.findAll({ where: { userId } });
    return colors.map(color => color.toJSON());
  }

  async findByName(name) {
    const color = await this.Color.findOne({ where: { name } });
    if (!color) {
      throw boom.notFound('Color not found');
    }
    return color.toJSON();
  }

  async findByHex(hex) {
    const color = await this.Color.findOne({ where: { hex } });
    if (!color) {
      throw boom.notFound('Color not found');
    }
    return color.toJSON();
  }

  async create(data) {
    const colorData = {
      ...data,
      lastUsedAt: null,
      isDefault: data.isDefault || false,
      isActive: data.isActive || false
    };
    const newColor = await this.Color.create(colorData);
    return newColor.toJSON();
  }

  async update(id, data) {
    const color = await this.Color.findByPk(id);
    if (!color) {
      throw boom.notFound('Color not found');
    }

    const colorData = {
      ...data,
      lastUsedAt: data.lastUsedAt || new Date()
    };

    await color.update(colorData);
    return color.toJSON();
  }

  async delete(id) {
    const color = await this.Color.findByPk(id);
    if (!color) {
      throw boom.notFound('Color not found');
    }
    await color.destroy();
    return color.toJSON();
  }

  async toggleActive(id) {
    const color = await this.Color.findByPk(id);
    if (!color) {
      throw boom.notFound('Color not found');
    }

    await color.update({ isActive: !color.isActive });
    return color.toJSON();
  }

  async setAsDefault(id, userId) {
    // Remove default from all user colors
    await this.Color.update(
      { isDefault: false },
      { where: { userId, isDefault: true } }
    );

    // Set the specified color as default
    const color = await this.Color.findByPk(id);
    if (!color) {
      throw boom.notFound('Color not found');
    }

    await color.update({ isDefault: true });
    return color.toJSON();
  }

  async findLastUsedByUserId(userId) {
    const colors = await this.Color.findAll({
      where: { userId },
      order: [['lastUsedAt', 'DESC']]
    });
    return colors.map(color => color.toJSON());
  }

  async findActiveByUserId(userId) {
    const colors = await this.Color.findAll({
      where: { userId, isActive: true }
    });
    return colors.map(color => color.toJSON());
  }

  async activatePalette(id, userId) {
    const color = await this.Color.findByPk(id);
    if (!color) {
      throw boom.notFound('Color not found');
    }
    if (color.userId !== userId) {
      throw boom.forbidden('Access denied');
    }
    await color.update({ isActive: true });
    return color.toJSON();
  }

  async deactivatePalette(id, userId) {
    const color = await this.Color.findByPk(id);
    if (!color) {
      throw boom.notFound('Color not found');
    }
    if (color.userId !== userId) {
      throw boom.forbidden('Access denied');
    }
    await color.update({ isActive: false });
    return color.toJSON();
  }

  async findOneByIdAndUserId(colorId, userId) {
    const color = await this.Color.findOne({
      where: { id: colorId, userId }
    });
    if (!color) {
      throw boom.forbidden('Access denied');
    }
    return color.toJSON();
  }
}

module.exports = { ColorsService };
