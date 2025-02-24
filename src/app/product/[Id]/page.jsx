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
  Container,
  Divider,
  Paper,
  Rating
} from "@mui/material";
import { ArrowBackIos, ArrowForwardIos, ShoppingCart,LocalShipping, RocketLaunch,LibraryBooks } from "@mui/icons-material";
import Link from "next/link";
import style from "./product.module.css";


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
    <Container className={style.mainContainer} maxWidth="lg">
      {loggedInUser && (
        <Link href={`/${encodeURIComponent(loggedInUser.firstName)}`} passHref>
          <Button variant="contained" sx={{ mb: 2 }}>Back to Products</Button>
        </Link>
      )}
      <Paper elevation={3} className={style.productContainer}>
        <Stack direction={{ xs: "column", md: "row" }} spacing={4}>
          <Box className={style.imageContainer}>
            <Card>
              <CardMedia
                component="img"
                image={product.images[currentIndex]}
                alt={product.title}
                className={style.productImage}
              />
              <Box className={style.imageControls}>
                <IconButton onClick={handlePrev}><ArrowBackIos /></IconButton>
                <IconButton onClick={handleNext}><ArrowForwardIos /></IconButton>
              </Box>
            </Card>
          </Box>
          <Box className={style.productDetails}>
            <Typography variant="h4" fontWeight="bold">{product.title}</Typography>
            <Typography variant="body1" color="text.secondary">{product.description}</Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h5" color="primary">${discountPrice.toFixed(2)}</Typography>
            <Typography variant="body2" color="error">Original Price: ${product.price}</Typography>
            <Typography variant="body2">Discount: {product.discountPercentage}%</Typography>
            <Typography variant="body2">Brand: {product.brand}</Typography>
            <Typography variant="body2">Category: {product.category}</Typography>
            <Typography variant="body2">Stock: {product.stock}</Typography>
            <Button variant="contained" startIcon={<ShoppingCart />}>Add to Cart</Button>
          </Box>
        </Stack>
      </Paper>
      <Box className={style.reviewsSection}>
        <Typography variant="h5" sx={{ mt: 4 }}>Reviews</Typography>
        <Stack spacing={2}>
          {product?.reviews?.map((review, index) => (
            <Paper key={index} elevation={2} sx={{ p: 2 }}>
              <Rating value={review.rating} readOnly />
              <Typography variant="body1">{review.comment}</Typography>
              <Typography variant="body2" color="text.secondary">By {review.reviewerName}</Typography>
            </Paper>
          ))}
        </Stack>
      </Box>
      <Box className={style.additionalInfo}>
        <Typography variant="h6" sx={{ mt: 4}}>Additional Information</Typography>
        <Typography variant="body2" sx={{ display:'flex', alignItems:'center', gap:1 }}><LibraryBooks /> Warranty: {product.warrantyInformation}</Typography>
        <Typography variant="body2" sx={{ display:'flex', alignItems:'center', gap:1 }}><LocalShipping /> Shipping: {product.shippingInformation}</Typography>
        <Typography variant="body2" sx={{ display:'flex', alignItems:'center', gap:1 }}><RocketLaunch /> Return Policy: {product.returnPolicy}</Typography>
      </Box>
    </Container>
  );
};
export default ProductDetails;




