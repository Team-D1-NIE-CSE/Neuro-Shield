const path = require('path')
const express = require('express');
const expressLayouts = require('express-layouts');
const cors = require('cors')

const app = express();

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(expressLayouts)

const corsOptions = {
    origin: 'http://localhost:5173'
}
app.use(cors(corsOptions))

// const indexRouter = require('./routes/index-router')
// const userRouter = require('./routes/user-router')

app.get('/', (req, res)=>{
    res.send("Hey babe.")
})
app.get('/test1', (req, res)=>{
    res.send("Hey babe.")
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server live at http://localhost:${PORT}/`)
})