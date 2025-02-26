import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Container,
  Typography,
  Pagination,
  CircularProgress,
} from "@mui/material";
import ItemCard from "../ItemCard/page";
import styles from "./ItemList.module.css";

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
      const response = await axios.get(
        `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
      );
      setItems(response.data.products);
      setTotalItems(response.data.total);
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth={"lg"}>
      {/* Pagination */}
      <Pagination
        count={Math.ceil(totalItems / limit)}
        page={page}
        onChange={(event, value) => setPage(value)}
        color="primary"
        className={styles.paginationList}
      />
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <Box className={styles.gridBox}>
            {items.map((item) => (
              <ItemCard key={item.id} id={item.id} />
            ))}
          </Box>
        </>
      )}
    </Container>
  );
};
export default ItemList;
