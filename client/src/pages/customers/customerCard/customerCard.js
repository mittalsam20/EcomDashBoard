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
  getFullNameAndInitials,
  getRandomColorFromString,
} from "utils/helperFunctions";
import { Button } from "@mui/material";

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
      onClick: () => {},
    },
    {
      id: "DELETE",
      text: "Delete",
      variant: "outlined",
      color: "error",
      size: "large",
      fullWidth: true,
      startIcon: <DeleteRoundedIcon />,
      onClick: () => {},
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
    orders,
    status,
    customerId,
    lastName = "mittal",
    firstName = "sam",
    address,
    profilePhoto,
    contactNumber,
  } = props;
  //   const { street1, street2, city, state, country } = address;
  const totalOrderByCustomer = [].length;
  const { fullName, fullNameInitials } = getFullNameAndInitials({
    firstName,
    lastName,
  });

  const onClickEdit = ({}) => {};
  const onClickDelete = ({}) => {};
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
          <>
            <Avatar sx={{ bgcolor: avatarColor }}>{fullNameInitials}</Avatar>
            <h2>{fullName}</h2>
          </>
          <div className={"customerDetailsContainer"}>
            <p>{"Phone Number:-  9821440574"}</p>
            <p>{`City/State:-  City,State`}</p>
            <p>{"Total Orders:-  53"}</p>
            {/* {country !== "IN" && <p>{`Country:-  Country`}</p>} */}
            <p>{"status"}</p>
            <p>{"value "}</p>
            <p>{"value"}</p>
            <p>{"value "}</p>
            <p>{"value "}</p>
          </div>
        </div>

        <div className="lastOrderContainer">
          <h3>{"Last Order"}</h3>
          <div className="lastOrderDetails">
            <p>{"Order Date"}</p>
            <p>{"Status"}</p>
            <p>{"Amount"}</p>
            <p>{"Number Of Items"}</p>
            <p>{"Payment Mode"}</p>
            <p>{"value "}</p>
            <p>{"value"}</p>
            <p>{"value"}</p>
            <p>{"value "}</p>
            <p>{"value "}</p>
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
