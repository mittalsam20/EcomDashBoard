import express from "express";
import {
  getProducts,
  getGeography,
  updateCustomer,
  createCustomer,
  deleteCustomer,
  getAllTransactions,
  updateTransactions,
  deleteTransactions,
  getAllCustomers,
} from "../controllers/client.js";

const router = express.Router();
router
  .get("/customers/:userId", getAllCustomers)
  .post("/customer", createCustomer)
  .put("/customer/:customerId", updateCustomer)
  .delete("/customer/:customerId", deleteCustomer)

  .get("/transactions/:userId", getAllTransactions)
  .put("/transaction/:transactionId", updateTransactions)
  .delete("/customer/:transactionId", deleteTransactions)

  .get("/products", getProducts)
  .get("/geography", getGeography);

export default router;
