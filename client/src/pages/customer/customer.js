import React, { useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";

import { checkUserAuthenticity } from "apiFunctions/apiFunctions";
import { useDispatch } from "react-redux";

const Customer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    checkUserAuthenticity({ dispatch, navigate });
  }, []);

  return <div>customer</div>;
};

export default Customer;
