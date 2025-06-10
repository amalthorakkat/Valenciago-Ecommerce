const express = require("express");
const { connect } = require("mongoose");
const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoutes");
const posterRoutes = require("./routes/posterRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const cartRoutes = require("./routes/cartRoutes");
const userRoutes = require("./routes/userRoutes");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { verifyToken } = require("./middlewares/authMiddlewares");
const userModel = require("./models/userModels");
const upload = require("./middlewares/multer");

const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(express.static("./uploads"));
app.use("/uploads", express.static("uploads"));
require("dotenv").config();
app.use(cookieParser());

// connect to MongoDB
connectDB();

// routes
app.use(productRoutes);
app.use(authRoutes);
app.use(orderRoutes);
app.use(posterRoutes);
app.use(categoryRoutes);
app.use("/", cartRoutes);
app.use("/api/user", userRoutes);

app.post("/upload", verifyToken, upload.single("file"), async (req, res) => {
  console.log(req.file);
  const avatar = `http://localhost:${process.env.PORT}/${req.file.originalname}`;
  const user = await userModel.findByIdAndUpdate(
    req.user.id,
    { $set: { avatar: avatar } },
    { new: true }
  );
  console.log(user);
  res.json(user);
});

app.listen(process.env.PORT, () => {
  console.log("server is running at PORT :", process.env.PORT);
});
