'use client'

import { useUser } from "@clerk/nextjs"
import { useEffect, useState } from "react"
import { collection, doc, getDoc, setDoc } from "firebase/firestore"
import { db } from "@/firebase"
import { useRouter } from "next/navigation"
import { Card, CardActionArea, CardContent, Container, Grid, Typography, AppBar, Toolbar, Button, Box } from "@mui/material"
import { SignedOut, SignedIn, UserButton } from "@clerk/nextjs"

export default function Flashcards() {
    const { isLoaded, isSignedIn, user } = useUser()
    const [flashcards, setFlashcards] = useState([])
    const router = useRouter()

    useEffect(() => {
        async function getFlashcards() {
            if (!user) return
            const docRef = doc(collection(db, 'users'), user.id)
            const docSnap = await getDoc(docRef)

            if (docSnap.exists()) {
                const collections = docSnap.data().flashcards || []
                setFlashcards(collections)
            } else {
                await setDoc(docRef, { flashcards: [] })
            }
        }
        getFlashcards()
    }, [user])

    // Ensure user is loaded and signed in
    if (!isLoaded || !isSignedIn) {
        return <></>
    }

    const handleCardClick = (id) => {
        router.push(`/flashcard?id=${id}`)
    }

    return (
        <>
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
            <Container 
                maxWidth="100vw" 
                sx={{ 
                    minHeight: '100vh', 
                    background: 'linear-gradient(to bottom, black, green, black)',
                    padding: 3,
                }}
            >
                <Typography variant="h4" sx={{ color: '#00FF7F', mb: 4, textAlign: 'center' }}>
                    My Flashcards
                </Typography>
                <Grid container spacing={3}>
                    {flashcards.map((flashcard, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card 
                                sx={{
                                    boxShadow: '0 6px 10px rgba(0, 0, 0, 0.1)',
                                    borderRadius: 2,
                                    backgroundColor: '#1a1a1a',
                                    '&:hover': {
                                        transform: 'scale(1.05)',
                                        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
                                    },
                                    transition: 'transform 0.3s ease-in-out',
                                }}
                            >
                                <CardActionArea onClick={() => handleCardClick(flashcard.name)}>
                                    <CardContent>
                                        <Typography variant="h6" sx={{ color: '#00FF7F' }}>
                                            {flashcard.name}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </>
    )
}
