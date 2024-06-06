"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Typography, Card, CardContent, List, ListItem, ListItemText } from '@mui/material';
import Dashboard from './dashboard';

interface Order {
  id: number;
  userId: number;
  totalAmount: number;
  status: string;
  createdAt: string;
  products: string;
}

const OneOrder: React.FC = () => {
  const router = useRouter();
  const { orderId } = router.query;
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (!orderId) return;
    const fetchOrder = async () => {
      try {
        const response = await axios.get<Order>(`http://localhost:5000/Admin/orders/${orderId}`);
        setOrder(response.data);
      } catch (error) {
        console.error('Error fetching the order details:', error);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (!order) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Dashboard />
      <Card style={{ maxWidth: 800, margin: '20px auto', padding: '20px', textAlign: 'center' }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Order ID: {order.id}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Customer ID: {order.userId}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Total Amount: ${order.totalAmount}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Status: {order.status}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Date: {new Date(order.createdAt).toLocaleDateString()}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Products:
          </Typography>
          <List>
            {JSON.parse(order.products).map(([productId, quantity]: [string, number]) => (
              <ListItem key={productId}>
                <ListItemText primary={`Product ID: ${productId}, Quantity: ${quantity}`} />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </div>
  );
};

export default OneOrder;
