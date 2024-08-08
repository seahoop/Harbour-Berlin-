import dotenv from "dotenv";
dotenv.config({ path: '.env' });

import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import methodOverride from 'method-override';
import session from 'express-session';
import Management from './models/management.js'; 
import authRouter from './controllers/auth.js';

const app = express();
const port = process.env.PORT || 2000;

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(morgan('dev'));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}));

mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('Error connecting to MongoDB:', error));

mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render("index.ejs", { user: req.session.user });
});

app.get('/guardian', async (req, res) => {
    res.render("2index");
});

app.get('/management', async (req, res) => {
    try {
        const management = await Management.find({});
        res.render("management/index", { management });
    } catch (error) {
        console.error('Error fetching management data:', error);
        res.send('Error fetching management data.');
    }
});

app.get('/management/new', async (req, res) => {
    res.render("management/new");
});

// Add this route to handle displaying individual management items
app.get('/management/show', async (req, res) => {
    try {
        const management = await Management.find({});
        res.render("management/show", { management });
    } catch (error) {
        console.error('Error fetching management data:', error);
        res.send('Error fetching management data.');
    }
});

app.get('/management/:managementId', async(req, res) =>{
    const foundManagement = await Management.findById(req.params.managementId);
    res.render('management/show2', {management: foundManagement});
});

//for editing below 
app.get('/management/:managementId/edit', async(req, res) =>{
    const foundManagement = await Management.findById(req.params.managementId);
    res.render("management/edit", { management: foundManagement });
});

//delete guardian function below 
app.delete("/management/:managementId", async(req, res) =>{
    await Management.findByIdAndDelete(req.params.managementId);
    res.redirect('/management/show')
})

//for update guardian
app.put("/management/:managementId", async (req, res) =>{
    try {
        const {name, weapon, defenseSystem, version, cyberSecurityVersion, aiHaboOperated } = req.body;
        const updateManagement = {
            name,
            weapon,
            defenseSystem,
            version,
            cyberSecurityVersion,
            aiHaboOperated: aiHaboOperated === 'on'
        };
    
    await Management.findByIdAndUpdate(req.params.managementId, req.body);
    res.redirect(`/management/${req.params.managementId}`);
    } catch (error) {
        console.error('Error updating management data:', error);
        res.send('Error updating management data.');
    }
});

//
app.post('/management/new', async (req, res) => {
    try {
        const { name, weapon, defenseSystem, version, cyberSecurityVersion, aiHaboOperated } = req.body;
        const newManagement = new Management({
            name,
            weapon,
            defenseSystem,
            version,
            cyberSecurityVersion,
            aiHaboOperated: aiHaboOperated === 'on'
        });

        await newManagement.save();
        res.redirect('/');
    } catch (error) {
        console.error('Error during registration:', error);
        res.send('Error during registration.');
    }
});

app.use('/guardian', authRouter);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});