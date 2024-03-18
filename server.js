const express = require('express');
const Clarifai = require('clarifai');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const clarifaiApp = new Clarifai.App({ apiKey: '74a43354d78d433d9757f71e52628256' });

const handleImageDetection = (req, res) => {
    clarifaiApp.models.predict(Clarifai.GENERAL_MODEL, req.body.input)
      .then(data => res.json(data))
      .catch(err => res.status(400).json('Unable to work with API'))
  }
  
  const handlePugDetection = (req, res) => {
    clarifaiApp.models.predict('pug', req.body.input)
      .then(data => res.json(data))
      .catch(err => res.status(400).json('Unable to work with API'))
  }
  
  app.post('/detect', (req, res) => {
    handleImageDetection(req, res);
  });
  
  app.post('/pug', (req, res) => {
    handlePugDetection(req, res);
  });

app.listen(3000, () => {
  console.log('App is running on port 3000');
});