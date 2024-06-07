"use client";

import React from "react";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Box, Toolbar, Typography } from "@mui/material";
import InboxIcon from "@mui/icons-material/Inbox";
import PeopleIcon from "@mui/icons-material/People";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StoreIcon from "@mui/icons-material/Store";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

interface SideBarProps {
  isOpen: boolean;
  onProductsClick: () => void;
  onClientsClick: () => void;
  onSellersClick: () => void;
  onOrdersClick: () => void;
  onLogout: () => void;
}

const SideBar: React.FC<SideBarProps> = ({ isOpen, onProductsClick, onClientsClick, onSellersClick, onOrdersClick, onLogout }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        variant="persistent"
        open={isOpen}
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
            backgroundColor: "#263238",
            color: "#fff",
          },
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap sx={{ color: '#fff' }}>
            Menu
          </Typography>
        </Toolbar>
        <List>
          <ListItem button onClick={onClientsClick}>
            <ListItemIcon sx={{ color: '#fff' }}><PeopleIcon /></ListItemIcon>
            <ListItemText primary="Clients" />
          </ListItem>
          <ListItem button onClick={onProductsClick}>
            <ListItemIcon sx={{ color: '#fff' }}><ShoppingCartIcon /></ListItemIcon>
            <ListItemText primary="Products" />
          </ListItem>
          <ListItem button onClick={onSellersClick}>
            <ListItemIcon sx={{ color: '#fff' }}><StoreIcon /></ListItemIcon>
            <ListItemText primary="Sellers" />
          </ListItem>
          <ListItem button onClick={onOrdersClick}>
            <ListItemIcon sx={{ color: '#fff' }}><InboxIcon /></ListItemIcon>
            <ListItemText primary="Orders" />
          </ListItem>
        </List>
        <List>
          <ListItem button onClick={onLogout}>
            <ListItemIcon sx={{ color: '#fff' }}><ExitToAppIcon /></ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
};

export default SideBar;
