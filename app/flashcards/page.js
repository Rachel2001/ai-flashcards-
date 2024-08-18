'use client'
import { useUser } from "@clerk/nextjs"
import { useEffect } from "react"
import { collection, doc, getDoc, setDoc } from "firebase/firestore"
import db from "@/firebase"
import { useRouter } from "next/navigation"
import { Router } from "next/router"
import { useState } from "react"
import {
    Container,
    TextField,
    Button,
    Typography,
    Box,
    Paper,
    Grid,
    Card,
    CardActionArea,
    CardContent,
  } from '@mui/material'


export default function Flashcards() {
    const { isLoaded, isSignedIn, user } = useUser()
    const [flashcards, setFlashcards] = useState([])
    const router = useRouter()
  
    useEffect(() => {
        async function getFlashcards() {
            if (!user) return
        
            const docRef = doc(collection(db, 'users'), user.id)
            const docSnap = await getDoc(docRef)

            if (docSnap.exists()){
                const collections = docSnap.data.flashcards || []
                setFlashcards(collections)
            }
            else{
                await setDoc(docRef, {flashcards: []})
            }
        }
        getFlashcards()
    }, [user])

    if (!isLoaded || !isSignedIn){
        return <></>
    }

    // handle each card when clicked
    const handleCardClick = (id) => {
        router.push('flashcard?id=$(id)')
    }

    return (
    <Container maxWidth="md">
        <Grid 
            container spacing={3} sx={{ mt: 4 }}
        >
            {flashcards.map((flashcard, index) => (
                <Grid 
                    item xs={12} sm={6} md={4} key={index}
                >
                    <Card>
                        <CardActionArea 
                            onClick={() => handleCardClick(id)}
                        >
                            <CardContent>
                                <Typography
                                    variant="h6"

                                >
                                    {flashcard.name}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
            </Grid>
            ))}
        </Grid>
    </Container>
    )

  }