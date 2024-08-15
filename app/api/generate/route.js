import { NextResponse } from 'next/server'
import OpenAI from 'openai'

// You need to ensure that the API key is available via environment variables
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Make sure you have this in your environment variables
})

const systemPrompt = `
You are a flashcard creator. You take in text and create 10 flashcards from it. Each flashcard should have exactly one sentence on the front and one sentence on the back, formatted as JSON.
Return the response in the following format:
{
  "flashcards":[
    { "front": "Front of the card", "back": "Back of the card" },
    { "front": "Front of the card", "back": "Back of the card" },
    ...
  ]
}
`

export async function POST(req) {
    const openai = new OpenAI()
    const data = await req.text()
  
    const completion = await openai.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: data },
      ],
      model: 'gpt-3.5-turbo-1106',
      response_format: { type: 'json_object' },
    })
  
    // Parse the JSON response from the OpenAI API
    const flashcards = JSON.parse(completion.choices[0].message.content)
  
    // Return the flashcards as a JSON response
    return NextResponse.json(flashcards.flashcards)
  }