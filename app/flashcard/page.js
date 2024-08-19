'use client'

import { useUser, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import { useEffect, useState } from "react"
import { collection, doc, getDocs } from "firebase/firestore"
import { db } from "@/firebase"
import { useSearchParams, useRouter } from "next/navigation" 
import { Box, Button, Card, CardActionArea, CardContent, Container, Grid, Typography, AppBar, Toolbar } from "@mui/material"

export default function Flashcard() {
    const { isLoaded, isSignedIn, user } = useUser()
    const [flashcards, setFlashcards] = useState([])
    const [flipped, setFlipped] = useState([])

    const searchParams = useSearchParams()
    const search = searchParams.get('id')
    const router = useRouter()

    useEffect(() => {
        async function getFlashcard() {
            if (!search || !user) return
            const colRef = collection(doc(collection(db, 'users'), user.id), search)
            const docs = await getDocs(colRef)
            const flashcards = []

            docs.forEach((doc) => {
                flashcards.push({ id: doc.id, ...doc.data() })
            })
            setFlashcards(flashcards)
        }
        getFlashcard()
    }, [user, search])

    const handleCardClick = (id) => {
        setFlipped((prev) => ({
            ...prev,
            [id]: !prev[id],
        }))
    }

    const handleBackClick = () => {
        router.push('/flashcards') 
    }

    if (!isLoaded || !isSignedIn) {
        return <></>
    }

    return (
        <>
            {/* Menu Bar */}
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

            {/* Flashcards Container */}
            <Box
                sx={{
                    background: 'linear-gradient(to bottom, black, green, black)',
                    minHeight: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '16px',
                }}
            >
                <Container maxWidth="md">
                    <Button onClick={handleBackClick} sx={{ mb: 4, backgroundColor: '#00FF7F', color: 'black' }} variant="contained">
                        Back to Collection
                    </Button>
                    <Grid container spacing={4}>
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
                                    <CardActionArea onClick={() => handleCardClick(index)}>
                                        <CardContent>
                                            <Box
                                                sx={{
                                                    perspective: '1000px',
                                                    '& > div': {
                                                        transition: 'transform 0.6s',
                                                        transformStyle: 'preserve-3d',
                                                        position: 'relative',
                                                        width: '100%',
                                                        height: '250px',
                                                        transform: flipped[index] ? 'rotateY(180deg)' : 'rotateY(0deg)',
                                                        backgroundColor: '#1a1a1a',
                                                        borderRadius: 2,
                                                    },
                                                    '& > div > div': {
                                                        position: 'absolute',
                                                        width: '100%',
                                                        height: '100%',
                                                        backfaceVisibility: 'hidden',
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        padding: 2,
                                                        boxSizing: 'border-box',
                                                        color: '#ffffff',
                                                        borderRadius: 2,
                                                    },
                                                    '& > div > div:nth-of-type(2)': {
                                                        transform: 'rotateY(180deg)',
                                                    },
                                                }}
                                            >
                                                <div>
                                                    <div>
                                                        <Typography variant="h6" component="div" sx={{ color: '#00FF7F' }}>
                                                            {flashcard.front}
                                                        </Typography>
                                                    </div>
                                                    <div>
                                                        <Typography variant="h6" component="div" sx={{ color: '#00FF7F' }}>
                                                            {flashcard.back}
                                                        </Typography>
                                                    </div>
                                                </div>
                                            </Box>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>
        </>
    )
}
