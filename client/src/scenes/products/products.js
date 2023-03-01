import React, { useState } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  Rating,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useGetProductsQuery } from "state/api";
import Header from "components/Header";

const Product = (props) => {
  const { _id, name, supply, price, stat, category, rating, description } =
    props;
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card
      sx={{
        backgroundImage: "none",
        borderRadius: "0.55rem",
        backgroundColor: theme.palette.background.alt,
      }}
    >
      <CardContent>
        <Typography
          sx={{ fontSize: 14 }}
          color={theme.palette.secondary[700]}
          gutterBottom
        >
          {category}
        </Typography>
        <Typography variant="5" component="div">
          {name}
        </Typography>
        <Typography sx={{ mb: "1.5rem" }} color={theme.palette.secondary[400]}>
          {`$${Number(price).toFixed(2)}`}
        </Typography>
        <Rating value={rating} readOnly />
        <Typography variant="body2">{description}</Typography>
      </CardContent>
      <CardActions>
        <Button
          variant={"primary"}
          size={"small"}
          onClick={() => {
            console.log(isExpanded);
            setIsExpanded(!isExpanded);
          }}
        >
          {"See More"}
        </Button>
      </CardActions>
      <Collapse
        in={isExpanded}
        timeout={"auto"}
        unmountOnExit
        sx={{ color: theme.palette.neutral[300] }}
      >
        <CardContent>
          <Typography>id: {_id}</Typography>
          <Typography>Supply Left: {supply}</Typography>
          <Typography>
            Yearly Sales This year: {stat.yearlySalesTotal}
          </Typography>
          <Typography>
            Yearly Units Sold This Year: {stat.yearlyTotalSoldUnits}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

const Products = () => {
  const { data, isLoading } = useGetProductsQuery();
  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  return (
    <Box m={"1.5rem 2.5rem"}>
      <Header title={"PRODUCTS"} subtitle={"See your list of products"} />
      {data || !isLoading ? (
        <Box
          mt={"20px"}
          display="grid"
          rowGap={"20px"}
          columnGap={"1.33%"}
          justifyContent={"space-between"}
          sx={{ "& > div": { gridColumn: isNonMobile ? undefined : "span 4" } }}
          gridTemplateColumns={"repeat(4, minmax(0, 1fr))"}
        >
          {data.map(
            ({
              _id,
              name,
              description,
              price,
              supply,
              rating,
              category,
              stat,
            }) => {
              return (
                <Product
                  key={_id}
                  _id={_id}
                  name={name}
                  description={description}
                  price={price}
                  supply={supply}
                  rating={rating}
                  category={category}
                  stat={stat}
                />
              );
            }
          )}
        </Box>
      ) : (
        <Box>{"LOADING...."}</Box>
      )}
    </Box>
  );
};

export default Products;
