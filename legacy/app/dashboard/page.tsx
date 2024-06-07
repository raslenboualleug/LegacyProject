"use client";

import React, { useState } from "react";
import { Card, CardContent, Typography, Box, Grid, IconButton, CssBaseline, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ClientsTable from "./clientsTable";
import ProductsTable from "./products";
import Sellers from "./sellers";
import Charts from "./chart";
import SideBar from "./sideBar";
import OrdersTable from "./ordersTable";
import Extra from "./extra";

const Dashboard: React.FC = () => {
  const [showClients, setShowClients] = useState(false);
  const [showProducts, setShowProducts] = useState(false);
  const [showSellers, setShowSellers] = useState(false);
  const [showOrders, setShowOrders] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const seperateModule = (module: string) => {
    setShowClients(module === "clients");
    setShowProducts(module === "products");
    setShowSellers(module === "sellers");
    setShowOrders(module === "orders");
  };

  const cardStyle = {
    margin: "20px",
    textAlign: "center",
    color: "#333",
    border: "none",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    backgroundColor: "#fff",
  };

  const headerStyle = {
    margin: "20px",
    textAlign: "center",
    color: "#333",
    backgroundColor: "#f5f5f5",
    borderRadius: "8px",
    padding: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <SideBar
        isOpen={isSidebarOpen}
        onProductsClick={() => seperateModule("products")}
        onClientsClick={() => seperateModule("clients")}
        onSellersClick={() => seperateModule("sellers")}
        onOrdersClick={() => seperateModule("orders")}
        onLogout={() => {}}
      />
      <Box sx={{ flexGrow: 1, padding: "5px" ,marginTop:"-60px"}}>
        <Card sx={headerStyle}>
          <CardContent>
            <Typography variant="h4" component="h1">
              Dashboard
            </Typography>
            <Extra/>
        <Toolbar>
          <IconButton onClick={toggleSidebar} sx={{ color: '#000' }}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
          </CardContent>
        </Card>
        <Grid container spacing={3} sx={{ marginTop: "20px" }}>
          <Grid item xs={12} md={6}>
            {showClients && <ClientsTable />}
            {showProducts && <ProductsTable />}
            {showSellers && <Sellers />}
            {showOrders && <OrdersTable />}
          </Grid>
          <Grid item xs={12} md={6}>
            <Charts />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
