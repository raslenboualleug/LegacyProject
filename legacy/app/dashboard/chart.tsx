import { useState, useEffect } from 'react';
import axios from 'axios';
import React from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Card, CardContent, Typography, Box } from '@mui/material';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  stock: number;
  picture: string;
  userId: number;
}

interface User {
  id: number;
  userName: string;
  email: string;
  password: string;
  role: string; 
}

const Charts: React.FC = () => {
  const [productsData, setProductsData] = useState<Product[]>([]);
  const [usersData, setUsersData] = useState<User[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const productsResponse = await axios.get<Product[]>('http://localhost:5000/Admin/products');
      const usersResponse = await axios.get<User[]>('http://localhost:5000/Admin/users');
      setProductsData(productsResponse.data);
      setUsersData(usersResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const productsChartData = {
    labels: productsData.map(product => product.name),
    datasets: [
      {
        label: 'Stock',
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: productsData.map(product => product.stock),
      },
    ],
  };

  // Count the number of sellers and buyers
  const userRoleCounts = usersData.reduce((acc, user) => {
    if (user.role === 'seller') {
      acc.sellers += 1;
    } else if (user.role === 'buyer') {
      acc.buyers += 1;
    }
    return acc;
  }, { sellers: 0, buyers: 0 });

  const usersChartData = {
    labels: ['Sellers', 'Buyers'],
    datasets: [
      {
        label: 'Users',
        backgroundColor: ['rgba(255,99,132,0.2)', 'rgba(54,162,235,0.2)'],
        borderColor: ['rgba(255,99,132,1)', 'rgba(54,162,235,1)'],
        borderWidth: 2,
        data: [userRoleCounts.sellers, userRoleCounts.buyers],
      },
    ],
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Card>
        <CardContent>
          <Typography variant="h6" component="div" gutterBottom>
            Users (Sellers vs Buyers)
          </Typography>
          <Doughnut data={usersChartData} />
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <Typography variant="h6" component="div" gutterBottom>
            Products by Stock
          </Typography>
          <Bar data={productsChartData} />
        </CardContent>
      </Card>
    </Box>
  );
};

export default Charts;
