const express = require('express')
const app = express()
const routers = require('./src/routes/routes')
const path = require('path')
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));



app.use(routers)

app.listen(process.env.HOST_PORT, (err) => {
    if(err){
        console.error(err)
    }else{
        console.log('successfully connected')
    }
})