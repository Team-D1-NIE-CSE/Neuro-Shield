const path = require('path')
const express = require('express');
const cookieParser = require('cookie-parser')
const cors = require('cors')

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
};
app.use(cors(corsOptions))

const { connectToDB } = require("./config/connect-to-db");
connectToDB();

const userRouter = require('./routes/user-router')
const testRouter = require('./routes/test-router')

app.use('/test1', testRouter)
app.use('/user', userRouter) // verify User here....


// all other routes
app.get(/^.*/, (req, res) => {
    res.status(404).send("404 Page Not Found!")
})
app.post(/^.*/, (req, res) => {
    res.status(404).send("404 Page Not Found!")
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server live at http://localhost:${PORT}/`)
})