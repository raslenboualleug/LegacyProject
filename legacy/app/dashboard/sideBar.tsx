"use client";

import React from "react";
import { List, ListItem, Button, Box } from "@mui/material";

import { useRouter } from "next/navigation";


interface SideBarProps {
  onProductsClick: () => void;
  onClientsClick: () => void;
  onSellersClick: () => void;
  onOrdersClick: () => void;
  onLogout: () => void;
}

const SideBar: React.FC<SideBarProps> = ({ onProductsClick, onClientsClick, onSellersClick, onOrdersClick, onLogout }) => {
  const router = useRouter();

  const buttonStyle = {
    marginBottom: "20px",
    backgroundColor: "red",
    width: "100%",
    color: "black",
    fontWeight: "bold",
    textTransform: "none",
    borderRadius: "8px",
    '&:hover': {
      backgroundColor: "#f5f5f5",
    },
  };

  const logOut = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    router.push('/auth/login');
  };

  return (
    <Box sx={{ padding: "20px", backgroundColor: "#f5f5f5", height: "100vh", boxShadow: "2px 0px 5px rgba(0, 0, 0, 0.1)" }}>
      <List style={{ marginTop: "20px", color: "black" }}>
        <ListItem>
          <Button variant="contained" sx={buttonStyle} onClick={onProductsClick}>
            Products
          </Button>
        </ListItem>
        <ListItem>
          <Button variant="contained" sx={buttonStyle} onClick={onClientsClick}>
            Clients
          </Button>
        </ListItem>
        <ListItem>
          <Button variant="contained" sx={buttonStyle} onClick={onSellersClick}>
            Sellers
          </Button>
        </ListItem>
        <ListItem>
          <Button variant="contained" sx={buttonStyle} onClick={onOrdersClick}>
            Orders
          </Button>
        </ListItem>
        <ListItem>
          <Button variant="contained" color="secondary" onClick={logOut} sx={buttonStyle}>
            Logout
          </Button>
        </ListItem>
      </List>
    </Box>
  );
};

export default SideBar;
