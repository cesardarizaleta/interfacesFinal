const { UsersService } = require('../services/user_service');
const { ColorsService } = require('../services/color_service');
const { FontsService } = require('../services/font_service');
const GalleryService = require('../services/gallery_service');

class Container {
  constructor() {
    this.services = {};
    this.initializeDependencies();
  }

  initializeDependencies() {
    // Initialize services
    this.services.users = new UsersService();
    this.services.colors = new ColorsService();
    this.services.fonts = new FontsService();
    this.services.gallery = new GalleryService();
  }

  getService(serviceName) {
    return this.services[serviceName];
  }
}

module.exports = new Container();
