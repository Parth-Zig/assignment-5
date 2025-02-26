"use client";

import { useForm } from "react-hook-form";
import { TextField, Button, Typography, Box, Snackbar, Alert } from "@mui/material";
import bcrypt from "bcryptjs";
import Link from "next/link";
import styles from "./page.module.css"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { encrypt } from "@/utils/passwordHash";


export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const router = useRouter();
  const [open, setOpen] = useState(false)

  const onSubmit = async (data) => {
    // Retrieve users array or initialize an empty array
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Ensure users is always an array
    if (!Array.isArray(users)) {
      users = [];
    }

    // Check if email already exists
    if (users.some((user) => user.email === data.email)) {
      // alert("Thi email already registerd! Please use a different email.");
      setError("email",{type: "manual", message: "Thi email already registerd! Please use a different email."})
      return;
    }

    // Check if password and confirm password match
    if (data.password !== data.confirmPassword) {
      console.log("pass:", data.password, "Confirm: ", data.confirmPassword );
      setError("confirmPassword", { type: "manual", message: "Passwords does not match" });
      return;
    }


    // Hash the password
    // const hashedPassword = await bcrypt.hash(data.password, 10);
    const hashedPassword = encrypt(data.password);


    // Create new user object
    const newUser = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      contactNo: data.contactNo,
      password: hashedPassword,
      // password: data.password,
    };

    // Add new user to the array and update localStorage
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    // alert("Signup successful! User data saved.");
    openSnackbar();

  };

  const openSnackbar = ( ) => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
    // Redirect to user profile
    router.push('/');
  };


  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        className={styles.signupbox}
      >
        <Typography variant="h5">Signup</Typography>
        <TextField
          {...register("firstName", {
            required: "First Name is required",
          })}
          label="firstName"
          error={!!errors.firstName}
          helperText={errors.firstName?.message}
        />
        <TextField
          {...register("lastName", {
            required: "Last Name is required",
          })}
          label="lastName"
          error={!!errors.lastName}
          helperText={errors.lastName?.message}
        />
        <TextField
          {...register("email", { 
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
              message: "Invalid Email",
            }
          })}
          label="Email"
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          {...register("contactNo", { 
            required: "Contact Number is required",
            minLength: { value: 10, message: "Min 10 characters" }
          })}
          label="contactNo"
          error={!!errors.contactNo}
          helperText={errors.contactNo?.message}
        />
        <TextField
          {...register("password", {
            required: "Password is required",
            pattern: {
              value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/,
              message: "Password must be 8 to 32 characters long and include at least one uppercase letter, one lowercase latter, one number, and one special character (@,$,!,%,*,?,&)",
            }
          })}
          type="password"
          label="Password"
          error={!!errors.password}
          helperText={errors.password?.message}
        />
      <TextField
        {...register("confirmPassword", { required: "Confirm password is required" })}
        label="Confirm New Password"
        type="password"
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword?.message}
      />
        <Button type="submit" variant="contained">
          Signup
        </Button>
      </Box>

            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{vertical: 'top', horizontal: 'right' }}>
              <Alert
                onClose={handleClose}
                severity="success"
                variant="filled"
                sx={{ width: '100%' }}
              >
                User registred successfully   
              </Alert>
            </Snackbar>
    </>
  );
}
