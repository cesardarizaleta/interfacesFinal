const BaseRepository = require('./base_repository');

class FontsRepository extends BaseRepository {
  constructor() {
    super('fonts');
  }

  async findByName(name) {
    const fonts = await this.findAll();
    return fonts.find(font => font.name === name);
  }

  async findByFamily(family) {
    const fonts = await this.findAll();
    return fonts.find(font => font.family === family);
  }
}

module.exports = { FontsRepository };
