import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Container, Typography, Pagination, CircularProgress } from "@mui/material";
import ItemCard from "../ItemCard/page"; 
import {Discoutbadge} from "../ItemCard/ItemCardTheme"
// import ThemeProvider from "@mui/material";

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [page, setPage] = useState(1);
  const limit = 8; // Items per page
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItems(page);
  }, [page]);
  const fetchItems = async (page) => {
    try {
      setLoading(true);
      const skip = (page - 1) * limit;
      const response = await axios.get(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);
      setItems(response.data.products);
      setTotalItems(response.data.total);
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setLoading(false);
    }
  };


  return (

    <Container>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          {/* Page Number Display */}
          <Typography variant="h6" align="center" sx={{ my: 2 }}>
            Page {page} of {Math.ceil(totalItems / limit)}
          </Typography>
          {/* Using Box with CSS Grid for layout */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
              gap: 2,
              mt: 2,
            }}
          >
            {/* <ThemeProvider them = {Discoutbadge}> */}
            {items.map((item) => (
              <ItemCard key={item.id} id={item.id} />
            ))}
            {/* </ThemeProvider> */}
          </Box>
          {/* Pagination */}
          <Pagination
            count={Math.ceil(totalItems / limit)}
            page={page}
            onChange={(event, value) => setPage(value)}
            color="primary"
            sx={{ mt: 3, display: "flex", justifyContent: "center" }}
          />
        </>
      )}
    </Container>
  );
};
export default ItemList;







