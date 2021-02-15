const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const morgan = require("morgan");
const expressLayouts = require('express-ejs-layouts');
const  methodOverride = require('method-override'); 
const connectDB = require('./config/db');
dotenv.config({path:'./config/config.env'});

const app = express();
connectDB();

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({extended:false}));

//method-override
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      let method = req.body._method
      delete req.body._method
      return method
    }
}))

app.use(expressLayouts);
app.set('view engine','ejs');

//static folder
app.use(express.static(path.join(__dirname,'public')));

app.use('/',require('./routers/index'));

const PORT = process.env.PORT||8000;

app.listen(PORT,console.log(`Server is running on ${process.env.NODE_ENV} port ${PORT}`));