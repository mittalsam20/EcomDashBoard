import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { checkUserAuthenticity } from "apiFunctions/apiFunctions";

const Customer = () => {
  const navigate = useNavigate();

  useEffect(() => {
    checkUserAuthenticity({ navigate });
  }, []);

  return <div>customer</div>;
};

export default Customer;
