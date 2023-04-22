import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import { setRootUserId } from "../state";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../constants/constants";

const checkUserAuthenticity = async ({
  dispatch,
  setIsLoading,
  setIsAuthenticated,
}) => {
  try {
    const response = await axios.get(`${BASE_URL}/auth/checkUserAuthenticity`, {
      withCredentials: true,
    });
    const { data, status } = response;
    if (!data.rootUserId || !status === 200) throw new Error("unAuthorized");
    if (data.rootUserId && status === 200) {
      dispatch(setRootUserId({ rootUserId: data.rootUserId }));
      setIsAuthenticated(true);
      setIsLoading(false);
    }
  } catch (error) {
    console.log(error);
    setIsAuthenticated(false);
    setIsLoading(false);
  }
};

const withAuth = (Component) => {
  const AuthenticatedComponent = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      checkUserAuthenticity({ dispatch, setIsAuthenticated, setIsLoading });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (isLoading) {
      return <div>Loading...</div>;
    } else if (isAuthenticated) {
      return <Component {...props} />;
    } else {
      return navigate("/");
    }
  };

  return AuthenticatedComponent;
};

export default withAuth;
