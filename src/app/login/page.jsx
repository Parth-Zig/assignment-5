"use client";
import { useForm } from "react-hook-form";
import { TextField, Button, Typography, Box } from "@mui/material";
import bcrypt from "bcryptjs";
import { useRouter } from "next/navigation";
import Link from "next/link";



export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();
  const onSubmit = async (data) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    // Find user by email
    const user = users.find(user => user.email === data.email);
    if (!user) {
      alert("User not found! Please sign up first.");
      // router.push("/signup");
      return;
    }
    // Compare entered password with stored hashed password
    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) {
      alert("Incorrect password! Please try again.");
      return;
    }
    // Save logged-in user info (without password) and redirect
    localStorage.setItem("loggedInUser", JSON.stringify({ name: user.name, email: user.email }));
    alert("Login successful!");
    router.push(`/${user.name}`); // Redirect to a dashboard or another page
  };
  return (
    <>
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ maxWidth: 400, margin: "auto", mt: 5, display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="h5">Login</Typography>
      <TextField {...register("email", { required: "Email is required" })} label="Email" error={!!errors.email} helperText={errors.email?.message} />
      <TextField {...register("password", { required: "Password is required" })} type="password" label="Password" error={!!errors.password} helperText={errors.password?.message} />
      <Button type="submit" variant="contained">Login</Button>
    </Box>

    <div>
      <p>Dont have account?</p>
      <Link href="/signup"> Signup</Link>
    </div>
    </>
  );
}