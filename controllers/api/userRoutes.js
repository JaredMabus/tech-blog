const router = require('express').Router();
const { User } = require('../../models');

// Switch routes back to post after testing session cookie
router.get('/login', async (req, res) => {
  try {
    // Find the user who matches the posted e-mail address
    // const userData = await User.findOne({ where: { email: req.body.email } });

    // if (!userData) {
    //   res
    //     .status(400)
    //     .json({ message: 'Incorrect email or password, please try again' });
    //   return;
    // }

    // Verify the posted password with the password store in the database
    // const validPassword = await userData.checkPassword(req.body.password);

    // if (!validPassword) {
    //   res
    //     .status(400)
    //     .json({ message: 'Incorrect email or password, please try again' });
    //   return;
    // }

    // Create session variables based on the logged in user
    req.session.save(() => {
      req.session.user_id = "test";
      // req.session.user_id = userData.id;
      req.session.loggedIn = true;

      console.log(req.headers.cookie)
      console.log("Logged in!")

      // res.json({ user: userData, message: 'You are now logged in!' });
      res.status(200).json({ message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/logout', (req, res) => {
  try {
    if (req.session.loggedIn) {
      // Remove the session variables
      req.session.destroy(() => {
        console.log("Logged Out!")
        res.status(204).end();

        // Remove session cookie from client
        // res.clearCookie("notcookie").send('cleared cookie');
      });
    } else {
      res.status(404).json({ message: "User not logged in" });
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }

});

module.exports = router;
