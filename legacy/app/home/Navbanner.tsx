"use client"
import React, { useState } from 'react';
import { Box, List, ListItem, Button, IconButton } from '@mui/material';
import Link from 'next/link';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CarouselComponent from './carosel';
const images = [
  'https://slidechef.net/wp-content/uploads/2023/09/Iphone-15-Presentation-Template.jpg',
  'https://static.wixstatic.com/media/1c92ab_a0c05a895d1045e89bc3b81e71d31a7d~mv2.jpg',
  'https://mspoweruser.com/wp-content/uploads/2020/06/9CA72E16-7D11-4966-AD64-1946F889BA6F.jpeg',
  'https://asset1.ruecdn.com/images/content/events/780019/780019_banner_tablet_hires.jpg',
];

const Navbanner: React.FC = () => {
  const [imgIndex, setimgIndex] = useState(0);

  const nextSlide = (a:number) => {
    setimgIndex(imgIndex+a);
  };

 

  return (
    <Box>
      <Box sx={{ display: 'flex', marginTop: '50px' }}>
        <Box sx={{ overflow: 'auto' }}>
          <List style={{ marginTop: '50px', color: 'black' }}>
          <ListItem>
              <Link href={{ pathname: '/shop', query: { category: "Women's fashion" } }} passHref>
                <Button style={{ color: 'black' }}>Women's fashion</Button>
              </Link>
            </ListItem>
            <ListItem>
              <Link href={{ pathname: '/shop', query: { category: "Men's fashion" } }} passHref>
                <Button style={{ color: 'black' }}>Men's fashion</Button>
              </Link>
            </ListItem>
            <ListItem>
              <Link href={{ pathname: '/shop', query: { category: 'Electronics' } }} passHref>
                <Button style={{ color: 'black' }}>Electronics</Button>
              </Link>
            </ListItem>
            <ListItem>
              <Link href={{ pathname: '/shop', query: { category: 'Home & lifestyle' } }} passHref>
                <Button style={{ color: 'black' }}>Home & lifestyle</Button>
              </Link>
            </ListItem>
            <ListItem>
              <Link href={{ pathname: '/shop', query: { category: 'Sports & Outdoors' } }} passHref>
                <Button style={{ color: 'black' }}>Sports & Outdoors</Button>
              </Link>
            </ListItem>
            <ListItem>
              <Link href={{ pathname: '/shop', query: { category: "Baby's toys" } }} passHref>
                <Button style={{ color: 'black' }}>Baby's toys</Button>
              </Link>
            </ListItem>
            <ListItem>
              <Link href={{ pathname: '/shop', query: { category: 'Groceries & Pets' } }} passHref>
                <Button style={{ color: 'black' }}>Groceries & Pets</Button>
              </Link>
            </ListItem>
            <ListItem>
              <Link href={{ pathname: '/shop', query: { category: 'Health & Beauty' } }} passHref>
                <Button style={{ color: 'black' }}>Health & Beauty</Button>
              </Link>
            </ListItem>
          </List>
        </Box>
        <Box component="main" sx={{ flexGrow: 1, p: 3, width: '55%' }}>
          <CarouselComponent/>
          {/* <div style={{ position: 'relative', width: '100%', height: '500px' }}>
            {images.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Slide ${index}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'fill',
                  position: index === imgIndex ? 'static' : 'absolute',
                  opacity: index === imgIndex ? 1 : 0,
                  transition: 'opacity 0.5s ease-in-out',
                }}
              />
            ))}
            <IconButton onClick={()=>nextSlide(-1)} disabled={imgIndex===0} style={{ position: 'absolute', top: '50%', left: '20px', zIndex: 1 }}>
              <ArrowBackIosIcon />
            </IconButton>
            <IconButton onClick={()=>nextSlide(1)} disabled={imgIndex===3} style={{ position: 'absolute', top: '50%', right: '20px', zIndex: 1 }}>
              <ArrowForwardIosIcon />
            </IconButton>
          </div> */}
        </Box>
      </Box>
      <hr />
    </Box>
  );
};

export default Navbanner;

