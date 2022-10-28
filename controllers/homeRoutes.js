const router = require('express').Router();
const { User } = require('../models');

router.get('/', async (req, res) => {
  try {
    res.render('home', { loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/dashboard', async (req, res) => {
  try {
    if (req.session.loggedIn) {
      res.render('dashboard', { loggedIn: req.session.loggedIn });
    } else {
      res.redirect('/login');
    }

  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', async (req, res) => {
  try {
    res.render('login', { loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/sign-up', async (req, res) => {
  try {
    res.render('signUp', { loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
