const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

class UsersService {
  constructor(repository) {
    this.repository = repository;
  }

  async find() {
    const users = await this.repository.findAll();
    return users.map(user => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
  }

  async findOne(id) {
    const user = await this.repository.findById(id);
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async findByEmail(email) {
    const user = await this.repository.findByEmail(email);
    if (!user) {
      throw boom.notFound('User not found');
    }
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async findByUsername(username) {
    const user = await this.repository.findByUsername(username);
    if (!user) {
      throw boom.notFound('User not found');
    }
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async create(data) {
    // Check if user already exists
    const existingUser = await this.repository.findByEmail(data.email);
    if (existingUser) {
      throw boom.conflict('User with this email already exists');
    }

    const userData = this._buildUserData(data);
    const newUser = await this.repository.create(userData);
    const { password, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  }

  async update(id, data) {
    const userData = this._buildUserData(data);
    const updatedUser = await this.repository.update(id, userData);
    const { password, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
  }

  async delete(id) {
    return await this.repository.delete(id);
  }

  async getUserStats() {
    return await this.repository.getUserStats();
  }

  async validatePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  async findByRole(role) {
    const users = await this.repository.findAll();
    return users.filter(user => user.role === role).map(user => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
  }

  async updateRole(id, role) {
    if (!['admin', 'user'].includes(role)) {
      throw boom.badRequest('Invalid role. Only admin and user roles are allowed.');
    }

    const user = await this.repository.findById(id);
    const updatedUser = await this.repository.update(id, { role });
    const { password, ...userWithoutPassword } = updatedUser;
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
