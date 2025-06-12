const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: String,
  email: String,
  role: { type: String, default: "User" },
  address: [
    {
      name:String,
      street: String,
      city: String,
      state: String,
      zip: String,
      country: String,
      phone:String,
      isSelected: { type: Boolean, default: false },
    },
  ],
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model("User", userSchema);
