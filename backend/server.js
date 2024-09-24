const express = require('express');
const app = express();
require('dotenv').config()

const port = process.env.PORT

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

//I AM HERE