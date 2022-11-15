require('dotenv').config()

const express = require('express')
const passport = require('passport')
const session = require('express-session');
const cookieSession = require('cookie-session')


const app = express()

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'bla bla bla' 
  }));

require('./passport-setup')

app.set("view engine", "ejs")

app.use(passport.initialize())

app.use(passport.session())


app.get('/', (req,res) => {
    res.render("pages/index")
})

app.get('/success', (req,res) => {
    res.redirect('https://uppictures.azurewebsites.net')
})

app.get('/google',passport.authenticate('google',{scope:['profile','email']  }));

app.get('/google/callback', passport.authenticate('google',{failureRedirect:'/failed'}),
    function(req, res) {
    res.redirect('/success');
    }
);

app.listen(port, () => {
    console.log("App corres en el puerto 3000")
})