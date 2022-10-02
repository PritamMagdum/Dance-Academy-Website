const express = require("express");
const app = express();
const path = require("path");
const port = 8000;
const bodyparser = require('body-parser')
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true});

// define mongoose schema
var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    concern: String
});

var contact = mongoose.model('contact', contactSchema);

// express specific stuff
app.use('/static', express.static('static'));

// pug specific stuff
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// endpoints

// get request
app.get('/', (req, res) =>{
    const params = { }
    // res.status(200).render('index.pug', params);
    res.status(200).render('home.pug', params);
})
app.get('/contact', (req, res) =>{
    const params = { }
    // res.status(200).render('index.pug', params);
    res.status(200).render('contact.pug', params);
})

// post request
app.post('/contact', (req, res) =>{
    var mydata = new contact(req.body);
    mydata.save().then(()=>{
        res.send("This data is save to the database");
    }).catch(()=>{
        res.status(400).send("Your data is not saved ! Please try after few minutes");
    });
    // res.status(200).render('contact.pug', params);
})

// server start
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
})