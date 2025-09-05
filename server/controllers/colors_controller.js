const container = require('../container');

class ColorsController {
  constructor() {
    this.service = container.getService('colors');
  }

  async getColors(req, res, next) {
    try {
      const colors = await this.service.find();
      res.json(colors);
    } catch (error) {
      next(error);
    }
  }

  async getColor(req, res, next) {
    try {
      const { id } = req.params;
      const color = await this.service.findOne(id);
      res.json(color);
    } catch (error) {
      next(error);
    }
  }

  async getColorsByUser(req, res, next) {
    try {
      const { userId } = req.params;
      const colors = await this.service.findByUser(userId);
      res.json(colors);
    } catch (error) {
      next(error);
    }
  }

  async createColor(req, res, next) {
    try {
      const colorData = req.body;
      const newColor = await this.service.create(colorData);
      res.status(201).json(newColor);
    } catch (error) {
      next(error);
    }
  }

  async updateColor(req, res, next) {
    try {
      const { id } = req.params;
      const colorData = req.body;
      const updatedColor = await this.service.update(id, colorData);
      res.json(updatedColor);
    } catch (error) {
      next(error);
    }
  }

  async deleteColor(req, res, next) {
    try {
      const { id } = req.params;
      await this.service.delete(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  async toggleColorActive(req, res, next) {
    try {
      const { id } = req.params;
      const updatedColor = await this.service.toggleActive(id);
      res.json(updatedColor);
    } catch (error) {
      next(error);
    }
  }

  async setColorAsDefault(req, res, next) {
    try {
      const { id } = req.params;
      const { userId } = req.body;
      const updatedColor = await this.service.setAsDefault(id, userId);
      res.json(updatedColor);
    } catch (error) {
      next(error);
    }
  }

  async getLastUsedColors(req, res, next) {
    try {
      const { userId } = req.params;
      const colors = await this.service.findLastUsedByUserId(userId);
      res.json(colors);
    } catch (error) {
      next(error);
    }
  }

  async getActiveColors(req, res, next) {
    try {
      const { userId } = req.params;
      const colors = await this.service.findActiveByUserId(userId);
      res.json(colors);
    } catch (error) {
      next(error);
    }
  }

  async activatePalette(req, res, next) {
    try {
      const { id } = req.params;
      const { userId } = req.body;
      const updatedColor = await this.service.activatePalette(id, userId);
      res.json(updatedColor);
    } catch (error) {
      next(error);
    }
  }

  async deactivatePalette(req, res, next) {
    try {
      const { id } = req.params;
      const { userId } = req.body;
      const updatedColor = await this.service.deactivatePalette(id, userId);
      res.json(updatedColor);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = { ColorsController };
