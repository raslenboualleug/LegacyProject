"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';

interface Order {
  id: number;
  userId: number;
  products: string;
  quantity: number;
  totalAmount: number;
  status: string;
}

const OrdersTable: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get<Order[]>("http://localhost:5000/admin/orders");
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const updateOrderStatus = async (orderId: number, status: string) => {
    try {
      await axios.put(`http://localhost:5000/admin/orders/${orderId}`, { status });
      fetchOrders();
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h3" gutterBottom style={{ color: 'red' }}>
        Orders
      </Typography>
      <TableContainer>
        <Table>
          <TableHead style={{ backgroundColor: 'black' }}>
            <TableRow>
              <TableCell style={{ color: 'White' }}>userId</TableCell>
              <TableCell style={{ color: 'White' }}>Product</TableCell>
              <TableCell style={{ color: 'White' }}>Quantity</TableCell>
              <TableCell style={{ color: 'White' }}>Total</TableCell>
              <TableCell style={{ color: 'White' }}>Status</TableCell>
              <TableCell style={{ color: 'White' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.userId}</TableCell>
                <TableCell>{order.products}</TableCell>
                <TableCell>{order.quantity}</TableCell>
                <TableCell>{order.totalAmount}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Button 
                      variant="contained"
                      style={{ marginRight: '5px', backgroundColor: 'black', color: '#fff' }}
                      onClick={() => updateOrderStatus(order.id, 'completed')}>
                      Completed
                    </Button>
                    <Button 
                      variant="contained"
                      style={{ marginRight: '5px', backgroundColor: 'black', color: '#fff' }}
                      onClick={() => updateOrderStatus(order.id, 'cancelled')}>
                      Cancelled
                    </Button>
                    <Button 
                      variant="contained"
                      style={{ backgroundColor: 'black', color: '#fff' }}
                      onClick={() => updateOrderStatus(order.id, 'pending')}>
                      Pending
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default OrdersTable;
