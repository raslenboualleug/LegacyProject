import React from 'react';
import { Box, Container, Grid, Card, CardContent, Typography} from '@mui/material';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


const Extra = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Income</Typography>
                <Typography variant="h4">$13,908</Typography>
                <Typography color="textSecondary">April 2022</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Expenses</Typography>
                <Typography variant="h4">$7,949</Typography>
                <Typography color="textSecondary">April 2022</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Balance</Typography>
                <Typography variant="h4">$5,129</Typography>
                <Typography color="textSecondary">April 2022</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Extra;
