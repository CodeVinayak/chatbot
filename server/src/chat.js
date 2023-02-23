const express = require('express');
const router = express.Router();
const { Configuration, OpenAIApi } = require("openai");

// Set up OpenAI configuration and API
const OPENAI_API_KEY = "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";
const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Define your API endpoint
router.post('/', (req, res) => {
  const question = req.body.question;

  openai
    .createCompletion({
      model: "text-davinci-003",
      prompt: question,
      max_tokens: 4000,
      temperature: 0,
    })
    .then((response) => {
      console.log({ response });
      return response?.data?.choices?.[0]?.text;
    })
    .then((answer) => {
      console.log({ answer });
      const array = answer
        ?.split("\n")
        .filter((value) => value)
        .map((value) => value.trim());

      return array;
    })
    .then((answer) => {
      res.json({
        answer: answer,
        propt: question,
      });
    });
  console.log({ question });
});

module.exports = router;
