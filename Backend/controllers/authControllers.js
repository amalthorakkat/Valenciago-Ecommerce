const User = require("../models/userModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports.register = async (req, res) => {
  try {
    const userDetails = req.body;
    const isExist = await User.findOne({ email: userDetails.email });

    if (isExist) {
      return res.status(409).json({ message: "User already exists!" });
    }

    const newUser = await User.create(userDetails);
    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      process.env.jwt_secret,
      { expiresIn: "1hr" }
    );
    res.cookie("authToken", token, { maxAge: 60 * 60 * 1000 });

    res.status(201).json({ message: "Registration success!", newUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Regstration failed!", error: error.message });
  }
};

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const auth = await bcrypt.compare(password, user.password);

    if (auth) {
      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.jwt_secret,
        { expiresIn: "1hr" }
      );

      res.cookie("authToken", token, { maxAge: 60 * 60 * 1000 });

      return res.status(200).json({ message: "Login success", user });
    }
    res.status(401).json({ message: "Invalid password" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Regstration failed!", error: error.message });
  }
};

// module.exports.me = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id);
//     res.status(200).json(user);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "verification failed", error: error.message });
//   }
// };



module.exports.me = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); // exclude password
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user); // Includes address if exists
  } catch (error) {
    res
      .status(500)
      .json({ message: "Verification failed", error: error.message });
  }
};


module.exports.logout = async (req, res) => {
  try {
    res.clearCookie("authToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
    res.json({ message: "Logged out succesffully" });
  } catch (error) {
    res.status(500).json({ message: "logout failed", error: error.message });
  }
};

