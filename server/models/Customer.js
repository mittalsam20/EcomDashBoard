import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    customerId: {
      type: Number,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
      max: 100,
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 100,
    },
    address: {
      street1: {
        type: String,
        required: true,
      },
      street2: {
        type: String,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        default: "India",
      },
      pinCode: {
        type: String,
        required: true,
      },
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    customerFinanceStatus: {
      status: { type: String },
      amount: { type: Number },
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Transaction" }],
  },
  { timestamps: true }
);

CustomerSchema.pre("save", async function (next) {
  const user = await mongoose.model("User").findOne({ _id: this.userId });
  if (user) {
    user.customerCount++;
    await user.save();
    this.customerId = user.customerCount;
  }
  next();
});

const Customer = mongoose.model("Customer", CustomerSchema);
export default Customer;
