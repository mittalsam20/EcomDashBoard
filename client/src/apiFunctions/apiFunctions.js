import axios from "axios";
import { BASE_URL, googleGeoCodingApiKey } from "constants/constants";
import { setToastMessage, setRootUserId } from "state";

export const checkUserAuthenticity = async ({
  navigate,
  dispatch,
  sourceRoute = null,
}) => {
  try {
    const response = await axios.get(`${BASE_URL}/auth/checkUserAuthenticity`, {
      withCredentials: true,
    });
    const { data, status } = response;
    if (!data.rootUserId || !status === 200) throw new Error("unAuthorized");
    if (data.rootUserId && status === 200 && sourceRoute === "")
      navigate("/dashboard");
    dispatch(setRootUserId({ rootUserId: data.rootUserId }));
  } catch (error) {
    console.log(error);
    navigate("/");
  }
};

export const getAllCustomersApi = async () => {
export const getAllCustomers = async ({ userId }) => {
  try {
    const response = await axios.get(`${BASE_URL}/client/customers/${userId}`);
    const { data, status } = response;
    if (status !== 200) throw new Error("Server Error");
    return data.customers;
  } catch (error) {
    console.log(error);
  }
};

export const getSingleCustomer = async ({ customerId }) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/client/customers/:${customerId}`
    );
    const { data, status } = response;
    if (status !== 200) throw new Error("Server Error");
    return data.customer;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const addNewCustomer = async ({ customerDetails }) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/client/customers`,
      customerDetails
    );
    const { data, status } = response;
    if (status !== 200) throw new Error("Server Error");
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const editCustomer = async ({ customerId, updatedCustomer }) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/customers/edit/:${customerId}`,
      updatedCustomer
    );
    return response;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const deleteCustomer = async ({ customerId }) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/customers/delete/:${customerId}`
    );
    return response;
  } catch (error) {
    console.log(error);
    return false;
  }
};
