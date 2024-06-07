import React, { useEffect, useState } from "react";
import { Box, Grid, Card, CardContent, Typography, IconButton } from "@mui/material";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import CableIcon from '@mui/icons-material/Cable';
import HomeIcon from '@mui/icons-material/Home';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import PetsIcon from '@mui/icons-material/Pets';
import MedicationLiquidIcon from '@mui/icons-material/MedicationLiquid';
import SquareIcon from '@mui/icons-material/Square';

import Link from "next/link";


const Categories: React.FC = () => {
  const [index, setIndex] = useState<number>(0);

  const categories = [
    { id: 1, label: "Women's fashion", icon: <FemaleIcon sx={{ fontSize: 70 }} /> },
    { id: 2, label: "Men's fashion", icon: <MaleIcon sx={{ fontSize: 70 }} /> },
    { id: 3, label: "Electronics", icon: <CableIcon sx={{ fontSize: 70 }} /> },
    { id: 4, label: "Home & lifestyle", icon: <HomeIcon sx={{ fontSize: 70 }} /> },
    { id: 5, label: "Baby's toys", icon: <ChildCareIcon sx={{ fontSize: 70 }} /> },
    { id: 6, label: "Sports & Outdoors", icon: <SportsBasketballIcon sx={{ fontSize: 70 }} /> },
    { id: 7, label: "Groceries & Pets", icon: <PetsIcon sx={{ fontSize: 70 }} /> },
    { id: 8, label: "Health & Beauty", icon: <MedicationLiquidIcon sx={{ fontSize: 70 }} /> },
  ];

  const Next = () => {
    setIndex((prevIndex) => Math.min(prevIndex + 1, categories.length - 6));
  };

  const Prev = () => {
    setIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h5" component="h5" sx={{ color: "red", display: "flex", alignItems: "center" }}>
        <SquareIcon /> Categories
      </Typography>

      <Typography variant="h4" component="div" sx={{ marginTop: 2 }}>
        Browse by category
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 3 }}>
        <IconButton onClick={Prev} disabled={index === 0}>
          <ArrowCircleLeftIcon />
        </IconButton>
        <Grid container spacing={3}>
          {categories.slice(index, index + 6).map((category) => (
            <Grid item xs={12} sm={6} md={2} key={category.id}>
              <Link href={{ pathname: '/shop', query: { category: category.label } }} style={{textDecoration:"none"}} >
              <Card sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 150 }} >
                <CardContent sx={{ textAlign: 'center' }}>
                  {category.icon}
                  <Typography variant="h6" component="div">
                    {category.label}
                  </Typography>
                </CardContent>
                
              </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
        <IconButton onClick={Next} disabled={index === categories.length - 6}>
          <ArrowCircleRightIcon />
        </IconButton>
      </Box>

      <hr />

    </Box>
  );
};

export default (Categories);
