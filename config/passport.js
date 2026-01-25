const GitHubStrategy = require('passport-github2').Strategy;

module.exports = function(passport) {
  passport.use(new GitHubStrategy({
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL || 'http://localhost:3000/auth/github/callback'
    },
    function(accessToken, refreshToken, profile, done) {
      // For now, we'll just use the GitHub profile
      return done(null, profile);
    }
  ));

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });
};