const User = require("../Models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    // 1. Check user
    const { name, password } = req.body;

    var user = await User.findOne({ name });

    if (user) {
      return res.status(400).send("User Already Exist!!");
    }

    // 2. Generate salt and hash password
    const salt = await bcrypt.genSalt(10);
    user = new User({
      name,
      password,
    });

    user.password = await bcrypt.hash(password, salt);

    // 3. Save user to the database
    await user.save();
    res.send("Registration has been successful");
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
};

exports.login = async (req, res) => {
  try {
    // 1. Check User
    const { name, password } = req.body;
    const user = await User.findOne({ name });

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).send("Password invalid!!!");
      }

      // 2. Payload
      const payload = {
        user: {
          name: user.name,
        },
      };

      // 3. Generate Token
      jwt.sign(payload, "jwtsecret", { expiresIn: 20 }, (error, token) => {
        if (error) throw error; // Fix the typo here

        res.json({
          token,
          payload,
        });
      });
    } else {
      return res.status(400).send("User not found");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
};
