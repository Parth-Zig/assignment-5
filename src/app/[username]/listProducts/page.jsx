"use client"

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Grid, Card, CardContent, Typography, Pagination } from "@mui/material";
const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [page, setPage] = useState(1);
  const limit = 30; // Items per page
  useEffect(() => {
    fetchProducts(page);
  }, [page]);
  const fetchProducts = async (page) => {
    try {
      const skip = (page - 1) * limit;
      const response = await axios.get(`https://api.example.com/products?limit=${limit}&skip=${skip}`);
      setProducts(response.data.products);
      setTotalProducts(response.data.totalProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  return (
    <Container>
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{product.name}</Typography>
                <Typography color="textSecondary">{product.price}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={Math.ceil(totalProducts / limit)}
        page={page}
        onChange={(event, value) => setPage(value)}
        color="primary"
        sx={{ mt: 3, display: "flex", justifyContent: "center" }}
      />
    </Container>
  );
};
export default ProductsList;








