import React from "react";
import { Box, Grid, Card, CardMedia, Typography } from "@mui/material";
import SquareIcon from '@mui/icons-material/Square';

const Featured = () => {
  return (
    <Box sx={{ padding: 3, marginTop: "50px" }}>
      <Typography variant="h5" component="h5" sx={{ color: "red", display: "flex", alignItems: "center" }}>
        <SquareIcon /> Featured
      </Typography>

      <Typography variant="h4" component="div" sx={{ marginTop: 2 }}>
        New Arrival
      </Typography>

      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        
        <Grid item xs={12} sm={6}>
          <Card>
            <CardMedia
              component="img"
              height="500"
              image="https://www.tomsguide.fr/content/uploads/sites/2/2023/05/PS5-Pro-concept-noir.jpg"
              alt="Left Image"
            />
          </Card>
        </Grid>

       
        <Grid item xs={12} sm={6}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Card>
                <CardMedia
                  component="img"
                  height="240"
                  image="https://www.cougar.com.pk/cdn/shop/articles/New_Women_s_Collection.jpg?v=1662637654"
                  alt="Top Right Image"
                />
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card>
                <CardMedia
                  component="img"
                  height="240"
                  image="https://img.pikbest.com/origin/10/03/54/25ApIkbEsTuMm.jpg!w700wp"
                  alt="Bottom Right Image 1"
                />
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card>
                <CardMedia
                  component="img"
                  height="240"
                  image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFSYtX3P7iJUu8sSX2Mvn_pctEh_412sDzYw&s"
                  alt="Bottom Right Image 2"
                />
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Featured;
