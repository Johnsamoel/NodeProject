const express = require('express');
const app = express();

//you have to coonect the database

app.use('/users',require('./User.router'))


app.listen(3000);