const express = require('express');
const app = express();
const morgan = require('morgan'); //middleware
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const userRoutes = require("./api/version1/routes/user");
const topicsRoutes = require('./api/version1/routes/topic');
const resourcesRoutes = require('./api/version1/routes/resources');

mongoose.connect(
    "mongodb+srv://node-shop:"
        +process.env.MONGO_ATLAS_PW+
    "@node-rest-shop-aykdx.mongodb.net/test?retryWrites=true",
    {useNewUrlParser: true}
); 

mongoose.Promise = global.Promise;

app.use(morgan('dev')); //logger
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


//prevent cors errors 
app.use((req,res,next) =>{
    res.header('Access-Control-Allow-Origin','*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({}); //201
    }

    next();
});


//should be singular 
app.use('/user', userRoutes);
app.use('/topics', topicsRoutes);
app.use('/resources',resourcesRoutes);

app.use((req,res,next) =>{
    const error = new Error('Not found');
    error.status = 404; //error.status(404);
    next(error);
});

app.use((error,req,res,next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});


module.exports = app;