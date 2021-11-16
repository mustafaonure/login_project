const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const flash = require('connect-flash');
const passport = require('passport');

const app = express();

app.use(express.json());


//EJS

app.use(expressLayouts);
app.set('view engine','ejs');

//BodyParser

app.use(express.urlencoded({ extended:false }));

//Routes

app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));



const usersRoute = require('./routes/users');
app.use(usersRoute);


require('dotenv').config();


app.use((err, req, res, next) => {
    if(err.statusCode) {
        res.status(err.statusCode).send(err.message);
    } else {
        console.log(err);
        res.status(500).send('Something unexpected happened');
    }
});




const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log('Server started!');
})