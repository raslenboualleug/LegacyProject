import React, { useState, useEffect } from 'react';
import { Grid, Box, Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface User {
  userName: string;
  email: string;
  address: string;
}

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<Partial<User>>({});
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/login');
          return;
        }
        const response = await axios.get('http://localhost:5000/user/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user information', error);
        // Handle error, e.g., redirect to login page
        // router.push('/login');
      }
    };

    fetchUser();
  }, []);

  const logOut = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <div>
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
