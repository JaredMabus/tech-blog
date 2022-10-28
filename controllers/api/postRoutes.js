const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

router.get('/', async (req, res) => {
  try {
    let data = await Post.findAll({
      include: [
        { model: User, attributes: ['username'] },
        { model: Comment, include: { model: User, attributes: ['username'] } },
      ]
    });

    res.status(200).json(data)

  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});

router.get('/:userId', async (req, res) => {
  try {
    let data = await Post.findByPk(req.params.userId, {
      include: [{ model: Comment }, { model: User, attributes: ['username'] }]
    });

    res.status(200).json(data)

  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    let data = await Post.create(req.body);

    res.status(200).json({ msg: "Successfully added post!" })

  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});

router.put('/id', async (req, res) => {
  try {
    if (req.session.loggedIn) {
      let datat = await Post.update(req.body, { where: { id: req.params.id } })
      res.status(200).json({ msg: "success" });
    } else {
      res.status(404).json({ message: "User not logged in" });
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

router.delete('/id', async (req, res) => {
  try {
    let data = await Post.destroy({ where: { id: req.params.id } })
    console.log(data);
    res.status(200).json({ msg: "success" });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

module.exports = router;
