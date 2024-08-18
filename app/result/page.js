//handle the results of our stripe call
'use client'

import { useEffect, useState } from "react"
import { redirect, useRouter } from "next/navigation"
import getStripe from "@/utils/get-stripe"
import { useSearchParams } from "next/navigation"
import { CircularProgress, Typography, Container, Box, Button } from "@mui/material"
import Link from "next/link"


export default function ResultPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const session_id = searchParams.get('session_id')

  const [loading, setLoading] = useState(true)
  const [session, setSession] = useState(null)
  const [error, setError] = useState(null)

  // ... (rest of the component)
  useEffect(() => {
    const fetchCheckoutSession = async () => {
        // return nothing because there is no session id
        if (!session_id) return

        try {
          // fetch result of the session id
          const res = await fetch(`/api/checkout_session?session_id=${session_id}`,)
          const sessionData = await res.json()
          if (res.ok) {
            setSession(sessionData)
          } else {
              setError(sessionData.error)
          }
        } 
        catch (err) {
          setError("An error occurred while retrieving the session.")
          } finally {
            setLoading(false)
          }
    }

      fetchCheckoutSession()
  }, [session_id])


  if (loading) {
    return (
      <Container 
        maxWidth="100vw" 
        sx={{textAlign: 'center', mt: 4}}
      >
        <CircularProgress></CircularProgress>
        <Typography variant="h6" sx={{mt: 2}}>
          Loading...
        </Typography>
      </Container>
    )
  }

  if (error) {
      return (
        <Container 
          maxWidth="100vw" 
          sx={{textAlign: 'center', mt: 4}}
        >
          <Typography variant="h6" color = "error">
            {error}
          </Typography>
        </Container>
      )
  }

  return (
    <Container 
      maxWidth="100vw" sx={{textAlign: 'center', mt: 4}}
    >
      {session.payment_status === "paid" ? (
        <>
          <Typography variant="h4">Thank you for purchasing.</Typography>
          <Box sx={{mt: 22}}>
            <Typography variant="h6">Session ID: {session_id}</Typography>
            <Typography variant="body1">
              We have received your payment. You will receive an email with the
              order details shortly.
            </Typography>
        
          </Box>
        </>
      ) : (
        <>
          <Typography variant="h4">Payment failed</Typography>
          <Box sx={{mt: 22}}>
            <Typography variant="body1">
              Your payment was not successful. Please try again.
            </Typography>
            <Link href = {'/'}>
                <Button>Return to home page</Button>
              </Link>
          </Box>
        </>
      )}
    </Container>
  )
}




