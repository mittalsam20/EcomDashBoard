import express from "express";
import {
  getProducts,
  getCustomers,
  getGeography,
  getTransactions,
} from "../controllers/client.js";

const router = express.Router();
router
  .get("/products", getProducts)
  .get("/customers", getCustomers)
  .get("/transactions", getTransactions)
  .get("/geography", getGeography);

export default router;
