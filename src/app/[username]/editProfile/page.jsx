"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { TextField, Button, Typography, Box } from "@mui/material";

export default function EditProfile() {

  const { username } = useParams();
  const router = useRouter();
  const { register, handleSubmit, setValue } = useForm();
  const [user, setUser] = useState(null);
  const decodedUsername = decodeURIComponent(username)

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedInUser || loggedInUser.name !== decodedUsername) {
      router.push("/login");
    } else {
      setUser(loggedInUser);
      setValue("name", loggedInUser.name);
      setValue("email", loggedInUser.email);
    }
  }, [username, setValue, router]);

  const onSubmit = (data) => {
    let users = JSON.parse(localStorage.getItem("users")) || [];

    const isEmailTaken = users.some(u => u.email === data.email && u.email !== user.email);
    if (isEmailTaken) {
      alert("Email is already taken");
      return;
    }

    // Find and update user in stored users list
    users = users.map(u => (u.email === user.email ? { ...u, name: data.name, email: data.email } : u));
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("loggedInUser", JSON.stringify({ name: data.name, email: data.email }));
    router.push(`/${data.name}`); // Redirect to updated profile page
  };

  return (

    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ maxWidth: 400, margin: "auto", mt: 5, display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="h5">Edit Profile</Typography>
      <TextField {...register("name", { required: "Name is required" })} label="Name" />
      <TextField {...register("email", { required: "Email is required" })} label="Email" />
      <Button type="submit" variant="contained" color="primary">Save Changes</Button>
      <Button variant="outlined" color="secondary" onClick={() => router.push(`/${username}`)}>Cancel</Button>
    </Box>

  );

}