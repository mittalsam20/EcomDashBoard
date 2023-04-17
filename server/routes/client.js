import express from "express";
import {
  getProducts,
  editCustomer,
  getGeography,
  createCustomer,
  deleteCustomer,
  getTransactions,
  getAllCustomers,
} from "../controllers/client.js";

const router = express.Router();
router
  .get("/customers/:userId", getAllCustomers)
  .post("/customers", createCustomer)
  .put("/customers/:id", editCustomer)
  .delete("/customers/:id", deleteCustomer)
  .get("/products", getProducts)
  .get("/transactions", getTransactions)
  .get("/geography", getGeography);

export default router;
