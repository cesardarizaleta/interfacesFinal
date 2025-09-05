const BaseRepository = require('./base_repository');
const bcrypt = require('bcrypt');

class UsersRepository extends BaseRepository {
  constructor() {
    super('users');
  }

  async findByEmail(email) {
    const users = await this.findAll();
    return users.find(user => user.email === email);
  }

  async findByUsername(username) {
    const users = await this.findAll();
    return users.find(user => user.username === username);
  }

  async create(data) {
    const hash = await bcrypt.hash(data.password, 10);
    const userData = {
      ...data,
      password: hash
    };
    return super.create(userData);
  }

  async update(id, data) {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }
    return super.update(id, data);
  }

  async getUserStats() {
    const users = await this.findAll();
    const totalUsers = users.length;
    const adminUsers = users.filter(user => user.role === 'admin').length;
    const regularUsers = totalUsers - adminUsers;

    return {
      totalUsers,
      adminUsers,
      regularUsers
    };
  }
}

module.exports = { UsersRepository };
