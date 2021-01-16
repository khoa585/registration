require("dotenv").config();
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json())

let cors = require('cors')
let {JWTauthen} = require('./src/middleware/JWTauthen');
let mongoose = require("mongoose");
app.use(JWTauthen)
try {
    mongoose.connect("mongodb+srv://hoduykhoa:titikakatika2207n@cluster0.lodmh.mongodb.net/school?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true }, (error) => {
        if (error) {
            console.log(error);
        } else {
            console.log("Connected to DB hoduykhoa");
        }
    });
} catch (error) {
    handleError(error);
}
app.use(bodyParser.urlencoded({ extended: true }))
import Authencation from './src/common/Authencation'
import routers from './src/server'
app.use(cors())
app.use(Authencation)
app.use('/api', routers)
app.use('/', (req, res) => {
    res.send('hello world')
})


app.listen(process.env.PORT, () => {
    console.log(`Example app listening at http://localhost:${process.env.PORT}`)
})
