const { Configuration, OpenAIApi } = require("openai");
// Initialize the OpenAI API client
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function generateText(req, res) {
  const user_prompt = req.body.prompt;

  const model = "text-davinci-003";
  const prompt = `Write me a blog post that has a thousand words using keywords ${user_prompt}`;
  const max_tokens = 2000;
  const temperature = 0.5;
  const stop = null;
  const n = 1;

  const createCompletionRequest = {
    model,
    prompt,
    max_tokens,
    temperature,
    n,
    stop,
  };

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
    res.status(500).send("Error generating text");
  }
}

module.exports = { generateText };
