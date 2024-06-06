"use client"

import React, { useState, useEffect } from 'react';
import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import axios from 'axios';

import { jwtDecode } from 'jwt-decode';

import Navbar from '../../Navbar';

interface User {
  id: number;
  userName: string;
  email: string;
  address: string;
}

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<Partial<User>>({});
  const router = useRouter();

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

      <Box sx={{ width: '90%', margin: '0 auto', padding: 3, marginTop: '50px' }}>
        <Card sx={{ padding: 3, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h4" gutterBottom>
              User Profile
            </Typography>
            <Typography variant="h6" component="p" sx={{ fontWeight: 'bold' }}>
              Name: {user.userName}
            </Typography>
            <Typography variant="h6" component="p" sx={{ fontWeight: 'bold' }}>
              Email: {user.email}
            </Typography>
            <Typography variant="h6" component="p" sx={{ fontWeight: 'bold' }}>
              Address: {user.address}
            </Typography>
            <Typography variant="h6" component="p" sx={{ fontWeight: 'bold' }}>
              Password: *********
            </Typography>
          </CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>

            <Button
              variant="contained"
              sx={{ color: 'white', bgcolor: 'blue' }}
              onClick={() => router.push('/editProfile')}
            >
              Modify Info
            </Button>
            {role === 'Seller' ? (
              <Button
                variant="contained"
                sx={{ color: 'white', bgcolor: 'blue' }}
                onClick={() => router.push('/addProduct')}
              >
                Add Product
              </Button>
            ) : (
              <Button
                variant="contained"
                sx={{ color: 'white', bgcolor: 'blue' }}
                onClick={() => router.push('/orders')}
              >
                Check Orders
              </Button>
            )}
            <Button
              variant="contained"
              sx={{ color: 'white', bgcolor: 'blue' }}
              onClick={logOut}
            >
              Logout
            </Button>
          </Box>
        </Card>
      </Box>
    </div>
  );
};

export default UserProfile;
