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
  Rating,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from "@mui/material";
import { ArrowBackIos, ArrowForwardIos, ShoppingCart, LocalShipping, RocketLaunch, LibraryBooks, ExpandMoreIcon } from "@mui/icons-material";
import Link from "next/link";
import style from "./products.module.css";


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
    <>
      {/* <Container className={style.mainContainer} > */}
      <Box sx={{ display: "flex", flexDirection: 'column', alignItems: "center", justifyContent: "center" , pt:4}}>

        {/* <Link href={`/products`} >
          <Button variant="contained" sx={{ mb: 2 }}>Back to Products</Button>
        </Link> */}



        <Card sx={{ display: 'flex', flexDirection: 'row', margin: "auto", maxWidth: "1200px", mb:4 }}>
          <Box className={style.imageContainer}>

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

          </Box>
          <CardContent className={style.productDetails}>
            <Typography variant="h4" fontWeight="bold">{product.title}</Typography>
            <Typography variant="body1" color="text.secondary">{product.description}</Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h5" color="primary">${discountPrice.toFixed(2)}</Typography>
            <Typography variant="body2" color="error">Original Price: ${product.price}</Typography>
            <Typography variant="body2">Discount: {product.discountPercentage}%</Typography>
            <Typography variant="body2">Brand: {product.brand}</Typography>
            <Typography variant="body2">Category: {product.category}</Typography>
            <Typography variant="body2">Stock: {product.stock}</Typography>
            <Button variant="contained" startIcon={<ShoppingCart />}>Add to Cart (Comming soon in next version)</Button>
          </CardContent>
        </Card>


        <Paper sx={{ mt: 4, px: 4, pb: 4, margin: 'auto', width:{xl: '1140px', lg: '900px',md:'700px', sm:'500px',xs:'250px' }}}>
          <Box >
            <Typography variant="h5" sx={{ mt: 4 , }}>Reviews</Typography>
            <Stack spacing={2} sx={{  }}>
              {product?.reviews?.map((review, index) => (
                <Paper key={index} elevation={2} sx={{ p: 2,  }}>
                  <Rating value={review.rating} readOnly />
                  <Typography >{review.comment}</Typography>
                  <Typography color="text.secondary">By {review.reviewerName}</Typography>
                </Paper>
              ))}
            </Stack>
          </Box>
        </Paper>

        <Accordion sx={{ mt:4 , width:{xl: '1200px', lg: '900px',md:'700px', sm:'500px',xs:'250px' }}}>
        <AccordionSummary 
        // expandIcon={<ExpandMoreIcon />} 
        >
          <Typography component="span">Additional Information</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><LibraryBooks /> Warranty: {product.warrantyInformation}</Typography>
          <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><LocalShipping /> Shipping: {product.shippingInformation}</Typography>
          <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><RocketLaunch /> Return Policy: {product.returnPolicy}</Typography>
        </AccordionDetails>
      </Accordion>


      </Box>

    </>
  );
};
export default ProductDetails;




