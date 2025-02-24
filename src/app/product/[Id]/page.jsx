"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { 
  Card, 
  CardMedia, 
  CardContent, 
  Typography, 
  Box, 
  IconButton, 
  Button, 
  Stack, 
  Container
} from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import Link from "next/link";

const ProductDetails = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    setLoggedInUser(user);
  }, []);

  useEffect(() => {
    if (id) fetchProduct(id);
  }, [id]);

  const fetchProduct = async (productId) => {
    try {
      const response = await axios.get(`https://dummyjson.com/products/${productId}`);
      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (product?.images?.length) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % product.images.length);
    }
  };

  const handlePrev = () => {
    if (product?.images?.length) {
      setCurrentIndex(
        (prevIndex) => (prevIndex - 1 + product.images.length) % product.images.length
      );
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found</p>;

  const discountPrice = product.price - (product.price * product.discountPercentage) / 100;

  return (
    <Container>
      <Box>
        {loggedInUser && (
          <Link href={`/${encodeURIComponent(loggedInUser.name)}`} passHref>
            <Button variant="contained">Back to Products</Button>
          </Link>
        )}

        <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
          <Box>
            <Card>
              <CardMedia
                component="img"
                image={product.images[currentIndex]}
                alt={product.title}
                height={400}
                width={400}
              />
              <Box>
                <IconButton onClick={handlePrev}>
                  <ArrowBackIos />
                </IconButton>
                <IconButton onClick={handleNext}>
                  <ArrowForwardIos />
                </IconButton>
              </Box>
            </Card>
          </Box>

          <Box>
            <Stack>
              <Typography variant="h4">{product.title}</Typography>
              <Typography variant="body1">{product.description}</Typography>
              <Typography variant="h6">Price: ${product.price}</Typography>
              <Typography variant="body2">Discount: {product?.discountPercentage}%</Typography>
              <Typography variant="body2">Discounted Price: ${discountPrice.toFixed(2)}</Typography>
              <Typography variant="body2">Brand: {product.brand}</Typography>
              <Typography variant="body2">Category: {product.category}</Typography>
            </Stack>
            <Typography variant="body2">Stocks: {product.stock}</Typography>
            <Typography variant="body2">Minimum Order Quantity: {product.minimumOrderQuantity}</Typography>
          </Box>
        </Stack>
      </Box>

      {/* Reviews Section */}
      <Box>
        <Typography variant="h4">Reviews</Typography>
        <Stack direction="column" spacing={2}>
          {product?.reviews?.map((review, index) => (
            <Box key={index}>
              <Typography variant="body1">{review.rating}/5</Typography>
              <Typography variant="body1">{review.review}</Typography>
              <Typography variant="body1">By {review.name}</Typography>
            </Box>
          ))}
        </Stack>
      </Box>

      {/* Additional Info */}
      <Box>
        <Typography variant="body1">Warranty: {product.warrantyInformation}</Typography>
        <Typography variant="body1">Shipping: {product.shippingInformation}</Typography>
        <Typography variant="body1">Return Policy: {product.returnPolicy}</Typography>
      </Box>

      {/* Dimensions */}
      <Box>
        <Typography variant="body1">Width: {product?.dimensions?.width} cm</Typography>
        <Typography variant="body1">Height: {product?.dimensions?.height} cm</Typography>
      </Box>
    </Container>
  );
};

export default ProductDetails;
