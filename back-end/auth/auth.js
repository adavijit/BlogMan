var GithubStrategy = require('passport-github2').Strategy;
var GoogleStrategy = require('passport-google-oauth20').Strategy;

var GITHUB_CLIENT_ID='40b18d9786b1adc91eab';
var GITHUB_CLIENT_SECRET='f5c4a752cd43fe9e9462fab0893fadbfe2998f11';
var GOOGLE_CLIENT_ID='810189725883-jitqrtnggts7f2p2d4lrl2qbr7rrh6b4.apps.googleusercontent.com';
var GOOGLE_CLIENT_SECRET='7KLat_4Fz31LJahbTmHoPaMq';


module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user);
    });
    passport.deserializeUser((user, done) => {
        done(null, user);
    });

    //Google Strategy
    passport.use(new GoogleStrategy({
            clientID: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            callbackURL: '/auth/google/secrets'
        },
        (token, refreshToken, profile, done) => {
            return done(null, {
                profile: profile,
                token: token
            });
        }));

        //Github Strategy
        passport.use(new GithubStrategy({
            clientID: GITHUB_CLIENT_ID,
            clientSecret: GITHUB_CLIENT_SECRET,
            callbackURL: "/auth/github/secrets"
          },
          function(accessToken, refreshToken, profile, done) {
            User.findOrCreate({ githubId: profile.id }, function (err, user) {
              return done(err, user);
            });
          }
        ));
};