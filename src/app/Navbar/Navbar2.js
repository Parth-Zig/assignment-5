import React from "react";
import { Box, AppBar, Toolbar, Typography, Button } from "@mui/material";

export default function Navbar2() {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h6"
              component="a"
              href="/"
              sx={{ flexGrow: 1, textDecoration: "none", color: "white" }}
            >
              Online Shop
            </Typography>

            <Button color="inherit" href="/login">
              Login
            </Button>
            <Button color="inherit" href="/signup">
              Sign Up
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}
