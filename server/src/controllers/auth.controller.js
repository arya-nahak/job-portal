const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;

let jwt = require("jsonwebtoken");
let bycrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  try {
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: bycrypt.hashSync(req.body.password, 8),
    });

    await user.save();

    let roles;

    if (req.body.roles) {
      roles = await Role.find({ username: { $in: req.body.roles } });
    } else {
      roles = await Role.findOne({ username: "applicant" });
    }

    user.roles = roles.map((role) => role._id);

    await user.save();

    res.status(200).json({ message: "Registered successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err.message || "Some error occurred while creating the user.",
    });
  }
};
exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username }).populate(
      "roles",
      "-__v"
    );

    

  } catch (err) {}
};
