"use client"

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, Typography, CircularProgress, CardActionArea, CardMedia, CardActions, Button, Badge } from "@mui/material";
import { DiscountBadge } from "./ItemCardTheme"
import { useRouter } from "next/navigation";
import Link from "next/link";



const ProductCard = ({ id }) => {

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchProduct(id);
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

  if (loading) return <CircularProgress />;

  console.log(product);

  
  
  

  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={product.thumbnail}
            alt="Error in loading image"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {product.title || "Title error"}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {product.brand || "Item Brand error"}
            </Typography>
            <Typography variant="h5" >
              {/* <DiscountBadge badgeContent={product.discountPercentage} color="primary"> */}
              ${product.price || "Price of the product"}
              {/* </DiscountBadge> */}

            </Typography>
          </CardContent>
        </CardActionArea>
 


        <CardActions>
          {/* Using Link for faster navigation */}
          <Link href={`/product/${product.title.toLowerCase().replace(/\s+/g, "-")}?id=${product.id}`} passHref>
            <Button size="small" color="primary">
              View More
            </Button>
          </Link>
        </CardActions>



      </Card>

    </>
  );
};
export default ProductCard;






