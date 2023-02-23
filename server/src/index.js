// const express = require("express");
// const OPENAI_API_KEY = "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";
// const { Configuration, OpenAIApi } = require("openai");
// const cors = require("cors");
// const configuration = new Configuration({
//   apiKey: OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(configuration);

// const app = express();
// app.use(cors());

// app.use(express.json());

// app.get("/ping", (req, res) => {
//   res.json({
//     message: "pong",
//   });
// });
// app.post("/chat", (req, res) => {
//   const question = req.body.question;

//   openai
//     .createCompletion({
//       model: "text-davinci-003",
//       prompt: question,
//       max_tokens: 4000,
//       temperature: 0,
//     })
//     .then((response) => {
//       console.log({ response });
//       return response?.data?.choices?.[0]?.text;
//     })
//     .then((answer) => {
//       console.log({ answer });
//       const array = answer
//         ?.split("\n")
//         .filter((value) => value)
//         .map((value) => value.trim());

//       return array;
//     })
//     .then((answer) => {
//       res.json({
//         answer: answer,
//         propt: question,
//       });
//     });
//   console.log({ question });
// });

// app.listen(3000, () => {
//   console.log("Server is listening on port 3000");
// });

const { createProxyMiddleware } = require('http-proxy-middleware');
const { Configuration, OpenAIApi } = require("openai");
const express = require('express');
const cors = require('cors');

const app = express();

// Set up OpenAI configuration and API
const OPENAI_API_KEY = "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";
const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Enable CORS
app.use(cors());

// Set up JSON parsing middleware
app.use(express.json());

// Proxy requests to Vercel serverless functions
app.use('/api', createProxyMiddleware({ 
  target: 'https://www.chatbot.vinayaksingh.com', // Change this to your Vercel domain
  changeOrigin: true 
}));

// Define your API endpoint
app.post('', (req, res) => {
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

module.exports = app;
