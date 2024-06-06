import React, { useState, useEffect } from "react";
import { Box, Grid, Typography, Button } from "@mui/material";
import SquareIcon from '@mui/icons-material/Square';
import axios from "axios";
import Link from "next/link"

interface Product{
    id:number,
    name:string,
    price:number,
    category:string,
    stock:number,
    picture:string,
    userId:number
 }

const Todays = () => {

  
  // Function to get midnight of the next day
  const getNextMidnight = () => {
    const now = new Date();
    const nextMidnight = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1,
      0, 0, 0
    );
    return nextMidnight;
  };

  const calculateTimeLeft = () => {
    const difference = +getNextMidnight() - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<Product[]>('http://localhost:5000/Client/products/FS');
        const productsWithDiscounts = response.data.map(product => {
          const discount = Math.floor(Math.random() * 21) + 10; // Random discount between 10% and 30%
          const discountedPrice = product.price - (product.price * (discount / 100));
          return {
            ...product,
            discount,
            discountedPrice: discountedPrice.toFixed(2) // Round to 2 decimal places
          };
        });
        setProducts(productsWithDiscounts.sort(() => 0.5 - Math.random()).slice(0, 8)); // Select random products
      } catch (error) {
        console.error('There was an error fetching the products!', error);
      }
    };

    fetchProducts();
  }, []); // Fetch products on component mount

  useEffect(() => {
    const intervalId = setInterval(() => {
      const nextMidnight = getNextMidnight();
      if (+new Date() >= +nextMidnight) {
        // Fetch new products when the time is midnight
        axios.get<Product[]>('http://localhost:5000/Client/products/FS')
          .then(response => {
            const productsWithDiscounts = response.data.map(product => {
              const discount = Math.floor(Math.random() * 21) + 10; // Random discount between 10% and 30%
              const discountedPrice = product.price - (product.price * (discount / 100));
              return {
                ...product,
                discount,
                discountedPrice: discountedPrice.toFixed(2) // Round to 2 decimal places
              };
            });
            setProducts(productsWithDiscounts.sort(() => 0.5 - Math.random()).slice(0, 8)); // Select random products
          })
          .catch(error => {
            console.error('There was an error fetching the products!', error);
          });
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

//   const renderTimer = () => {
//     return (
//       <span>
//         {timeLeft.days}d :{timeLeft.hours}h :{timeLeft.minutes}m :{timeLeft.seconds}s
//       </span>
//     );
//   };

  return (
    <Box sx={{ padding: 3, marginTop: "50px" }}>
      <Typography variant="h5" component="h5" sx={{ color: "red", marginRight: 2, display: "flex", alignItems: "center" }}>
        <SquareIcon /> Today's
      </Typography>

      <Typography variant="h4" component="div">
        {/* Flash Sales {renderTimer()} */}
      </Typography>

      <Grid container spacing={3} sx={{ marginBottom: 3 }}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={3} key={product.id}>
            {/* <ProductCard
              product={product}
              onClick={() => navigate('/oneProduct', { state: { productId: product.id } })}
            /> */}
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
      <Link href={{ pathname: '/shop', query: { productId: products .map(product=>product.id)} }} >
        <Button variant="contained" style={{ color: "white", backgroundColor: "red" }} >
          View all products
        </Button>
        </Link>
      </Box>
      <hr />
    </Box>
  );
};

export default Todays;
