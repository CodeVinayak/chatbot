const { createProxyMiddleware } = require('http-proxy-middleware');
const { Configuration, OpenAIApi } = require("openai");
const express = require('express');
const cors = require('cors');
const app = express();

// Add CORS headers
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Enable CORS
app.use(cors({
  origin: '*',
  allow_headers: '*',
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE"
}));

// Set up OpenAI configuration and API
const OPENAI_API_KEY = "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";
const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Set up JSON parsing middleware
app.use(express.json());

app.get("/ping", (req, res) => {
  res.json({
    message: "pong",
  });
});

// Define your API endpoint
app.post('/chat', (req, res) => {
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
