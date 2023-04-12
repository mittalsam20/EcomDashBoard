import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    customerDetails: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
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
        required: true,
      },
    ],
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "Payment Received/ Order Not Packed",
    },
    paymentId: {
      type: String,
      required: true,
    },
    orderNumber: {
      type: String,
      required: true,
    },
    amountLeftToBePaid: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Transaction = mongoose.model("Transaction", TransactionSchema);
export default Transaction;
