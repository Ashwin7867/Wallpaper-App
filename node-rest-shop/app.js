const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

var cors = require('cors');

const imageRoutes = require('./api/routes/images');
const userRoutes = require('./api/routes/users');

mongoose.connect("mongodb+srv://Ashwin7867:Ashwin@1996@node-rest.ciisd.mongodb.net/test?retryWrites=true&w=majority",
{
    useNewUrlParser : true,
    useUnifiedTopology : true
})
.then(() => console.log('Database Connected'))
.catch(err => console.log('Error in connecting to databse'))

app.use(cors());
app.use(morgan('dev'));
app.use('/uploads',express.static('uploads'))
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

app.use((req,res,next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', true);	
    res.header('Access-Control-Allow-Header', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET');
    next()
})

app.use('/users', userRoutes);
app.use('/images', imageRoutes);



app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status(404);
    next(error);
})

app.use((error , req,res,next) => {
    res.status(error.status || 500);
    res.json({
        error : {
            message : "Not Found"
        }
    })
})

module.exports = app
