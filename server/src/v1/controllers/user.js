const User = require("../models/user");
const CryptoJS = require("crypto-js");
const jsonwebtoken = require("jsonwebtoken");

// REGISTER
exports.register = async (req, res) => {
  const { password } = req.body;
  try {
    req.body.password = CryptoJS.AES.encrypt(
      password,
      process.env.PASSWORD_SECRET
    );

    const user = await User.create(req.body);
    const token = jsonwebtoken.sign(
      { id: user._id },
      process.env.TOKEN_SECRET,
      { expiresIn: "24h" }
    );

    res.status(201).json({ user, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//LOGIN
exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username }).select("password username");

    if (!user) {
      return res.status(401).json({
        errors: [
          {
            param: "username",
            msg: "No user found with this Username!",
          },
        ],
      });
    }

    const decryptedPas = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASSWORD_SECRET
    ).toString(CryptoJS.enc.Utf8);

    // If Password Doesn't Match
    if (decryptedPas !== password) {
      return res.status(401).json({
        errors: [
          {
            param: "password",
            msg: "Invalid Password!",
          },
        ],
      });
    }

    user.password = undefined;
    const token = jsonwebtoken.sign(
      { id: user._id },
      process.env.TOKEN_SECRET,
      { expiresIn: "24h" }
    );

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
