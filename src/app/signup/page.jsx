"use client";

import { useForm } from "react-hook-form";
import { TextField, Button, Typography, Box } from "@mui/material";
import bcrypt from "bcryptjs";
import Link from "next/link";



export default function Signup() {

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {

    // Retrieve users array or initialize an empty array
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Ensure users is always an array
    if (!Array.isArray(users)) {
      users = [];
    }
    
    // Check if email already exists
    if (users.some(user => user.email === data.email)) {
      alert("Email already exists! Please use a different one.");
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Create new user object
    const newUser = { name: data.name, email: data.email, password: hashedPassword };

    // Add new user to the array and update localStorage
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    alert("Signup successful! User data saved.");


  };
  return (
    <>
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ maxWidth: 400, margin: "auto", mt: 5, display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="h5">Signup</Typography>
      <TextField {...register("name", { required: "Name is required" })} label="Name" error={!!errors.name} helperText={errors.name?.message} />
      <TextField {...register("email", { required: "Email is required" })} label="Email" error={!!errors.email} helperText={errors.email?.message} />
      <TextField {...register("password", { required: "Password is required", 
        // minLength: { value: 6, message: "Min 6 characters" } 
        })} type="password" label="Password" error={!!errors.password} helperText={errors.password?.message} />
      <Button type="submit" variant="contained">Signup</Button>
    </Box>

    <div>
    <p>Alredy have account ?</p>
    <Link href="/login">login</Link>
    </div>
    </>
  );
}