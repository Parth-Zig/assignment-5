"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { TextField, Button, Typography, Box } from "@mui/material";
import bcrypt from "bcryptjs";

export default function ChangePassword() {
  const { username } = useParams();
  const router = useRouter();
  const { register, handleSubmit, setError, clearErrors, formState: { errors } } = useForm();
  const [user, setUser] = useState(null);
  const decodedUsername = decodeURIComponent(username)

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedInUser || loggedInUser.firstName !== decodedUsername) {
      router.push("/login");
    } else {
      setUser(loggedInUser);
    }
  }, [username, router]);
  const onSubmit = async (data) => {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    const existingUser = users.find((u) => u.email === user.email);
    if (!existingUser) {
      alert;("Existing User")
      return;
    } 

    // Check if current password matches
    const isPasswordCorrect = await bcrypt.compare(data.currentPassword, existingUser.password);
    if (!isPasswordCorrect) {
      setError("currentPassword", { type: "manual", message: "Incorrect current password" });
      return;
    }

    // Check if new password and confirm password match
    if (data.newPassword !== data.confirmPassword) {
      setError("confirmPassword", { type: "manual", message: "Passwords do not match" });
      return;
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(data.newPassword, 10);

    // Update user password
    users = users.map((u) =>
      u.email === user.email ? { ...u, password: hashedPassword } : u
    );
    
    localStorage.setItem("users", JSON.stringify(users));
    alert("Password changed successfully!");
    // Redirect to user profile
    router.push(`/${username}`); 
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ maxWidth: 400, margin: "auto", mt: 5, display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="h5">Change Password</Typography>
      <TextField
        {...register("currentPassword", {
          required: "Current password is required", 
          pattern: {
            value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/,
            message: "Enter valid password",
          }
        })}
        label="Current Password"
        type="password"
        error={!!errors.currentPassword}
        helperText={errors.currentPassword?.message}
      />
      <TextField
        {...register("newPassword", {
          required: "New password is required",
          pattern: {
            value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/,
            message: "Password must be 8 to 32 characters long and include at least one uppercase letter, one lowercase latter, one number, and one special character (@,$,!,%,*,?,&)",
          }
        })}
        label="New Password"
        type="password"
        error={!!errors.newPassword}
        helperText={errors.newPassword?.message}
      />
      <TextField
        {...register("confirmPassword", { required: "Confirm password is required" })}
        label="Confirm New Password"
        type="password"
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword?.message}
      />
      <Button type="submit" variant="contained" color="primary">
        Change Password
      </Button>
      <Button variant="outlined" color="secondary" onClick={() => router.push(`/${username}`)}>
        Cancel
      </Button>
    </Box>
  );
}