

var GoogleStrategy = require('passport-google-oauth20').Strategy;

module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user);
    });
    passport.deserializeUser((user, done) => {
        done(null, user);
    });
    passport.use(new GoogleStrategy({
            clientID: '810189725883-jitqrtnggts7f2p2d4lrl2qbr7rrh6b4.apps.googleusercontent.com',
            clientSecret: '7KLat_4Fz31LJahbTmHoPaMq',
            callbackURL: 'http://localhost:3000/auth/google/secrets'
        },
        (token, refreshToken, profile, done) => {
            return done(null, {
                profile: profile,
                token: token
            });
        }));
};