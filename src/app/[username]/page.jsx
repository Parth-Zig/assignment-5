"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardMedia, Typography, Grid2, Button, Box } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import ItemList from "./ItemList/page";




export default function Dashboard() {

  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const router = useRouter();

  useEffect(() => {

    // Get logged-in user
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedInUser) {
      router.push("/login"); // Redirect to login if not authenticated
    } else {
      setUser(loggedInUser);
    }
    // Fetch products from API
    axios.get("https://fakestoreapi.com/products") // Replace with your API
      .then(response => setProducts(response.data))
      .catch(error => console.error("Error fetching products:", error));
  }, []);


  const handleLogout = () => {
    localStorage.removeItem("loggedInUser"); // Remove user session
    router.push("/login");
  };


  return (
    <>
    <Box sx={{ p: 3 }}>
      <Typography variant="h4">Welcome, {user?.name}!</Typography>
      <Button variant="contained" color="error" onClick={handleLogout} sx={{ mt: 2 }}>Logout</Button>
      <div>
        <Button onClick={()=>{ router.push(`${user.name}/editProfile`)}}>Edit Profile</Button>
      </div>
      <div>
        <Button onClick={()=>{ router.push(`${user.name}/changePassword`)}}>Change Password</Button>
      </div>

      {/* Product List */}
      {/* <Grid2 container spacing={3} sx={{ mt: 3 }}>
        {products.map(product => (
            <Grid2 item xs={12} sm={6} md={4} key={product.id}>
            <Card>
              <CardMedia component="img" height="200" image={product.image} alt={product.title} />
              <CardContent>
                <Typography variant="h6">{product.title}</Typography>
                <Typography variant="body2" color="textSecondary">${product.price}</Typography>
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2> */}

    <div>
      {/* <ItemCard id="2"/> */}

    </div>
      <ItemList />

    </Box>
    </>
  );
}
