import dotenv from "dotenv";
//dotenv, env import 
dotenv.config({ path: '.env'});

//Express
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';


const app = express();

//use dev
app.use(morgan('dev'));


// set view engine to ejs
app.set('view engine', 'ejs');



app.get('/', (req, res) => {
    res.render("index");
});

app.get('/guardian', async (req, res) =>{
    res.render("guardian/index");
});


app.listen(2000, () => {
    console.log("Listening on port 2000");
  });

