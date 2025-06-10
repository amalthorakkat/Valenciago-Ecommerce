// const mongoose = require("mongoose");

// const bcrypt = require("bcryptjs");

// const userSchema = new mongoose.Schema({
//   username: {
//     type: String,
//     required: true,
//   },
//   password: String,
//   email: String,
//   role: {
//     type: String,
//     default: "User",
//   },
//   address: [
//     {
//       street: String,
//       city: String,
//       state: String,
//       zip: String,
//       country: String,
//       isSelected:{
//           type:Boolean,
//           default:true,
//       },
//     },
//   ],

// //   address: {
// //     street: String,
// //     city: String,
// //     state: String,
// //     zip: String,
// //     country: String,
// //   },
// });

// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) {
//     return next;
//   }
//   this.password = await bcrypt.hash(this.password, 10);
// });

// const userModel = mongoose.model("User", userSchema);
// module.exports = userModel;

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: String,
  email: String,
  role: { type: String, default: "User" },
  address: [
    {
      street: String,
      city: String,
      state: String,
      zip: String,
      country: String,
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

