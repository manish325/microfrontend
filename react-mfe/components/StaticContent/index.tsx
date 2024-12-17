import React from 'react';
import { Container, Typography, Card, CardContent, Grid } from '@mui/material';
import "./static.scss";

const StaticContent = () => {
  return (
    <Container maxWidth="sm" className='static-content'>
      <Typography variant="h4" align="center" gutterBottom>
        Welcome to React Page
      </Typography>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h5" component="div">
            Here are some interesting facts:
          </Typography>
          <Grid container spacing={2} style={{ marginTop: 16 }}>
            <Grid item xs={12}>
              <Typography variant="body1">
                1. The Earth revolves around the Sun once a year.
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">
                2. Honey never spoils and can last for thousands of years.
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">
                3. Bananas are berries, but strawberries are not.
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">
                4. A group of flamingos is called a "flamboyance."
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">
                5. Octopuses have three hearts and blue blood.
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default StaticContent;
