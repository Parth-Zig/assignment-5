"use client";

import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const Navbar1 = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Get logged-in user
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (!loggedInUser) {
      router.push("/login"); // Redirect to login if not authenticated
    } else {
      setUser(loggedInUser);
    }
  }, []); 

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser"); // Remove user session
    router.push("/login");
  };

  return (
    <>
      <Box>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h6"
              sx={{ flexGrow: 1, cursor: "pointer" }}
              onClick={() =>
                router.push(`/${encodeURIComponent(user?.firstName)}`)
              }
            >
              Welcome, {user?.firstName +' '+ user?.lastName || "Profile"}
            </Typography>

            <Button
              color="inherit"
              onClick={() =>
                router.push(
                  `/${encodeURIComponent(user.firstName)}/editProfile`
                )
              }
            >
              Edit Profile
            </Button>
            <Button
              color="inherit"
              onClick={() =>
                router.push(
                  `/${encodeURIComponent(user.firstName)}/changePassword`
                )
              }
            >
              Change Password
            </Button>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default Navbar1;
