"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { TextField, Button, Typography, Box } from "@mui/material";
import styles from  "./page.module.css"

export default function EditProfile() {
  const { username } = useParams();
  const router = useRouter();
  const { register, handleSubmit, setValue } = useForm();
  const [user, setUser] = useState(null);
  const decodedUsername = decodeURIComponent(username);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedInUser || loggedInUser.firstName !== decodedUsername) {
      router.push("/login");
    } else {
      setUser(loggedInUser);
      setValue("firstName", loggedInUser.firstName);
      setValue("lastName", loggedInUser.lastName);
      setValue("email", loggedInUser.email);
      setValue("contactNo", loggedInUser.contactNo);
    }
  }, [username, setValue, router]);

  const onSubmit = (data) => {
    let users = JSON.parse(localStorage.getItem("users")) || [];

    const isEmailTaken = users.some(
      (u) => u.email === data.email && u.email !== user.email
    );
    if (isEmailTaken) {
      alert("Email is already taken");
      return;
    }

    // Find and update user in stored users list
    users = users.map((u) =>
      u.email === user.email
        ? {
            ...u,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            contactNo: data.contactNo,
          }
        : u
    );
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem(
      "loggedInUser",
      JSON.stringify({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        contactNo: data.contactNo,
      })
    );
    router.push(`/${data.firstName}`); // Redirect to updated profile page
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      className={styles.editProfileBox}
    >
      <Typography variant="h5">Edit Profile</Typography>
      <TextField
        {...register("firstName", { required: "First Name is required" })}
        label="First Name"
      />
      <TextField
        {...register("lastName", { required: "Last Name is required" })}
        label="Last Name"
      />
      <TextField
        {...register("email", { required: "Email is required" })}
        label="Email"
      />
      <TextField
        {...register("contactNo", { required: "Contact is required" })}
        label="Contact No."
      />
      <Button type="submit" variant="contained" color="primary">
        Save Changes
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => router.push(`/${username}`)}
      >
        Cancel
      </Button>
    </Box>
  );
}
