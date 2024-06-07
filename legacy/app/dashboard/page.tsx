"use client";

import React, { useState } from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import ClientsTable from "./clientsTable";
import ProductsTable from "./products";
import Sellers from "./sellers";  
 
import SideBar from "./sideBar";
import OrdersTable from "./ordersTable";

const Dashboard: React.FC = () => {
  const [showClients, setShowClients] = useState(false);
  const [showProducts, setShowProducts] = useState(false);
  const [showSellers, setShowSellers] = useState(false);
  const [showOrders, setShowOrders] = useState(false);

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
    <div>
    
      <Box sx={{ display: 'flex' }}>
        <SideBar
          onProductsClick={() => seperateModule("products")}
          onClientsClick={() => seperateModule("clients")}
          onSellersClick={() => seperateModule("sellers")}
          onOrdersClick={() => seperateModule("orders")} 
          onLogout={()=>{}}
        />
        <Box sx={{ flexGrow: 1, padding: "20px" }}>
          <Card sx={headerStyle}>
            <CardContent>
              <Typography variant="h4" component="h1">
                Dashboard
              </Typography>
            </CardContent>
          </Card>
          <Box sx={{ marginTop: "20px" }}>
            {showClients && <ClientsTable />}
            {showProducts && <ProductsTable />}
            {showSellers && <Sellers />}
            {showOrders && <OrdersTable />} 
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Dashboard;
