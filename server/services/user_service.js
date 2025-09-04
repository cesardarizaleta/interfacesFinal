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
      firstName: data.firstName || '',
      lastName: data.lastName || '',
      maidenName: data.maidenName || '',
      age: data.age || null,
      gender: data.gender || '',
      email: data.email,
      phone: data.phone || '',
      username: data.username || '',
      password: hash,
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
      role: data.role || 'user',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
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

    // Handle nested objects properly
    const updatedUser = { ...users[index] };

    // Handle hair object
    if (changes.hairColor !== undefined || changes.hairType !== undefined) {
      updatedUser.hair = {
        ...updatedUser.hair,
        color: changes.hairColor !== undefined ? changes.hairColor : updatedUser.hair?.color || '',
        type: changes.hairType !== undefined ? changes.hairType : updatedUser.hair?.type || ''
      };
    }

    // Handle address object
    if (changes.address !== undefined || changes.city !== undefined || changes.state !== undefined ||
        changes.stateCode !== undefined || changes.postalCode !== undefined || changes.country !== undefined ||
        changes.lat !== undefined || changes.lng !== undefined) {
      updatedUser.address = {
        ...updatedUser.address,
        address: changes.address !== undefined ? changes.address : updatedUser.address?.address || '',
        city: changes.city !== undefined ? changes.city : updatedUser.address?.city || '',
        state: changes.state !== undefined ? changes.state : updatedUser.address?.state || '',
        stateCode: changes.stateCode !== undefined ? changes.stateCode : updatedUser.address?.stateCode || '',
        postalCode: changes.postalCode !== undefined ? changes.postalCode : updatedUser.address?.postalCode || '',
        coordinates: {
          lat: changes.lat !== undefined ? changes.lat : updatedUser.address?.coordinates?.lat || null,
          lng: changes.lng !== undefined ? changes.lng : updatedUser.address?.coordinates?.lng || null
        },
        country: changes.country !== undefined ? changes.country : updatedUser.address?.country || ''
      };
    }

    // Handle bank object
    if (changes.cardExpire !== undefined || changes.cardNumber !== undefined || changes.cardType !== undefined ||
        changes.currency !== undefined || changes.iban !== undefined) {
      updatedUser.bank = {
        ...updatedUser.bank,
        cardExpire: changes.cardExpire !== undefined ? changes.cardExpire : updatedUser.bank?.cardExpire || '',
        cardNumber: changes.cardNumber !== undefined ? changes.cardNumber : updatedUser.bank?.cardNumber || '',
        cardType: changes.cardType !== undefined ? changes.cardType : updatedUser.bank?.cardType || '',
        currency: changes.currency !== undefined ? changes.currency : updatedUser.bank?.currency || '',
        iban: changes.iban !== undefined ? changes.iban : updatedUser.bank?.iban || ''
      };
    }

    // Handle company object
    if (changes.department !== undefined || changes.companyName !== undefined || changes.title !== undefined ||
        changes.companyAddress !== undefined || changes.companyCity !== undefined || changes.companyState !== undefined ||
        changes.companyStateCode !== undefined || changes.companyPostalCode !== undefined ||
        changes.companyLat !== undefined || changes.companyLng !== undefined || changes.companyCountry !== undefined) {
      updatedUser.company = {
        ...updatedUser.company,
        department: changes.department !== undefined ? changes.department : updatedUser.company?.department || '',
        name: changes.companyName !== undefined ? changes.companyName : updatedUser.company?.name || '',
        title: changes.title !== undefined ? changes.title : updatedUser.company?.title || '',
        address: {
          ...updatedUser.company?.address,
          address: changes.companyAddress !== undefined ? changes.companyAddress : updatedUser.company?.address?.address || '',
          city: changes.companyCity !== undefined ? changes.companyCity : updatedUser.company?.address?.city || '',
          state: changes.companyState !== undefined ? changes.companyState : updatedUser.company?.address?.state || '',
          stateCode: changes.companyStateCode !== undefined ? changes.companyStateCode : updatedUser.company?.address?.stateCode || '',
          postalCode: changes.companyPostalCode !== undefined ? changes.companyPostalCode : updatedUser.company?.address?.postalCode || '',
          coordinates: {
            lat: changes.companyLat !== undefined ? changes.companyLat : updatedUser.company?.address?.coordinates?.lat || null,
            lng: changes.companyLng !== undefined ? changes.companyLng : updatedUser.company?.address?.coordinates?.lng || null
          },
          country: changes.companyCountry !== undefined ? changes.companyCountry : updatedUser.company?.address?.country || ''
        }
      };
    }

    // Handle crypto object
    if (changes.coin !== undefined || changes.wallet !== undefined || changes.network !== undefined) {
      updatedUser.crypto = {
        ...updatedUser.crypto,
        coin: changes.coin !== undefined ? changes.coin : updatedUser.crypto?.coin || '',
        wallet: changes.wallet !== undefined ? changes.wallet : updatedUser.crypto?.wallet || '',
        network: changes.network !== undefined ? changes.network : updatedUser.crypto?.network || ''
      };
    }

    // Update simple fields
    const simpleFields = ['firstName', 'lastName', 'maidenName', 'age', 'gender', 'email', 'phone', 'username',
                         'birthDate', 'image', 'bloodGroup', 'height', 'weight', 'eyeColor', 'ip', 'macAddress',
                         'university', 'ein', 'ssn', 'userAgent', 'role'];

    simpleFields.forEach(field => {
      if (changes[field] !== undefined) {
        updatedUser[field] = changes[field];
      }
    });

    updatedUser.updatedAt = new Date().toISOString();

    users[index] = updatedUser;
    await this._writeData(users);
    const { password, ...userWithoutPassword } = updatedUser;
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

  async findByRole(role) {
    const users = await this._readData();
    return users.filter(user => user.role === role).map(user => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
  }

  async updateRole(id, role) {
    const users = await this._readData();
    const index = users.findIndex(user => user.id === id);
    if (index === -1) {
      throw boom.notFound('User not found');
    }
    users[index].role = role;
    users[index].updatedAt = new Date().toISOString();
    await this._writeData(users);
    const { password, ...userWithoutPassword } = users[index];
    return userWithoutPassword;
  }

  async getUserStats() {
    const users = await this._readData();
    const stats = {
      total: users.length,
      admin: users.filter(u => u.role === 'admin').length,
      moderator: users.filter(u => u.role === 'moderator').length,
      user: users.filter(u => u.role === 'user').length
    };
    return stats;
  }

}

module.exports = UsersService;
