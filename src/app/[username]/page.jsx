"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardMedia, Typography, Grid2, Button, Box } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import ItemList from "./ItemList/page";




export default function Dashboard() {

  const [user, setUser] = useState(null);

  const router = useRouter();




  return (
    <>
    <Box sx={{ p: 3 }}>

      <ItemList />

    </Box>
    </>
  );
}
