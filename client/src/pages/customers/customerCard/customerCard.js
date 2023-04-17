import React from "react";
import "./customerCard.scss";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";

import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import ReceiptRoundedIcon from "@mui/icons-material/ReceiptRounded";
import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";

import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ShareIcon from "@mui/icons-material/Share";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  getInitialsFromFullName,
  getRandomColorFromString,
} from "utils/helperFunctions";
import { Button } from "@mui/material";
import { deleteCustomer } from "apiFunctions/apiFunctions";

const getActionButtons = ({
  onClickEdit,
  onClickDelete,
  addedToPrintSpool,
  onClickPrintAddress,
  onClickPrintInvoice,
}) => {
  return [
    {
      id: "EDIT",
      text: "Edit",
      variant: "outlined",
      fullWidth: true,
      size: "large",
      startIcon: <EditRoundedIcon />,
      onClick: onClickEdit,
    },
    {
      id: "DELETE",
      text: "Delete",
      variant: "outlined",
      color: "error",
      size: "large",
      fullWidth: true,
      startIcon: <DeleteRoundedIcon />,
      onClick: onClickDelete,
    },
    addedToPrintSpool
      ? {
          id: "REMOVE_FROM_PRINT_SPOOL",
          text: "Remove From Print Spool",
          fullWidth: true,
          color: "error",
          variant: "contained",
          startIcon: <ReceiptRoundedIcon />,
          onClick: () => {},
        }
      : {
          id: "ADD_TO_PRINT_SPOOL",
          text: "Add To Print Spool",
          fullWidth: true,
          variant: "contained",
          startIcon: <BusinessRoundedIcon />,
          onClick: () => {},
        },
  ];
};

const CustomerCard = (props) => {
  const {
    id,
    type,
    orders,
    address,
    fullName,
    customerId,
    phoneNumber,
    financialStatus = "",
    setFormData,
    setCustomerModalData,
  } = props;
  const { street1, street2, city, state, country, pinCode } = address;
  const totalOrderByCustomer = orders.length;
  const fullNameInitials = getInitialsFromFullName({ fullName });

  const onClickEdit = () => {
    setFormData({
      fullName,
      type,
      address: {
        pinCode,
        country,
        state,
        city,
        street1,
        street2,
      },
      phoneNumber,
    });
    setCustomerModalData({ mode: "edit", customerId: id });
  };

  const onClickDelete = () => {
    deleteCustomer({ customerId: id });
  };
  const onClickPrintAddress = ({}) => {};
  const onClickPrintInvoice = ({}) => {};

  const actionButtons = getActionButtons({
    onClickEdit,
    onClickDelete,
    onClickPrintAddress,
    onClickPrintInvoice,
  });

  const avatarColor = getRandomColorFromString({ string: fullName });
  // const customerDetails=[

  // ]
  // {
  //     id:"NAME",
  // key:null,
  // ,value:
  // }
  return (
    <Card className={"cardContainer"}>
      <div className={"cardContentContainer"}>
        <div className="customerDetailsUpperContainer">
          <div className={"avatarContainer"}>
            <Avatar sx={{ bgcolor: avatarColor, width: 54, height: 54 }}>
              {fullNameInitials}
            </Avatar>
            <div>
              <Typography variant="h3" sx={{ textTransform: "capitalize" }}>
                {fullName}
              </Typography>
              <p>{`CustomerId:-${customerId}`}</p>
              <p>{`Type:- ${type}`}</p>
            </div>
          </div>
          <div>
            <p>{"Phone Number"}</p>
            <p>{phoneNumber}</p>
          </div>
          <div>
            <p>{`City/State`}</p>
            <p>{`${city}, ${state}`}</p>
          </div>
          <div>
            <p>{"Total Orders"}</p>
            <p>{totalOrderByCustomer}</p>
          </div>
          <div>
            <p>{"Status"}</p>
            <p>{financialStatus}</p>
          </div>
        </div>

        <div className="lastOrderContainer">
          <h3>{"Last Order"}</h3>
          <div className="lastOrderDetails">
            <div>
              <p>{"Order Date"}</p>
              <p>{"value"}</p>
            </div>
            <div>
              <p>{"Status"}</p>
              <p>{"value"}</p>
            </div>
            <div>
              <p>{"Amount"}</p>
              <p>{"value"}</p>
            </div>
            <div>
              <p>{"Number Of Items"}</p>
              <p>{"value"}</p>
            </div>
            <div>
              <p>{"Payment Mode"}</p>
              <p>{"value"}</p>
            </div>
          </div>
        </div>
      </div>

      <div className={"cardActionsContainer"}>
        {actionButtons.map(({ id, text, ...restProps }) => {
          return (
            <Button key={id} {...restProps}>
              {text}
            </Button>
          );
        })}
      </div>
    </Card>
  );
};

export default CustomerCard;
