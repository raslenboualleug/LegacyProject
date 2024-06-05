import React, { useState, useEffect } from 'react';
import { Grid, Box, Button, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
// import Navbar from './Navbar';

interface User {
  userName: string;
  email: string;
  address: string;
  role: string;
}

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<Partial<User>>({});
  const [role, setRole] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    if (storedRole) {
      setRole(JSON.parse(storedRole));
    }
    const token = localStorage.getItem('token');
    if (token) {
      const decoded: any = jwtDecode(token);
      fetchUser(decoded.id);
    }
  }, []);

  const fetchUser = async (userId: string) => {
    try {
      const response = await axios.get(`http://localhost:5000/Client/get/${userId}`);
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user information', error);
    }
  };

  const logOut = () => {
    setUser({});
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    router.push('/login');
  };

  return (
    <div>
      <Navbar />
      <div style={{ width: '90%', margin: '0 auto', padding: 3, marginTop: '50px' }}>
        <Box sx={{ width: '90%', margin: '0 auto', padding: 3, marginTop: '50px' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <h2>User Profile</h2>
          </Box>
          <Box sx={{ mb: 2 }}>
            <Box>
              <p><strong>Name:</strong> {user.userName}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Address:</strong> {user.address}</p>
              <p><strong>Password:</strong> *********</p>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              variant="contained"
              style={{ color: 'white', backgroundColor: 'blue' }}
              onClick={() => router.push('/editProfile')}
            >
              Modify Info
            </Button>

            {role === 'Seller' ? (
              <Button
                variant="contained"
                style={{ color: 'white', backgroundColor: 'orange' }}
                onClick={() => router.push('/addProduct')}
              >
                Add Product
              </Button>
            ) : (
              <Button
                variant="contained"
                style={{ color: 'white', backgroundColor: 'green' }}
                onClick={() => router.push('/orders')}
              >
                Check Orders
              </Button>
            )}
            <Button
              variant="contained"
              style={{ color: 'white', backgroundColor: 'red' }}
              onClick={logOut}
            >
              Logout
            </Button>
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default UserProfile;
