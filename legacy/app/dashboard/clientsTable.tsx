"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Table, TableHead, TableBody, TableRow, TableCell, Paper, IconButton, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface Client {
  id: number;
  userName: string;
  email: string;
  password: string;
}

const styles = {
  header: {
    textAlign: 'center',
   
    color: 'black',
    padding: '10px',
    borderRadius: '8px',
    marginBottom: '20px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  },
  paper: {
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f5f5f5',
  },
  tableHeadRow: {
    backgroundColor: 'bluergb(139, 223, 235)',
  },
  tableHeadCell: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  tableBodyRow: {
    '&:hover': {
      backgroundColor: '#f1f1f1',
    },
  },
  deleteButton: {
    color: '#d32f2f',
  },
  switchButton: {
    color: '#ffffff',
    backgroundColor: '#0a0a0a',
    '&:hover': {
      backgroundColor: '#333333',
    },
    marginLeft: '10px',
  },
};

const ClientsTable: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);

  const fetchUsersByRole = async (role: string) => {
    try {
      const response = await axios.get<Client[]>(`http://localhost:5000/admin/users/${role}`);
      setClients(response.data);
    } catch (error) {
      console.log('Error fetching users: ', error);
    }
  };

  const handleDeleteUser = async (userId: number) => {
    try {
      const response = await axios.delete(`http://localhost:5000/admin/users/${userId}`);
      console.log(`Server response: ${response.status}`);
      if (response.status === 200) {
        setClients((prevClients) => prevClients.filter((client) => client.id !== userId));
      } else {
        console.error('Failed to delete user, status code:', response.status);
      }
    } catch (error) {
      console.error('Error deleting user: ', error);
    }
  };

  const handleSwitchToSeller = async (userId: number) => {
    try {
      await axios.put(`http://localhost:5000/admin/users/switch/${userId}`, { role: 'seller' });
      fetchUsersByRole('client');
    } catch (error) {
      console.error('Error switching user to seller: ', error);
    }
  };

  useEffect(() => {
    fetchUsersByRole('client');
  }, []);

  return (
    <div style={{ padding: '20px' }}>
    <Typography variant="h4" component="h1">
              Clients
            </Typography>
      <Paper sx={styles.paper}>
        <Table>
          <TableHead>
            <TableRow sx={styles.tableHeadRow}>
              <TableCell sx={styles.tableHeadCell}>ID</TableCell>
              <TableCell sx={styles.tableHeadCell}>Username</TableCell>
              <TableCell sx={styles.tableHeadCell}>Email</TableCell>
              <TableCell sx={styles.tableHeadCell}>Password</TableCell>
              <TableCell sx={styles.tableHeadCell}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clients.map((client) => (
              <TableRow key={client.id} sx={styles.tableBodyRow}>
                <TableCell>{client.id}</TableCell>
                <TableCell>{client.userName}</TableCell>
                <TableCell>{client.email}</TableCell>
                <TableCell>{client.password}</TableCell>
                <TableCell>
                  <IconButton
                    aria-label="delete"
                    sx={styles.deleteButton}
                    onClick={() => handleDeleteUser(client.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <Button
                    variant="contained"
                    sx={styles.switchButton}
                    onClick={() => handleSwitchToSeller(client.id)}
                  >
                    Switch to Seller
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
};

export default ClientsTable;
