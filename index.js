const express = require('express');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
 dotenv.config();

 const app = express();
 const db = require('./config/dbs');
const router = require('./route/routes');

app.use(express.json());
app.use(cookieParser());

//use the router
app.use('/api', router);
 

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});