const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const { models } = require('../libs/sequelize');

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

    // Hash password if provided
    if (data.password) {
      const saltRounds = 10;
      userData.password = await bcrypt.hash(data.password, saltRounds);
    }

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
      firstName: data.firstName || null,
      lastName: data.lastName || null,
      maidenName: data.maidenName || null,
      age: data.age || null,
      gender: data.gender || null,
      email: data.email,
      phone: data.phone || null,
      username: data.username || null,
      birthDate: data.birthDate || null,
      image: data.image || null,
      bloodGroup: data.bloodGroup || null,
      height: data.height || null,
      weight: data.weight || null,
      eyeColor: data.eyeColor || null,
      hair: {
        color: data.hairColor || null,
        type: data.hairType || null
      },
      ip: data.ip || null,
      address: {
        address: data.address || null,
        city: data.city || null,
        state: data.state || null,
        stateCode: data.stateCode || null,
        postalCode: data.postalCode || null,
        coordinates: {
          lat: data.lat || null,
          lng: data.lng || null
        },
        country: data.country || null
      },
      macAddress: data.macAddress || null,
      university: data.university || null,
      bank: {
        cardExpire: data.cardExpire || null,
        cardNumber: data.cardNumber || null,
        cardType: data.cardType || null,
        currency: data.currency || null,
        iban: data.iban || null
      },
      company: {
        department: data.department || null,
        name: data.companyName || null,
        title: data.title || null,
        address: {
          address: data.companyAddress || null,
          city: data.companyCity || null,
          state: data.companyState || null,
          stateCode: data.companyStateCode || null,
          postalCode: data.companyPostalCode || null,
          coordinates: {
            lat: data.companyLat || null,
            lng: data.companyLng || null
          },
          country: data.companyCountry || null
        }
      },
      ein: data.ein || null,
      ssn: data.ssn || null,
      userAgent: data.userAgent || null,
      crypto: {
        coin: data.coin || null,
        wallet: data.wallet || null,
        network: data.network || null
      },
      role: data.role || 'user'
    };
  }
}

module.exports = { UsersService };
