import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    orderAmount: {
      type: Number,
      default: 0,
    },
    paid: {
      type: String,
      required: true,
      default: "Paid",
    },
    status: {
      type: String,
      required: true,
      default: "Order Taken",
    },
    completed: {
      type: Boolean,
      default: false,
    },
    orderNumber: {
      type: String,
    },
    amountPaid: {
      type: Number,
      default: 0,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    paymentMode: {
      type: String,
      required: true,
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  { timestamps: true }
);

const Transaction = mongoose.model("Transaction", TransactionSchema);
export default Transaction;
