const path = require('path')
const express = require('express');
const expressLayouts = require('express-layouts');

const app = express();

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(expressLayouts)

// const indexRouter = require('./routes/index-router')
// const userRouter = require('./routes/user-router')


app.get('/', (req, res)=>{
    res.send("Hey babe.")
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server live at http://localhost:${PORT}/`)
})