const passport = require("passport");
const express = require("express");
const app = express();

//Google auth


module.exports = app =>{
    app.get('/', (req, res) => {
    if (req.session.token) {
        res.cookie('token', req.session.token);
        res.json({
            status: 'session cookie set'
        });
    } else {
        res.cookie('token', '')
        res.json({
            status: 'session cookie not set'
        });
    }
  });
  
  app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile'] }));
  
  app.get('/auth/google/secrets', 
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
      // Successful authentication, redirect home.
      res.redirect('/');
    });
}