const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const fs = require('fs').promises;
const path = require('path');

class UsersService {

  constructor(){
    this.filePath = path.join(__dirname, '../data/users.json');
  }

  async _readData() {
    try {
      const data = await fs.readFile(this.filePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  async _writeData(data) {
    await fs.writeFile(this.filePath, JSON.stringify(data, null, 2));
  }

  async create(data) {
    const hash = await bcrypt.hash(data.password, 10);
    const users = await this._readData();
    const newUser = {
      id: Date.now().toString(),
      ...data,
      password: hash
    };
    users.push(newUser);
    await this._writeData(users);
    const { password, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  }

  async find() {
    const users = await this._readData();
    return users.map(user => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
  }

  async findOneByEmail(email) {
    const users = await this._readData();
    return users.find(user => user.email === email);
  }

  async findOne(id) {
    const users = await this._readData();
    const user = users.find(user => user.id === id);
    if (!user) {
      throw boom.notFound('User not found');
    }
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async update(id, changes) {
    const users = await this._readData();
    const index = users.findIndex(user => user.id === id);
    if (index === -1) {
      throw boom.notFound('User not found');
    }
    users[index] = { ...users[index], ...changes };
    await this._writeData(users);
    const { password, ...userWithoutPassword } = users[index];
    return userWithoutPassword;
  }

  async delete(id) {
    const users = await this._readData();
    const index = users.findIndex(user => user.id === id);
    if (index === -1) {
      throw boom.notFound('User not found');
    }
    users.splice(index, 1);
    await this._writeData(users);
    return { id };
  }

}

module.exports = UsersService;
