"use client";

import { PersonAdd, Settings, Logout, LockOpen } from "@mui/icons-material";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  ButtonGroup,
  Tooltip,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const Navbar1 = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const [open, setOpen] = useState(false)

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

  const openSettings = () => {
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
  }

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
              Welcome, {user?.firstName + " " + user?.lastName || "Profile"}
            </Typography>


              <Button color="inherit" onClick={() => router.push(`/products`)}>
                View Products
              </Button>




            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Tooltip title="Account settings">
                <IconButton
                  onClick={openSettings}
                  size="small"
                  sx={{ ml: 2 }}
                >
                  <Avatar  sx={{ width: 32, height: 32 }}>
                    <Settings color="primary" fontSize="small" />
                  </Avatar>
                </IconButton>
              </Tooltip>

              <Menu
                // anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "top" }}
              >
                <MenuItem onClick={() =>
                  router.push(
                    `/${encodeURIComponent(user.firstName)}/editProfile`
                  )
                }>
                  <ListItemIcon>
                    <PersonAdd fontSize="small" />
                  </ListItemIcon>
                  Edit Profile
                </MenuItem>
                <MenuItem onClick={() =>
                  router.push(
                    `/${encodeURIComponent(user.firstName)}/changePassword`
                  )
                }>
                  <ListItemIcon>
                    <LockOpen fontSize="small" />
                  </ListItemIcon>
                  Change Password
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default Navbar1;
