import * as React from 'react';
import { Container, Typography, TextField, Button, Grid, Paper } from '@mui/material';

export default function CreateInvoicePage() {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ padding: '2rem' }}>
        <Typography variant="h4" align="center" gutterBottom>
          Create Invoice
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField label="Customer Name" fullWidth required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Email Address" fullWidth required type="email" />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Shipping Address"
                multiline
                rows={4}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Product Description"
                multiline
                rows={4}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Quantity" type="number" fullWidth required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Unit Price" type="number" fullWidth required />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Create Invoice
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}
