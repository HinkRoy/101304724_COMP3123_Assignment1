var express = require('express');
const User = require("../models/user");
var router = express.Router();

// Allow user to create new account
router.post('/signup', async function(req, res, next) {
  // Validate the data
  if (!req.body.username) {
    res.json({
      status: false,
      message: "Username required!"
    });
    return;
  }

  if (!req.body.email) {
    res.json({
      status: false,
      message: "Email required!"
    });
    return;
  }

  if (!req.body.password) {
    res.json({
      status: false,
      message: "Password required!"
    });
    return;
  }

  let matchedUser = User.findOne({ username: req.body.username });
  if (matchedUser.length > 0) {
    res.json({
      status: false,
      message: "Duplicate username!"
    });
    return;
  }

  matchedUser = User.findOne({ email: req.body.email });
  if (matchedUser.length > 0) {
    res.json({
      status: false,
      message: "Duplicate email!"
    });
    return;
  }

  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send();
  } catch (e) {
    res.status(500).send();
  }
});

// Allow user to access the system
router.post('/login', async function(req, res, next) {
  const { username, password } = req.body
  const user = await User.findOne({ username: username });
  if (user) {
    // matching password
    user.comparePassword(password, function(err, isMatch) {
      if (err) throw err;

      if (isMatch) {
        res.json({
          status: true,
          username: user.username,
          message: "User logged in successfully",
          jwt_token: null
        })
      } else {
        res.json({
          status: false,
          message: "Invalid Username and password"
        })
      }
    });
  } else {
    res.json({
      status: false,
      message: "Invalid Username and password"
    })
  }
});

module.exports = router;
