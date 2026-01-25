const GitHubStrategy = require('passport-github2').Strategy;

module.exports = function(passport) {
  // Use local credentials for development, production credentials for production
  const isProduction = process.env.NODE_ENV === 'production' || process.env.PORT;
  
  const clientID = isProduction ? process.env.GITHUB_CLIENT_ID : process.env.GITHUB_CLIENT_ID_LOCAL;
  const clientSecret = isProduction ? process.env.GITHUB_CLIENT_SECRET : process.env.GITHUB_CLIENT_SECRET_LOCAL;
  const callbackURL = isProduction ? process.env.CALLBACK_URL : process.env.CALLBACK_URL_LOCAL;

  passport.use(new GitHubStrategy({
      clientID: clientID,
      clientSecret: clientSecret,
      callbackURL: callbackURL
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