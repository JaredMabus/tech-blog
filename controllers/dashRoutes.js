const router = require('express').Router();
const { User, Post, Comment } = require('../models');

router.get('/', async (req, res) => {
    try {
        if (req.session.loggedIn) {
            console.log(req.session.userId)
            let resData = await Post.findAll({
                where: { user_id: req.session.userId },
                include: [
                    { model: User, attributes: ['username'] },
                    { model: Comment, include: { model: User, attributes: ['username'] } },
                ]
            });
            console.log("test")
            const data = resData.map((post) => post.get({ plain: true }));

            console.log(data)
            res.render('dashboard', { data, loggedIn: req.session.loggedIn });
        } else {
            res.redirect('/login');
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router