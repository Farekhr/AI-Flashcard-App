'use client'

import Image from "next/image";
import getStripe from "@/utils/get-stripe";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Head from "next/head";
import { AppBar, Toolbar, Container, Typography, Button, Box, Grid } from "@mui/material";

export default function Home() {

  const HandleSubmit = async () => {
    const checkoutSession = await fetch('/api/checkout_session', {
      method: 'POST',
      headers: {
        origin: 'http://localhost:3000',
      },
    })

    const checkoutSessionJson = await checkoutSession.json()

    if (checkoutSession.statusCode === 500) {
      console.error(checkoutSession.message)
      return
    }

    const stripe = await getStripe()
    const { error } = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id
    })

    if (error) {
      console.warn(error.message)
    }
  }

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Head>
        <title>AI Flashcards</title>
        <meta name="description" content="Create flashcard from your text" />
      </Head>

      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>Flashcard AI</Typography>
          <SignedOut>
            <Button color="inherit" href="/sign-in">Login</Button>
            <Button color="inherit" href="/sign-up">Sign Up</Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>

      <Container sx={{ flexGrow: 1, textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4">Welcome to Flashcard AI</Typography>
          <Typography>Need flashcards based on your homework? This is the right place to come.</Typography>
        </Box>

        <Box sx={{ my: 6 }}>
          <Typography variant="h3">Features</Typography>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} md={4}>
              <Typography>Feature 1</Typography>
              <Typography>Description feature 1</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography>Feature 2</Typography>
              <Typography>Description feature 2</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography>Feature 3</Typography>
              <Typography>Description feature 3</Typography>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ my: 6 }}>
          <Typography variant="h3">Pricing</Typography>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  p: 3,
                  border: '1px solid',
                  borderColor: 'grey.300',
                  borderRadius: 2,
                }}
              >
                <Typography>Basic</Typography>
                <Typography>$5/month</Typography>
                <Typography>Description price Basic</Typography>
                <Button variant='contained' color='primary'>Choose Basic</Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  p: 3,
                  border: '1px solid',
                  borderColor: 'grey.300',
                  borderRadius: 2,
                }}
              >
                <Typography>Pro</Typography>
                <Typography>$10/month</Typography>
                <Typography>Description price Pro</Typography>
                <Button variant='contained' color='primary' onClick={HandleSubmit}>Choose Pro</Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
