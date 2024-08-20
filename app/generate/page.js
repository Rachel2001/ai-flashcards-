'use client'

import { useState } from 'react'
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Grid,
  Card,
  CardContent,
} from '@mui/material'
import styled from '@emotion/styled'
import { red } from '@mui/material/colors'

export default function Generate() {
  const [text, setText] = useState('')
  const [flashcards, setFlashcards] = useState([])
  const [setName, setSetName] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)
  const handleOpenDialog = () => setDialogOpen(true)
  const handleCloseDialog = () => setDialogOpen(false)


  //THIS IS API STUFF, COULDNT CONNECT WITH API CUZ I HAD TO PAY
//   const saveFlashcards = async () => {
//     if (!setName.trim()) {
//       alert('Please enter a name for your flashcard set.')
//       return
//     }
  
//     try {
//       const userDocRef = doc(collection(db, 'users'), user.id)
//       const userDocSnap = await getDoc(userDocRef)
  
//       const batch = writeBatch(db)
  
//       if (userDocSnap.exists()) {
//         const userData = userDocSnap.data()
//         const updatedSets = [...(userData.flashcardSets || []), { name: setName }]
//         batch.update(userDocRef, { flashcardSets: updatedSets })
//       } else {
//         batch.set(userDocRef, { flashcardSets: [{ name: setName }] })
//       }
  
//       const setDocRef = doc(collection(userDocRef, 'flashcardSets'), setName)
//       batch.set(setDocRef, { flashcards })
  
//       await batch.commit()
  
//       alert('Flashcards saved successfully!')
//       handleCloseDialog()
//       setSetName('')
//     } catch (error) {
//       console.error('Error saving flashcards:', error)
//       alert('An error occurred while saving flashcards. Please try again.')
//     }
//   }

//   const handleSubmit = async () => {
//     // We'll implement the API call here
//     if (!text.trim()) {
//         alert('Please enter some text to generate flashcards.')
//         return
//       }
    
//       try {
//         const response = await fetch('/api/generate', {
//           method: 'POST',
//           body: text,
//         })
    
//         if (!response.ok) {
//           throw new Error('Failed to generate flashcards')
//         }
    
//         const data = await response.json()
//         setFlashcards(data)
//       } catch (error) {
//         console.error('Error generating flashcards:', error)
//         alert('An error occurred while generating flashcards. Please try again.')
//       }
//     }

// KIWI: Replace with API 
const saveFlashcards = async () => {
    if (!setName.trim()) {
      alert('Please enter a name for your flashcard set.');
      return;
    }

    try {
      // Simulate saving flashcards without any API calls
      alert('Flashcards saved successfully!');
      handleCloseDialog();
      setSetName('');
    } catch (error) {
      console.error('Error saving flashcards:', error);
      alert('An error occurred while saving flashcards. Please try again.');
    }
  };

    //KIWI: Replace with API
  const handleSubmit = () => {
    if (!text.trim()) {
      alert('Please enter some text to generate flashcards.');
      return;
    }

    const generatedFlashcards = [
      { front: 'What is React?', back: 'A JavaScript library for building user interfaces.' },
      { front: 'What is JSX?', back: 'A syntax extension for JavaScript that looks similar to XML or HTML.' },
      { front: 'What is a component in React?', back: 'A reusable piece of UI that can be nested, managed, and handled independently.' },
    ];

    setFlashcards(generatedFlashcards);
  };

  const Flashcard = styled('div')({
    perspective: '1000px',
    width: '100%',
    height: '100%',
  });

  const FlashcardInner = styled('div')({
    position: 'relative',
    width: '100%',
    height: '100%',
    transition: 'transform 0.6s',
    transformStyle: 'preserve-3d',
    '&:hover': {
      transform: 'rotateY(180deg)',
    },
  });

  const FlashcardFace = styled('div')(({ theme }) => ({
    position: 'absolute',
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '24px',
    borderRadius: '15px',
    boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.1)',
    fontSize: '2.25rem',
    fontWeight: '500',
    transition: 'transform 0.6s ease, background-color 0.3s ease',
  }));

  const FlashcardFront = styled(FlashcardFace)({
    backgroundColor: '#1976d2', 
    color: '#fff',
    backgroundImage: 'linear-gradient(135deg, #1976d2 0%, #63a4ff 100%)', 
    fontSize: '5rem'
  });
  
  const FlashcardBack = styled(FlashcardFace)({
    backgroundColor: '#115293', 
    color: '#fff',
    backgroundImage: 'linear-gradient(135deg, #115293 0%, #1976d2 100%)', 
    transform: 'rotateY(180deg)',
  });
  
  const FlashcardContainer = styled('div')({
    width: '320px',
    height: '250px',
    margin: '0 auto',
    borderRadius: '15px',
    overflow: 'hidden',
    cursor: 'pointer',
  });

  const CardGrid = styled(Grid)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  });

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Generate Flashcards
        </Typography>
        <TextField
          value={text}
          onChange={(e) => setText(e.target.value)}
          label="Enter text"
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          sx={{ mb: 2 }}
        />
        <Button variant="contained" color="primary" onClick={handleSubmit} fullWidth>
          Generate Flashcards
        </Button>
      </Box>
      {flashcards.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            Generated Flashcards
          </Typography>
          <Grid container spacing={4}>
            {flashcards.map((flashcard, index) => (
              <CardGrid item xs={12} sm={6} md={4} key={index}>
                <FlashcardContainer>
                  <Flashcard>
                    <FlashcardInner>
                      <FlashcardFront>
                        <Typography variant="h6" sx={{ fontWeight: '600' }}></Typography>
                        <Typography>{flashcard.front}</Typography>
                      </FlashcardFront>
                      <FlashcardBack>
                        <Typography variant="h6" sx={{ fontWeight: '650' }}></Typography>
                        <Typography>{flashcard.back}</Typography>
                      </FlashcardBack>
                    </FlashcardInner>
                  </Flashcard>
                </FlashcardContainer>
              </CardGrid>
            ))}
          </Grid>
          {flashcards.length > 0 && (
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
              <Button variant="contained" color="primary" onClick={handleOpenDialog}>
                Save Flashcards
              </Button>
            </Box>
          )}
        </Box>
      )}
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Save Flashcard Set</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter a name for your flashcard set.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Set Name"
            type="text"
            fullWidth
            value={setName}
            onChange={(e) => setSetName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={saveFlashcards} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}