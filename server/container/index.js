const { UsersService } = require('../services/user_service');
const { ColorsService } = require('../services/color_service');
const { FontsService } = require('../services/font_service');
const GalleryService = require('../services/gallery_service');
const { UsersRepository } = require('../repositories/users_repository');
const { ColorsRepository } = require('../repositories/colors_repository');
const { FontsRepository } = require('../repositories/fonts_repository');
const GalleryRepository = require('../repositories/gallery_repository');

class Container {
  constructor() {
    this.services = {};
    this.repositories = {};
    this.initializeDependencies();
  }

  initializeDependencies() {
    // Initialize repositories
    this.repositories.users = new UsersRepository();
    this.repositories.colors = new ColorsRepository();
    this.repositories.fonts = new FontsRepository();
    this.repositories.gallery = new GalleryRepository();

    // Initialize services with repositories
    this.services.users = new UsersService(this.repositories.users);
    this.services.colors = new ColorsService(this.repositories.colors);
    this.services.fonts = new FontsService(this.repositories.fonts);
    this.services.gallery = new GalleryService(this.repositories.gallery);
  }

  getService(serviceName) {
    return this.services[serviceName];
  }

  getRepository(repositoryName) {
    return this.repositories[repositoryName];
  }
}

module.exports = new Container();
