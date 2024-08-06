import dotenv from "dotenv";
//dotenv, env import 
dotenv.config({ path: '.env'});

//Express

import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import methodOverride from 'method-override';
import session from 'express-session';

import authRouter from './controllers/auth.js';

const app = express();


const port = process.env.PORT || "2000";

mongoose.connect(process.env.MONGODB_URL);

mongoose.connection.on("connected", () =>{
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
})

//use dev
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(methodOverride("_method"));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}))


// set view engine to ejs
app.set('view engine', 'ejs');



app.get('/', (req, res) => {
    res.render("index.ejs", {
        user: req.session.user
    })
});


app.get('/guardian', async (req, res) =>{
    res.render("2index");
});

app.use('/guardian', authRouter)

app.listen(2000, () => {
    console.log("Listening on port 2000");
  });

