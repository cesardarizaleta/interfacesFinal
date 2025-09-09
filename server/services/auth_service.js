require('dotenv').config();
const { UsersService } = require('./user_service');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { config } = require('../config/config');
const service = new UsersService();

class AuthService{
    async getUser(email, password){
        const user = await service.findByEmailWithPassword(email);
        if(!user){
            throw boom.unauthorized('Invalid credentials');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw boom.unauthorized('Invalid credentials');
        }

        delete user.password;
        return user;
    }

    signToken(user){
        const payload = {
            sub: user.id,
            role: user.role || 'user',
            email: user.email
        }
        const token = jwt.sign(payload, config.jwtSecret);
        return{
            user,
            token
        };
    }
}

module.exports = AuthService