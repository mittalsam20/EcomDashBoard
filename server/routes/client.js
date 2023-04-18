import express from "express";
import {
  getProducts,
  getGeography,
  getAllTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  createCustomer,
  getAllCustomers,
  updateCustomer,
  deleteCustomer,
} from "../controllers/client.js";

const router = express.Router();
router
  .get("/customers/:userId", getAllCustomers)
  .post("/customer", createCustomer)
  .put("/customer/:customerId", updateCustomer)
  .delete("/customer/:customerId", deleteCustomer)

  .get("/transactions/:userId", getAllTransactions)
  .post("/transaction", createTransaction)
  .put("/transaction/:transactionId", updateTransaction)
  .delete("/customer/:transactionId", deleteTransaction)

  .get("/products", getProducts)
  .get("/geography", getGeography);

export default router;
