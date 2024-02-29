const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: string, required: true, unique: true },
  email: { type: string, required: true, unique: true },
  password: { type: string, required: true, unique: true },
  roles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
    },
  ],
});

const User = mongoose.model("User", userSchema);
module.exports = User;
