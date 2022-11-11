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
    res.render('pages/profile.ejs', {name:req.user.displayName, email:req.user.emails[0].value,
    pic:req.user.photos[0].value})
})

app.get('/google',passport.authenticate('google',{scope:['profile','email']  }));

app.get('/google/callback', passport.authenticate('google',{failureRedirect:'/failed'}),
    function(req, res) {
    res.redirect('/success');
    }
);

app.listen(3000, () => {
    console.log("App corres en el puerto 3000")
})