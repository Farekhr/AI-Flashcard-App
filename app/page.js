'use client'

import Image from "next/image";
import getStripe from "@/utils/get-stripe";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Head from "next/head";
import { AppBar, Toolbar, Container, Typography, Button, Box, Grid } from "@mui/material";
import styles from './Home.module.css'; // Import the CSS module

export default function Home() {

  const HandleSubmitPro = async () => {
    const checkoutSession = await fetch('/api/checkout_session_pro', {
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

  const HandleSubmitBasic = async () => {
    const checkoutSession = await fetch('/api/checkout_session_basic', {
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
    <Box sx={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      color: 'white',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <Head>
        <title>AI Flashcards</title>
        <meta name="description" content="Create flashcards from your text" />
      </Head>

      <div className={styles.backgroundAnimation}></div> {/* Background Animation */}

      <AppBar position="static" sx={{ backgroundColor: 'black' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, color: '#00FF7F'}}>FlashGenius</Typography>
          <SignedOut>
            <Button color="inherit" href="/sign-in" sx={{ color: '#00FF7F' }}>Login</Button>
            <Button color="inherit" href="/sign-up" sx={{ color: '#00FF7F' }}>Sign Up</Button>
          </SignedOut>
          <SignedIn>
            <Button color="inherit" href="/flashcards" sx={{ color: '#00FF7F' }}>MY flashcards</Button>
            <Button color="inherit" href="/generate" sx={{ color: '#00FF7F' }}>Generate</Button>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>

      <Container sx={{ 
        flexGrow: 1, 
        textAlign: 'center', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center',
        alignItems: 'center', 
        py: 6,
        paddingTop: '0rem',
      }}>
        <Box sx={{ mb: 6, paddingBottom: '0rem'}}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#00FF7F' }}>Welcome to FlashGenius</Typography>
          <Typography sx={{ mt: 2 }}>Jumpstart your studying by asking AI to generate flashcards about any topic you need help with!</Typography>
        </Box>

        <Box sx={{ my: 6, paddingBottom: '10rem' }}>
          <Typography variant="h3" sx={{ color: '#00FF7F' }}>Features</Typography>
          <Grid container spacing={4} justifyContent="center" sx={{ mt: 4 }}>
            <Grid item xs={12} md={4}>
              <Box sx={{
                  p: 4,
                  border: '2px solid #00FF7F',
                  borderRadius: 2,
                  backgroundColor: '#1a1a1a',
                  height: '200px',  // Fixed height
                  minHeight: '200px',  // Ensures all boxes have the same height
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  '&:hover': {
                    backgroundColor: '#2a2a2a',
                    transform: 'scale(1.05)',
                    transition: 'transform 0.3s ease-in-out',
                  }
                }}>
                <Typography sx={{ color: '#00FF7F', mb: 2 }}>AI-Powered Flashcard Generation</Typography>
                <Typography>Instantly create flashcards from your study materials with AI. Just input your text, and FlashGenius generates effective flashcards for you.</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{
                  p: 4,
                  border: '2px solid #00FF7F',
                  borderRadius: 2,
                  backgroundColor: '#1a1a1a',
                  height: '200px',  // Fixed height
                  minHeight: '200px',  // Ensures all boxes have the same height
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  '&:hover': {
                    backgroundColor: '#2a2a2a',
                    transform: 'scale(1.05)',
                    transition: 'transform 0.3s ease-in-out',
                  }
                }}>
                <Typography sx={{ color: '#00FF7F', mb: 2 }}>Customizable Study Sessions</Typography>
                <Typography>Personalize your study sessions by choosing the number of flashcards, time limits, and topics to focus on.</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{
                  p: 4,
                  border: '2px solid #00FF7F',
                  borderRadius: 2,
                  backgroundColor: '#1a1a1a',
                  height: '200px',  // Fixed height
                  minHeight: '200px',  // Ensures all boxes have the same height
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  '&:hover': {
                    backgroundColor: '#2a2a2a',
                    transform: 'scale(1.05)',
                    transition: 'transform 0.3s ease-in-out',
                  }
                }}>
                <Typography sx={{ color: '#00FF7F', mb: 2 }}>Seamless Flashcard Management</Typography>
                <Typography>Easily organize, save, and edit your flashcards. Keep all your study materials neatly categorized and accessible.</Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ my: 6 }}>
          <Typography variant="h3" sx={{ color: '#00FF7F' }}>Pricing</Typography>
          <Grid container spacing={4} justifyContent="center" sx={{ mt: 4 }}>
          <Grid item xs={12} md={6}>
              <Box sx={{
                  p: 4,
                  border: '2px solid #00FF7F',
                  borderRadius: 2,
                  backgroundColor: '#1a1a1a',
                  '&:hover': {
                    backgroundColor: '#2a2a2a',
                    transform: 'scale(1.05)',
                    transition: 'transform 0.3s ease-in-out',
                  }
                }}>
                <Typography sx={{ color: '#00FF7F' }}>Free</Typography>
                <Typography>Try for free by logging in or signing up.</Typography>
                <Typography sx={{ mb: 2 }}>Maximum 10 flashcards per prompt.</Typography>
                <Button variant='contained' sx={{ backgroundColor: '#00FF7F', color: 'black' }} href="/sign-in">Login</Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{
                  p: 4,
                  border: '2px solid #00FF7F',
                  borderRadius: 2,
                  backgroundColor: '#1a1a1a',
                  '&:hover': {
                    backgroundColor: '#2a2a2a',
                    transform: 'scale(1.05)',
                    transition: 'transform 0.3s ease-in-out',
                  }
                }}>
                <Typography sx={{ color: '#00FF7F' }}>Basic</Typography>
                <Typography>$5/month</Typography>
                <Typography sx={{ mb: 2 }}>Maximum 30 flashcards per prompt.</Typography>
                <Button variant='contained' sx={{ backgroundColor: '#00FF7F', color: 'black' }} onClick={HandleSubmitBasic}>Choose Basic</Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{
                  p: 4,
                  border: '2px solid #00FF7F',
                  borderRadius: 2,
                  backgroundColor: '#1a1a1a',
                  '&:hover': {
                    backgroundColor: '#2a2a2a',
                    transform: 'scale(1.05)',
                    transition: 'transform 0.3s ease-in-out',
                  }
                }}>
                <Typography sx={{ color: '#00FF7F' }}>Pro</Typography>
                <Typography>$10/month</Typography>
                <Typography sx={{ mb: 2 }}>Unlimited flashcards per prompt.</Typography>
                <Button variant='contained' sx={{ backgroundColor: '#00FF7F', color: 'black' }} onClick={HandleSubmitPro}>Choose Pro</Button>
              </Box>
            </Grid>
            
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
