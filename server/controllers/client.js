import getCountryIso3 from "country-iso-2-to-3";

import User from "../models/User.js";
import Product from "../models/Product.js";
import ProductStat from "../models/ProductStat.js";
import Transaction from "../models/Transaction.js";
import Customer from "../models/Customer.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    const productsWithStats = await Promise.all(
      products.map(async (product) => {
        const stat = await ProductStat.find({ productId: product._id });
        return { ...product._doc, stat };
      })
    );

    res.status(200).json(productsWithStats);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getAllCustomers = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId)
      res.status(400).json({ message: "Server cannot detect a valid userID" });
    const customers = await Customer.find({ userId });
    res.status(200).json({ message: "Successful", customers });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createCustomer = async (req, res) => {
  try {
    const {
      userId,
      address,
      lastName,
      firstName,
      phoneNumber,
      customerFinanceStatus,
    } = req.body;
    const { street1, street2, city, state, country, pinCode } = address;
    const { status, amount } = customerFinanceStatus;

    if (
      !userId ||
      !firstName ||
      !lastName ||
      !phoneNumber ||
      !street1 ||
      !city ||
      !state ||
      !pinCode
    ) {
      res.status(400).json({ message: "Please fill all details of customer" });
    }

    const newCustomer = new Customer({
      userId,
      lastName,
      firstName,
      address,
      phoneNumber,
      customerFinanceStatus,
    });
    newCustomer
      .save()
      .then(() =>
        res.status(200).json({ message: "Registration Successful..!!" })
      )
      .catch((error) => res.status(500).json(error));
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const editCustomer = async (req, res) => {
  try {
    const { updatedCustomer } = req.body;
    const { id: customerId } = req.params;
    const selectedCustomer = await Customer.findOne({ _id: customerId });
    if (!selectedCustomer)
      res.status(400).json({ message: "CustomerId is not valid." });
    selectedCustomer = updatedCustomer;
    selectedCustomer
      .save()
      .then(() => res.status(200).json({ message: "Successful Updated..!!" }))
      .catch((error) => res.status(500).json(error));
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteCustomer = async (req, res) => {
  try {
    const { id: customerId } = req.params;
    const result = await Customer.deleteOne({ _id: customerId });
    if (result.deletedCount === 0)
      res.status(404).json({ message: "Customer not found" });
    res.status(204).json({ message: "Customer successfully deleted..!!" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const generateSort = ({ sort }) => {
  const sortParsed = JSON.parse(sort);
  const sortFormatted = {
    [sortParsed.field]: (sortParsed.sort = "asc" ? 1 : -1),
  };
  return sortFormatted;
};

export const getTransactions = async (req, res) => {
  try {
    const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;
    const sortFormatted = Boolean(sort) ? generateSort({ sort }) : {};
    const transactions = await Transaction.find({
      $or: [
        { cost: { $regex: new RegExp(search, "i") } },
        { userId: { $regex: new RegExp(search, "i") } },
      ],
    })
      .sort(sortFormatted)
      .skip(page * pageSize)
      .limit(pageSize);

    const numberOfTransactions = await Transaction.countDocuments({
      name: [{ $regex: search, $options: "i" }],
    });
    res.status(200).json({ transactions, numberOfTransactions });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getGeography = async (req, res) => {
  try {
    const users = await User.find();
    const mappedLocations = users.reduce((acc, { country }) => {
      const countryISO3 = getCountryIso3(country);
      if (!acc[countryISO3]) {
        acc[countryISO3] = 0;
      }
      acc[countryISO3]++;
      return acc;
    }, {});
    const formattedLocation = Object.keys(mappedLocations).map((key) => ({
      id: key,
      value: mappedLocations[key],
    }));
    res.status(200).json(formattedLocation);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
