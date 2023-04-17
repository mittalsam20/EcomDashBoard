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

export const getAddressDetailsFromPinCode = async ({ pinCode }) => {
  const googleGeoCodingApi = `https://api.opencagedata.com/geocode/v1/json?key=${googleGeoCodingApiKey}&q=${pinCode}&pretty=1`;
  const { data } = await axios.get(googleGeoCodingApi);
  const lowestConfidenceResult = data.results.reduce((acc, result) =>
    acc.confidence > result.confidence ? result : acc
  );
  const { country, state, city } = lowestConfidenceResult.components;
  return { country, state, city };
};

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
      `${BASE_URL}/client/customer/${customerId}`
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
      `${BASE_URL}/client/customer`,
      customerDetails
    );
    const { data, status } = response;
    if (status !== 200) throw new Error("Server Error");
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateCustomer = async ({ customerId, updatedCustomer }) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/client/customer/${customerId}`,
      { updatedCustomer }
    );
    const { data, status } = response;
    if (status !== 200) throw new Error("Server Error");
    return data;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const deleteCustomer = async ({ customerId }) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/client/customer/${customerId}`
    );
    const { data, status } = response;
    if (status !== 200) throw new Error("Server Error");
    return data;
  } catch (error) {
    console.log(error);
    return false;
  }
};
