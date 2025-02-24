"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  CardActionArea,
  CardMedia,
  CardActions,
  Button,
  Badge,
  Rating,
  Chip,
  Stack,
} from "@mui/material";

import { useRouter } from "next/navigation";
import style from "./itemCard.module.css";

const ProductCard = ({ id }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchProduct(id);
  }, [id]);

  const fetchProduct = async (productId) => {
    try {
      const response = await axios.get(
        `https://dummyjson.com/products/${productId}`
      );
      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <CircularProgress />;

  console.log(product);

  return (
    <>
      <Card>
        <CardActionArea
          href={`/product/${product.title
            .toLowerCase()
            .replace(/\s+/g, "-")}?id=${product.id}`}
        >
          <CardMedia
            component="img"
            image={product.thumbnail}
            alt="Error in loading image"
            className={style.productImage}
          />
          <CardContent
            sx={{
              justifyContent: "space-between",
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography gutterBottom variant="h5" component="div">
              {" "}
              {product.title || "Title error"}{" "}
            </Typography>

            <Stack sx={{ justifyContent: "center", alignItems: "center" }}>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {product.brand || "Item Brand error"}
              </Typography>
              <Typography variant="h5">
                ${product.price || "Price of the product"}
              </Typography>
              <Typography>
                {product.discountPercentage || "discount"}% discount
              </Typography>
              <Rating
                name="half-rating-read"
                defaultValue={product.rating}
                precision={0.01}
                readOnly
              />
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Rating:{product.rating}/5
              </Typography>
              <Chip
                label={product.category}
                size="medium"
                sx={{ color: "text.secondary", textTransform: "capitalize" }}
              />
            </Stack>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
};
export default ProductCard;
