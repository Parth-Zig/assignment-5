import React from "react";
import styles from "./page.module.css";
import { Button, Box, Typography, Container } from "@mui/material";
const WelcomePage = () => {
  return (
    <Container className={styles.background}>
      <Box className={styles.box}>
        <Typography variant="h4" className={styles.title}>
          Welcome to our Website
        </Typography>
        <Box className={styles.buttonContainer}>
          <Button variant="contained" color="primary" href="/login">Login</Button>
          <Button variant="outlined" color="primary" href="/signup">Signup</Button>
        </Box>
      </Box>
    </Container>
  );
};
export default WelcomePage;