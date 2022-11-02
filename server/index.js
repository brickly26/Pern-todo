const express = require('express');
const cors = require('cors');

const pool = require('./database/db');
const todoRoutes = require('./routes/todo')

const app = express();

// MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

// ROUTES //
app.use('/todo', todoRoutes)


const PORT = process.env.POR || 5050

app.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`)
})