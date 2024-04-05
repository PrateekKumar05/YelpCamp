const express = require('express')
const path = require('path')
const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.get('/home', (req,res) => {
    res.render('home')
})

app.listen(3000, () => {
    console.log('Serving on Port 3000')
})