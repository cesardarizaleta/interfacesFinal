const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const { models } = require('../db/models/index');

class UsersService {
  constructor() {
    this.User = models.User;
  }

  async find() {
    const users = await this.User.findAll();
    return users.map(user => {
      const userData = user.toJSON();
      const { password, ...userWithoutPassword } = userData;
      return userWithoutPassword;
    });
  }

  async findOne(id) {
    const user = await this.User.findByPk(id);
    if (!user) {
      throw boom.notFound('User not found');
    }
    const userData = user.toJSON();
    const { password, ...userWithoutPassword } = userData;
    return userWithoutPassword;
  }

  async findByEmail(email) {
    const user = await this.User.findOne({ where: { email } });
    if (!user) {
      throw boom.notFound('User not found');
    }
    const userData = user.toJSON();
    const { password, ...userWithoutPassword } = userData;
    return userWithoutPassword;
  }

  async findByEmailWithPassword(email) {
    const user = await this.User.findOne({ where: { email } });
    if (!user) {
      throw boom.notFound('User not found');
    }
    return user.toJSON();
  }

  async findByUsername(username) {
    const user = await this.User.findOne({ where: { username } });
    if (!user) {
      throw boom.notFound('User not found');
    }
    const userData = user.toJSON();
    const { password, ...userWithoutPassword } = userData;
    return userWithoutPassword;
  }

  async create(data) {
    // Check if user already exists
    const existingUser = await this.User.findOne({ where: { email: data.email } });
    if (existingUser) {
      throw boom.conflict('User with this email already exists');
    }

    const userData = this._buildUserData(data);
    const newUser = await this.User.create(userData);
    const userDataJson = newUser.toJSON();
    const { password, ...userWithoutPassword } = userDataJson;
    return userWithoutPassword;
  }

  async update(id, data) {
    const user = await this.User.findByPk(id);
    if (!user) {
      throw boom.notFound('User not found');
    }

    const userData = this._buildUserData(data);
    await user.update(userData);
    const updatedData = user.toJSON();
    const { password, ...userWithoutPassword } = updatedData;
    return userWithoutPassword;
  }

  async delete(id) {
    const user = await this.User.findByPk(id);
    if (!user) {
      throw boom.notFound('User not found');
    }
    await user.destroy();
    return user.toJSON();
  }

  async getUserStats() {
    const totalUsers = await this.User.count();
    const adminUsers = await this.User.count({ where: { role: 'admin' } });
    const regularUsers = totalUsers - adminUsers;

    return {
      totalUsers,
      adminUsers,
      regularUsers
    };
  }

  async validatePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  async findByRole(role) {
    const users = await this.User.findAll({ where: { role } });
    return users.map(user => {
      const userData = user.toJSON();
      const { password, ...userWithoutPassword } = userData;
      return userWithoutPassword;
    });
  }

  async updateRole(id, role) {
    if (!['admin', 'user'].includes(role)) {
      throw boom.badRequest('Invalid role. Only admin and user roles are allowed.');
    }

    const user = await this.User.findByPk(id);
    if (!user) {
      throw boom.notFound('User not found');
    }

    await user.update({ role });
    const updatedData = user.toJSON();
    const { password, ...userWithoutPassword } = updatedData;
    return userWithoutPassword;
  }

  _buildUserData(data) {
    return {
      firstName: data.firstName || '',
      lastName: data.lastName || '',
      maidenName: data.maidenName || '',
      age: data.age || null,
      gender: data.gender || '',
      email: data.email,
      phone: data.phone || '',
      username: data.username || '',
      birthDate: data.birthDate || '',
      image: data.image || '',
      bloodGroup: data.bloodGroup || '',
      height: data.height || null,
      weight: data.weight || null,
      eyeColor: data.eyeColor || '',
      hair: {
        color: data.hairColor || '',
        type: data.hairType || ''
      },
      ip: data.ip || '',
      address: {
        address: data.address || '',
        city: data.city || '',
        state: data.state || '',
        stateCode: data.stateCode || '',
        postalCode: data.postalCode || '',
        coordinates: {
          lat: data.lat || null,
          lng: data.lng || null
        },
        country: data.country || ''
      },
      macAddress: data.macAddress || '',
      university: data.university || '',
      bank: {
        cardExpire: data.cardExpire || '',
        cardNumber: data.cardNumber || '',
        cardType: data.cardType || '',
        currency: data.currency || '',
        iban: data.iban || ''
      },
      company: {
        department: data.department || '',
        name: data.companyName || '',
        title: data.title || '',
        address: {
          address: data.companyAddress || '',
          city: data.companyCity || '',
          state: data.companyState || '',
          stateCode: data.companyStateCode || '',
          postalCode: data.companyPostalCode || '',
          coordinates: {
            lat: data.companyLat || null,
            lng: data.companyLng || null
          },
          country: data.companyCountry || ''
        }
      },
      ein: data.ein || '',
      ssn: data.ssn || '',
      userAgent: data.userAgent || '',
      crypto: {
        coin: data.coin || '',
        wallet: data.wallet || '',
        network: data.network || ''
      },
      role: data.role || 'user'
    };
  }
}

module.exports = { UsersService };
