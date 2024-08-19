'use client'

import { db } from "@/firebase"
import { useUser } from "@clerk/nextjs"
import { Box, Button, Card, CardActionArea, CardContent, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Paper, TextField, Typography, AppBar, Toolbar } from "@mui/material"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { doc, collection, setDoc, getDoc, writeBatch } from "firebase/firestore"
import { SignedOut, SignedIn, UserButton } from "@clerk/nextjs"

export default function Generate() {
    const { isLoaded, isSignedIn, user } = useUser()
    const [flashcards, setFlashcards] = useState([])
    const [flipped, setFlipped] = useState([])
    const [text, setText] = useState('')
    const [name, setName] = useState('')
    const [open, setOpen] = useState(false)
    const router = useRouter()

    const handleSubmit = async () => {
        fetch('api/generate', {
            method: 'POST',
            body: text,
        })
            .then((res) => res.json())
            .then((data) => setFlashcards(data))
    }

    const handleCardClick = (id) => {
        setFlipped((prev) => ({
            ...prev,
            [id]: !prev[id],
        }))
    }

    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }
    const saveFlashcards = async () => {
        if (!name) {
            alert('Please enter a name')
            return
        }

        if (!isLoaded || !isSignedIn || !user) {
            alert('User is not signed in.')
            return
        }
        const batch = writeBatch(db)
        const userDocRef = doc(collection(db, 'users'), user.id)
        const docSnap = await getDoc(userDocRef)

        if (docSnap.exists()) {
            const collections = docSnap.data().flashcards || []
            if (collections.find((f) => f.name === name)) {
                alert('Flashcard collection with the same name already exists.')
                return
            } else {
                collections.push({ name })
                batch.set(userDocRef, { flashcards: collections }, { merge: true })
            }
        } else {
            batch.set(userDocRef, { flashcards: [{ name }] })
        }

        const colRef = collection(userDocRef, name)
        flashcards.forEach((flashcard) => {
            const cardDocRef = doc(colRef)
            batch.set(cardDocRef, flashcard)
        })

        await batch.commit()
        handleClose()
        router.push('/flashcards')
    }

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                background: 'linear-gradient(to bottom, black, green, black)',
                color: 'white',
                padding: '0rem',
                margin: '0 auto',
                width: '100%',
                paddingBottom: '2rem',
                height: '110%',
            }}
        >
            <AppBar position="static" sx={{ backgroundColor: 'black' }}>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1, color: '#00FF7F' }}>
                        FlashGenius
                    </Typography>
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
                maxWidth='md'
                sx={{
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingBottom: flashcards.length > 0 ? '0' : '10rem',
                    minHeight: flashcards.length > 0 ? '100%' : 'calc(100vh - 64px)',
                }}
            >
                <Box sx={{ width: '100%', textAlign: 'center', mt: 4 }}>
                    <Typography variant="h4" sx={{ mb: 4, color: '#00FF7F' }}>Generate Flashcards</Typography>
                    <Paper sx={{ width: '100%', backgroundColor: 'inherit', borderRadius: 2, padding: 2 }}>
                        <TextField
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            label="Enter text"
                            fullWidth
                            multiline
                            rows={4}
                            variant="outlined"
                            sx={{ mb: 2, backgroundColor: 'white' }}
                        />
                        <Button variant='contained' sx={{ backgroundColor: '#00FF7F', color: 'black' }} onClick={handleSubmit} fullWidth>
                            Submit
                        </Button>
                    </Paper>
                </Box>

                {flashcards.length > 0 && (
                    <Box sx={{ mt: 4, width: '100%', flexGrow: 1 }}>
                        <Typography variant="h5" sx={{ mb: 2, color: '#00FF7F' }}>Flashcards Preview</Typography>
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
                        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                            <Button variant="contained" sx={{ backgroundColor: '#00FF7F', color: 'black' }} onClick={handleOpen}>
                                Save
                            </Button>
                        </Box>
                    </Box>
                )}

                <Dialog open={open} onClose={handleClose}
                    PaperProps={{
                        style: {
                            backgroundColor: 'black',
                            color: 'white',
                        },
                    }}>
                    <DialogTitle>Save Flashcards</DialogTitle>
                    <DialogContent>
                        <DialogContentText sx={{ color: 'white' }}>
                            Please enter a name for the flashcards collection.
                        </DialogContentText >
                        <TextField
                            autoFocus
                            margin='dense'
                            label='Collection Name'
                            type="text"
                            fullWidth
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            variant='outlined'
                            InputLabelProps={{
                                style: { color: 'black' },
                            }}
                            InputProps={{
                                style: { color: 'black', backgroundColor: 'white' },
                            }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} sx={{ color: '#00FF7F' }}>Cancel</Button>
                        <Button onClick={saveFlashcards} sx={{ color: '#00FF7F' }}>Save</Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </Box>
    )
}
