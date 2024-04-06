const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const app = express()
const CampGround = require('./models/campground')

mongoose.connect('mongodb://localhost:27017/yelp-camp')

const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error:"));
db.once('open', () => {
  console.log("Database connected");
});

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.get('/', async (req,res) => {
    res.render('home')
})

app.get('/makecampground', async (req,res) => {
    const camp = new CampGround({title: 'My Backyard', description: 'cheap camping!'});
    camp.save();
    res.send(camp)
})

app.listen(3000, () => {
    console.log('Serving on Port 3000')
})