'use client'

import { SignUp } from "@clerk/nextjs";
import { AppBar, Box, Button, Container, Toolbar, Typography } from "@mui/material";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function SignUpPage() {
    return (
        <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'black', color: 'white' }}>
      <AppBar position="static" sx={{ backgroundColor: 'black' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, color: '#00FF7F' }}>FlashGenius</Typography>
          <SignedOut>
            <Button color="inherit" href="/sign-in" sx={{ color: '#00FF7F' }}>Login</Button>
            <Button color="inherit" href="/sign-up" sx={{ color: '#00FF7F' }}>Sign Up</Button>
            <Button color="inherit" href="/" sx={{ color: '#00FF7F' }}>Home</Button>
          </SignedOut>
          <SignedIn>
            <Button color="inherit" href="/flashcards" sx={{ color: '#00FF7F' }}>MY flashcards</Button>
            <Button color="inherit" href="/generate" sx={{ color: '#00FF7F' }}>Generate</Button>
            <Button color="inherit" href="/" sx={{ color: '#00FF7F' }}>Home</Button>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>

            <Container maxWidth='sm' sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', py: 6 }}>
                <Typography variant="h4" sx={{ mb: 4, color: '#00FF7F' }}>Sign Up</Typography>
                <Box sx={{ width: '100%', backgroundColor: '#1a1a1a', padding: 4, borderRadius: 2, boxShadow: '0 6px 10px rgba(0, 0, 0, 0.3)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <SignUp />
                </Box>
            </Container>
        </Box>
    )
}
