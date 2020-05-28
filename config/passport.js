const JWTStratergy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const mongoose = require('mongoose');
const User = mongoose.model('users');

const { secretKey } = require('./keys');

opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: secretKey
};


module.exports = passport => {
    passport.use(new JWTStratergy(opts, (jwt_payload, done) => {
        User.findById(jwt_payload.id)
            .then(user => {
                if (user) return done(null, user);
                return done(null, false);
            })
            .catch(err => console.log(err));
    }));
}