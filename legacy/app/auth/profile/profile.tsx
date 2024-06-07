"use client"

import React, { useState, useEffect } from 'react';
import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import axios from 'axios';

import { jwtDecode } from 'jwt-decode';

import Navbar from '../../Navbar';
import AddProduct from '../AddProduct';

interface User {
  id: number;
  userName: string;
  email: string;
  address: string;
}

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<Partial<User>>({});
  const router = useRouter();
  const [open, setopen] = useState<boolean>(false);

  const [role, setRole] = useState(JSON.parse(localStorage.getItem('role') || ""));

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded: any = jwtDecode(token);
      const userId: number = decoded.id as number;
      fetchUser(userId);

    }
  }, []);

  const fetchUser = async (userId: number) => {
    try {
      const response = await axios.get(`http://localhost:5000/Client/get/${userId}`);
      if (response.data) {
        setUser(response.data);
      } else {
        console.error('No user data found in response:', response);
      }
    } catch (error) {
      console.error('Error fetching user information', error);
    }
  };

  const logOut = () => {
    setUser({});
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('role');
    }
    router.push('/auth/login');
  };

  return (
    <div>
      <Navbar />
      <Box sx={{ width: '30%', margin: '0 auto', padding: 3, marginTop: '50px' }}>
  <Card sx={{ padding: 3, boxShadow: 3 }}>
    <CardContent>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" gutterBottom>
          User Profile
        </Typography>
        <Button
          variant="contained"
          sx={{ color: 'white', bgcolor: 'black' }}
          onClick={() => router.push('/auth/editProfile')}
        >
          Modify Info
        </Button>
      </Box>
      <Typography variant="h6" component="p" sx={{ fontWeight: 'bold' }}>
        Name: {user.userName}
      </Typography>
      <Typography variant="h6" component="p" sx={{ fontWeight: 'bold' }}>
        Email: {user.email}
      </Typography>
      {role === 'Client' &&
      <Typography variant="h6" component="p" sx={{ fontWeight: 'bold' }}>
        Address: {user.address}
      </Typography>}
      <Typography variant="h6" component="p" sx={{ fontWeight: 'bold' }}>
        Password: *********
      </Typography>
    </CardContent>
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', mt: 3 }}>
      {role === 'Seller' ? (
        <Button
          variant="contained"
          sx={{ color: 'white', bgcolor: 'black', mb: 1 }}
          onClick={() => setopen(true)}
        >
          Add Product
        </Button>
      ) : (
        <Button
          variant="contained"
          sx={{ color: 'white', bgcolor: 'black', mb: 1 }}
          onClick={() => router.push('/orders')}
        >
          Check Orders
        </Button>
      )}
      <Button
        variant="contained"
        sx={{ color: 'white', bgcolor: 'red' }}
        onClick={logOut}
      >
        Logout
      </Button>
    </Box>
  </Card>
  <AddProduct open={open} setopen={setopen} />
</Box>
    </div>
  );
};

export default UserProfile;
