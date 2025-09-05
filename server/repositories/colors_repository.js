const BaseRepository = require('./base_repository');

class ColorsRepository extends BaseRepository {
  constructor() {
    super('colors');
  }

  async findByName(name) {
    const colors = await this.findAll();
    return colors.find(color => color.name === name);
  }

  async findByHex(hex) {
    const colors = await this.findAll();
    return colors.find(color => color.hex === hex);
  }
}

module.exports = { ColorsRepository };
