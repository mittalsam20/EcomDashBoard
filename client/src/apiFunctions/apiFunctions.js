import axios from "axios";
import { BASE_URL } from "constants/constants";

export const checkUserAuthenticity = async ({ navigate }) => {
  try {
    const response = await axios.get(`${BASE_URL}/auth/checkUserAuthenticity`, {
      withCredentials: true,
    });
    const { data, status } = response;
    if (!data.rootUserId || !status === 200) throw new Error("unAuthorized");
  } catch (error) {
    console.log(error);
    navigate("/");
  }
};
