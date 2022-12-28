require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const issueRouter = require("./routes/issue");
const commentRouter = require("./routes/comment");
const userRouter = require("./routes/user");
const {expressjwt} = require('express-jwt');

// Middleware (for every request)
app.use(express.json())
app.use(morgan('dev'))

// Connect to DB
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/inventorydb');
    console.log("connected to the DB")
  // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
}


// Routes
app.use('/api', expressjwt({ secret: process.env.SECRET, algorithms: ['RS256'] }))
app.use('/api/issue', issueRouter)
app.use('/api/comment', commentRouter)
app.use('/api/user', userRouter)
app.use('/auth', require('./routes/authRouter.js'))
app.use('/api/todo', require('./routes/todoRouter.js'))


// Error handler
app.use((err, req, res, next) => {
    console.log(err)
    if(err.name === "Unauthorized Error"){
      res.status(err.status)
    }
    return res.send({errMsg: err.message})
})

// Server listen
app.listen(9000, () => {
    console.log('The server is running on Port 9000')
})