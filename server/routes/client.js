import express from "express";
import {
  getProducts,
  getAllCustomers,
  createCustomer,
  editCustomer,
  deleteCustomer,
  getGeography,
  getTransactions,
} from "../controllers/client.js";

const router = express.Router();
router
  .get("/customers", getAllCustomers)
  .post("/customers", createCustomer)
  .put("/customers/:id", editCustomer)
  .delete("/customers/:id", deleteCustomer)
  .get("/products", getProducts)
  .get("/transactions", getTransactions)
  .get("/geography", getGeography);

export default router;
