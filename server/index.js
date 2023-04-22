import express from "express";

import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import mongoose from "mongoose";
import bodyParser from "body-parser";

import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.js";
import salesRoutes from "./routes/sales.js";
import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import managementRoutes from "./routes/management.js";

// data imports
// import User from "./models/User.js";
// import Product from "./models/Product.js";
// import ProductStat from "./models/ProductStat.js";
// import Transaction from "./models/Transaction.js";
// import OverallStat from "./models/OverallStat.js";
// import {
//   dataUser,
//   dataProduct,
//   dataProductStat,
//   dataTransaction,
//   dataOverallStat,
// } from "./data/index.js";

const allowedOrigins = [
  "http://localhost:3000",
  "https://shopman1.netlify.app",
  "https://shopman1.netlify.app/",
  "https://ecommanger.onrender.com",
  "https://ecommanager.onrender.com/",
];

// Configurations
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

//Routes
app.use("/auth", authRoutes);
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);

// Mongoose Setup
const PORT = process.env.PORT || 9000;
mongoose
  .set("strictQuery", false)
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server started running at ${PORT}`));
    //Injected Data once, dont inject again
    // User.insertMany(dataUser);
    // Product.insertMany(dataProduct);
    // ProductStat.insertMany(dataProductStat);
    // Transaction.insertMany(dataTransaction);
    // OverallStat.insertMany(dataOverallStat);
  })
  .catch((error) => console.log(`Error Encountered: ${error}`));
