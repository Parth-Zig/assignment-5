"use client";

import { Box } from "@mui/material";

import ItemList from "./ItemList/page";




export default function Dashboard() {

  return (
    <>
    <Box sx={{ p: 3 }}>
      <ItemList />
    </Box>
    </>
  );
}
