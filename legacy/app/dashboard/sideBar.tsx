// components/SideBar.tsx

import React from 'react';
import { Drawer, List, ListItem, ListItemText, IconButton, Box, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

interface SideBarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  onClientsClick: () => void;
  onSellersClick: () => void;
  onProductsClick: () => void;
  onOrdersClick: () => void;
}

const SideBar: React.FC<SideBarProps> = ({
  isOpen,
  toggleSidebar,
  onClientsClick,
  onSellersClick,
  onProductsClick,
  onOrdersClick
}) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <IconButton onClick={toggleSidebar} sx={{ color: '#000', position: 'fixed', top: 10, left: 10, zIndex: 1300 }}>
        <MenuIcon />
      </IconButton>
      <Drawer variant="persistent" open={isOpen} onClose={toggleSidebar} sx={{ width: 240, flexShrink: 0 }}>
        <Box sx={{ width: 240, backgroundColor: '#f5f5f5', height: '100%' }}>
          <List>
            <ListItem button onClick={onClientsClick}>
              <ListItemText primary="Clients" />
            </ListItem>
            <Divider />
            <ListItem button onClick={onSellersClick}>
              <ListItemText primary="Sellers" />
            </ListItem>
            <Divider />
            <ListItem button onClick={onProductsClick}>
              <ListItemText primary="Products" />
            </ListItem>
            <Divider />
            <ListItem button onClick={onOrdersClick}>
              <ListItemText primary="Orders" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};

export default SideBar;
