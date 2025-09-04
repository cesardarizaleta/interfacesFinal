const fs = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');
const logger = require('./logger');

const initializeData = async () => {
  const usersFilePath = path.join(__dirname, '../data/users.json');

  try {
    // Check if users.json exists and has content
    let users = [];
    try {
      const data = await fs.readFile(usersFilePath, 'utf8');
      users = JSON.parse(data);
    } catch (error) {
      // File doesn't exist or is empty, create it
      users = [];
    }

    // Check if admin user already exists
    const adminExists = users.some(user => user.email === process.env.ADMIN_EMAIL);

    if (!adminExists) {
      // Create admin user
      const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

      const adminUser = {
        id: 'admin-001',
        firstName: 'Admin',
        lastName: 'User',
        maidenName: '',
        age: 30,
        gender: 'male',
        email: process.env.ADMIN_EMAIL,
        phone: '+1234567890',
        username: 'admin',
        password: hashedPassword,
        birthDate: '1994-01-01',
        image: '',
        bloodGroup: 'O+',
        height: 175,
        weight: 70,
        eyeColor: 'Brown',
        hair: {
          color: 'Black',
          type: 'Straight'
        },
        ip: '127.0.0.1',
        address: {
          address: '123 Admin Street',
          city: 'Admin City',
          state: 'Admin State',
          stateCode: 'AS',
          postalCode: '12345',
          coordinates: {
            lat: 0,
            lng: 0
          },
          country: 'Admin Country'
        },
        macAddress: '00:00:00:00:00:00',
        university: 'Admin University',
        bank: {
          cardExpire: '12/25',
          cardNumber: '1234567890123456',
          cardType: 'Admin Card',
          currency: 'USD',
          iban: 'ADMIN123456789'
        },
        company: {
          department: 'IT',
          name: 'Admin Company',
          title: 'Administrator',
          address: {
            address: '123 Admin Street',
            city: 'Admin City',
            state: 'Admin State',
            stateCode: 'AS',
            postalCode: '12345',
            coordinates: {
              lat: 0,
              lng: 0
            },
            country: 'Admin Country'
          }
        },
        ein: '12-3456789',
        ssn: '123-45-6789',
        userAgent: 'Admin Browser',
        crypto: {
          coin: 'Bitcoin',
          wallet: '0x123456789abcdef',
          network: 'Ethereum'
        },
        role: 'admin',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      users.push(adminUser);
      await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2));

      logger.info('Admin user created successfully!');
      logger.info('Email: ' + process.env.ADMIN_EMAIL);
      logger.info('Password: ' + process.env.ADMIN_PASSWORD);
    } else {
      logger.info('Admin user already exists');
    }

  } catch (error) {
    logger.error('Error initializing data:', error);
  }
};

module.exports = { initializeData };

// Run if called directly
if (require.main === module) {
  initializeData();
}
