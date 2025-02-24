"use client";

import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const Navbar = () => {
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
  }, []); // ✅ Dependency array ensures this runs only once

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser"); // Remove user session
    router.push("/login");
  };

  return (
    <AppBar position="static">
      <Toolbar>

        <Typography
          variant="h6"
          sx={{ flexGrow: 1, cursor: "pointer" }}
          onClick={() => router.push(`/${encodeURIComponent(user?.name)}`)}
        >
          Welcome, {user?.name || "Profile"}
        </Typography>


            <Button color="inherit" onClick={() => router.push(`/${encodeURIComponent(user.name)}/editProfile`) } >
              Edit Profile
            </Button>
            <Button color="inherit" onClick={() => router.push(`/${encodeURIComponent(user.name)}/changePassword`) } >
              Change Password
            </Button>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>

      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
