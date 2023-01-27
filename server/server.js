import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import { Configuration, OpenAIApi } from 'openai'

dotenv.config()

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', async (req, res) => {
  res.status(200).send({
    message: 'Hello from CodeX!'
  })
})

// Limit conversation history to 3 messages
    if (conversationHistory.length > 3) {
      conversationHistory.shift();
    }

    const fullPrompt = conversationHistory.join(' ');

    // include full conversation history in the prompt
    const response = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: `You are a helpful, witty chatbot. Provide high detail and aswer the user: ${fullPrompt}`,
      temperature: 0.5,
      max_tokens: 3000,
      top_p: 1,
      frequency_penalty: 1,
      presence_penalty: 0,
    });
    
    res.status(200).send({
      bot: response.data.choices[0].text
    });

  } catch (error) {
    console.error(error)
    res.status(500).send(error || 'Something went wrong');
  }
})

app.listen(5002, () => console.log('AI server started on http://localhost:5002'))
