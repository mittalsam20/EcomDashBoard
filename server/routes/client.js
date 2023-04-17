import express from "express";
import {
  getProducts,
  getGeography,
  updateCustomer,
  createCustomer,
  deleteCustomer,
  getTransactions,
  getAllCustomers,
} from "../controllers/client.js";

const router = express.Router();
router
  .get("/customers/:userId", getAllCustomers)
  .post("/customer", createCustomer)
  .put("/customer/:customerId", updateCustomer)
  .delete("/customer/:customerId", deleteCustomer)
  .get("/products", getProducts)
  .get("/transactions", getTransactions)
  .get("/geography", getGeography);

export default router;
