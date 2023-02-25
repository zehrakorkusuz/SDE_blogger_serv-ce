const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config()
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// Initialize the OpenAI API client
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

// Set up the server
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Configure Express to parse JSON bodies
app.use(bodyParser.json());

// Define the API endpoint
app.post('/generateText', async (req, res) => {
  const user_prompt = req.body.prompt;

  const model = 'text-davinci-003';
  const prompt = `Write me a blog post that has a thousand words using keywords ${user_prompt}`;
  const max_tokens = 2000;
  const temperature = 0.5;
  const stop =  null;
  const n = 1;

  const createCompletionRequest = {
    model,
    prompt,
    max_tokens,
    temperature,
    n,
    stop,
  }

  try {
    const completion = await openai.createCompletion(createCompletionRequest);

 //   const outputText = completion.data.choices[0].text;
    res.send({
        success: true,
        text: completion.data.choices[0].text,
      });
  } catch (error) {
    // console.error(error.message);
    console.error(error);
    res.status(500).send('Error generating text');
  }
});

// Start the server
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Listening on port http://localhost:${port}`);
});
