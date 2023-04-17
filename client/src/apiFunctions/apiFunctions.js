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
  try {
    const response = await axios.get(`${BASE_URL}/auth/checkUserAuthenticity`, {
      withCredentials: true,
    });
    const { data, status } = response;
    // if (data.rootUserId && status === 200 && route==="/")
    // navigate("/dashboard");
    if (!data.rootUserId || !status === 200) throw new Error("unAuthorized");
  } catch (error) {
    console.log(error);
    // navigate("/");
  }
};

export const getSingleCustomer = async ({ customerId }) => {
  try {
    const response = await axios.get(`${BASE_URL}/customers/:${customerId}`);
    const { data, status } = response;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const addNewCustomer = async ({ customerDetails }) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/customers/create`,
      customerDetails
    );
    const { data, status } = response;
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
