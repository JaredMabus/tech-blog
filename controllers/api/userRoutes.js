const router = require('express').Router();
const { User } = require('../../models');

// Switch routes back to post after testing session cookie
router.post('/login', async (req, res) => {
  try {
    // Find the user who matches the posted e-mail address
    const userData = await User.findOne({ where: { username: req.body.username } });
    console.log(userData);
    if (!userData) {
      res
        .status(400)
        .json({ msg: 'Incorrect username or password, please try again' });
    }

    // Verify the posted password with the password store in the database
    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ msg: 'Incorrect username or password, please try again' });
    }

    // Create session variables based on the logged in user
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.loggedIn = true;

      res.json({ user: userData, msg: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  try {
    if (req.session.loggedIn) {
      // Remove the session variables
      req.session.destroy(() => {
        console.log("Logged Out!")
        res.status(204).end();
      });
    } else {
      res.status(404).json({ message: "User not logged in" });
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }

});

module.exports = router;
