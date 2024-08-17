import Image from "next/image";
import getStripe from "@/utils/get-stripe";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Head from "next/head";
import { AppBar, Toolbar, Container, Typography, Button, Box, Grid } from "@mui/material";

export default function Home() {
  return (
    <Container maxwidth="lg">
      <Head>
        <title>AI Flashcards</title>
        <meta name="description" content="Create flashcard from your text"/>
      </Head>

      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{flexGrow:1}}>Flashcard AI</Typography>
          <SignedOut>
            <Button color="inherit">Login</Button>
            <Button color="inherit">Sign Up</Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>

      <Box>
        <Typography> Welcome to Flashcard AI</Typography>
        <Typography> 
          {' '}
          some text
        </Typography>
      </Box>
      <Box sx={{my:6}}>
        <Typography variant="h3">Features</Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography>Feature 1</Typography>
            <Typography> 
              {' '}
              description feature 1
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography>Feature 2</Typography>
            <Typography> 
              {' '}
              description feature 2
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography>Feature 3</Typography>
            <Typography>
              {' '}
              description feature 3
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{my:6, textAlign:'center'}}>
        <Typography variant='h3'>Pricing</Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                p:3,
                border:'1px solid',
                borderColor: 'grey.300',
                borderRadius: 2,
              }}
            >
              <Typography>Basic</Typography>
              <Typography>$5/month</Typography>
              <Typography> 
                {' '}
                description price Basic
              </Typography>
              <Button variant ='contained' color='primary'>Choose Basic</Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                p:3,
                border:'1px solid',
                borderColor: 'grey.300',
                borderRadius: 2,
              }}
            >
              <Typography>Pro</Typography>
              <Typography>$10/month</Typography>
              <Typography> 
                {' '}
                description price Pro
              </Typography>
              <Button variant ='contained' color='primary'>Choose Pro</Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
