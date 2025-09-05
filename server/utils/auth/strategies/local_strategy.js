const { Strategy } = require('passport-local')
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const container = require('../../../container');
const service = container.getService('users');

const LocalStrategy = new Strategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    async (username, password, done) => {
        try{
            const user = await service.findByEmailWithPassword(username);
            if(!user){
                done(boom.unauthorized(), false);
            }
            const isMatch = await service.validatePassword(password, user.password);
            if (!isMatch) {
                done(boom.unauthorized(), false);
            }
            done(null, user);
        }
        catch(error){
            done(error, false);
        }
    }
);

module.exports = LocalStrategy;
