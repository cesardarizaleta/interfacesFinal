const { Strategy, ExtractJwt } = require('passport-jwt')
const {config} = require('../../../config/config')
const { UsersService } = require('../../../services/user_service')
const service = new UsersService()

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwtSecret
}

const JwtStrategy = new Strategy(options, async (payload, done) => {
    try {
        const user = await service.findOne(payload.sub);
        if (!user) {
            return done(null, false);
        }
        return done(null, { ...payload, ...user });
    } catch (error) {
        return done(error, false);
    }
});

module.exports = JwtStrategy
