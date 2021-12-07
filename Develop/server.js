const {init} = require('./init');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Function call to initialize app
init();





  app.listen(PORT, () => console.log('Now listening'));