"use client";
import { List, ListItem, ListItemText, Typography, Box } from "@mui/material";
const UserList = ({ users }) => {
  return (
    <Box>
      <Typography variant="h6">Stored Users:</Typography>
      <List>
        {users.length > 0 ? users.map((user, index) => (
          <ListItem key={index}>
            <ListItemText primary={user.name} secondary={user.email} />
          </ListItem>
        )) : <Typography>No users stored yet.</Typography>}
      </List>
    </Box>
  );
};
export default UserList;