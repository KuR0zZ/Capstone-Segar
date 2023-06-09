const passport = require('passport');
const passportJwt = require('passport-jwt');

const User = require('../models/User');

const ExtractJwt = passportJwt.ExtractJwt;
const StrategyJwt = passportJwt.Strategy;

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
}

passport.use( new StrategyJwt(options, async (jwt_payloads, done) => {
    try {
        const user = await User.findOne({ _id:  jwt_payloads.id }).select(' username email joinedAt token');
        if( user ){
            done(null, user)
        } else {
            done(null, false)
        }
    } catch (err) {
        done(err, false);
    }
}));