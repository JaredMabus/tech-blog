const router = require('express').Router();
const { User, Post, Comment } = require('../models');

router.get('/', async (req, res) => {
  try {
    let resData = await Post.findAll({
      include: [
        { model: User, attributes: ['username'] },
        // { model: Comment, include: { model: User, attributes: ['username'] } },
      ]
    });
    const data = resData.map((post) => post.get({ plain: true }));

    res.render('home', { loggedIn: req.session.loggedIn, data });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.get('/login', async (req, res) => {
  try {
    res.render('login');
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/sign-up', async (req, res) => {
  try {
    res.render('signUp');
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.get('post/:id', async (res, req) => {
//   try {

//   } catch(err){
//     res.status(500).json(err.message)
//   }
// })

module.exports = router;
