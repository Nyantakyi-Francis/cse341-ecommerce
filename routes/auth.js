const express = require('express');
const passport = require('passport');
const router = express.Router();

// #swagger.tags = ['Authentication']
// #swagger.description = 'Redirect to GitHub for authentication'
router.get('/login', passport.authenticate('github', { scope: ['user:email'] }));

// #swagger.tags = ['Authentication']
// #swagger.description = 'GitHub OAuth callback'
router.get('/github/callback', 
  passport.authenticate('github', { failureRedirect: '/api-docs' }),
  (req, res) => {
    res.redirect('/api-docs');
  }
);

// #swagger.tags = ['Authentication']
// #swagger.description = 'Logout current user'
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: 'Logout failed' });
    }
    res.redirect('/api-docs');
  });
});

// #swagger.tags = ['Authentication']
// #swagger.description = 'Check authentication status'
router.get('/status', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ 
      loggedIn: true, 
      user: {
        username: req.user.username,
        displayName: req.user.displayName
      }
    });
  } else {
    res.json({ loggedIn: false });
  }
});

module.exports = router;