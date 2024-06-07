"use client"
import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Typography, List, ListItem } from '@mui/material';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import { useRouter } from 'next/navigation';

interface User {
    id: number;
    [key: string]: any;
}

interface Order {
    id: number;
    userId: number;
    products: string;
    status: string;
    totalAmount: number;
}

interface Product {
    id: number;
    name: string;
}

const OrdersList: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [orders, setOrders] = useState<Order[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded: User = jwtDecode(token);
            setUser(decoded);
            fetchOrders(decoded.id);
        }
    }, []);

    const fetchOrders = async (userId: number) => {
        try {
            const response = await axios.get<Order[]>("http://localhost:5000/admin/orders");
            const userOrders = response.data.filter(order => order.userId === userId);
            setOrders(userOrders);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    useEffect(() => {
        axios.get<Product[]>('http://localhost:5000/Client/products')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the products!', error);
            });
    }, []);

    const prodNames = (id: number): string | undefined => {
        const product = products.find(prod => prod.id === id);
        return product ? product.name : undefined;
    };

    return (
        <Box sx={{ width: '90%', margin: '0 auto', padding: 3, marginTop: '50px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h4">My Orders List</Typography>
            </Box>
            <List>
                {orders.map(order => (
                    <ListItem key={order.id}>
                        <Card sx={{ width: '100%', mb: 2 }}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    Order ID: {order.id}
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    Products: {JSON.parse(order.products).map((product: [number, number]) => prodNames(product[0])).join(', ')}
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    Status: {order.status}
                                </Typography>
                                <Typography variant="body1">
                                    Total: ${order.totalAmount}
                                </Typography>
                            </CardContent>
                        </Card>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default OrdersList;
