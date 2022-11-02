const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.POR || 5050

app.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`)
})