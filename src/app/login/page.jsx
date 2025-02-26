"use client";

import { useForm } from "react-hook-form";
import { TextField, Button, Typography, Box, Snackbar, Alert } from "@mui/material";
import bcrypt from "bcryptjs";
import { useRouter } from "next/navigation";
import styles from "./page.module.css"
import { useState } from "react";
import { decrypt } from "@/utils/passwordHash";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const onSubmit = async (data) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Find user by email
    const user = users.find((user) => user.email === data.email);

    if (!user) {
      alert("User not found! Please enter valid email or sign up first.");
      return;
    }

    // Compare entered password with stored hashed password
    // const isMatch = await bcrypt.compare(data.password, user.password);
    const realPass = decrypt(user.password);


    // if (!isMatch) {
    if (realPass !== data.password){
      alert("Incorrect password! Please try again.");
      return;
    }

    // Save logged-in user info (without password) and redirect
    localStorage.setItem(
      "loggedInUser",
      JSON.stringify({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        contactNo: user.contactNo,
      })
    );
    setOpen(true);
    // alert("Login successful!");
    setTimeout(() => {
        router.push(`/${user.firstName}`); // Redirect to a dashboard
    }, 1000);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        className={styles.loginbox}
      >
        <Typography variant="h5">Login</Typography>
        <TextField
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
              message: "Enter a valid email address",
            },
          })}
          label="Email"
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        <TextField
          {...register("password", {
            required: "Password is required",
            // pattern: {
            //   value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,32}$/,
            //   message: "Invalid Passwoard",
            // },
          })}
          type="password"
          label="Password"
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <Button type="submit" variant="contained">
          Login
        </Button>
      </Box>


                  <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}  anchorOrigin={{vertical: 'top', horizontal: 'right' }}>
                    <Alert
                      onClose={handleClose}
                      severity="success"
                      variant="filled"
                      sx={{ width: '100%' }}
                    >
                      User Loged In Successfully   
                    </Alert>
                  </Snackbar>

    </>
  );
}
