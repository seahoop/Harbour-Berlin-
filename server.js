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
app.use('/css', express.static('css'));
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
    // Grab userId from the session token
    const userId = req.session.user._id;

    try {
        const { name, weapon, defenseSystem, version, cyberSecurityVersion, aiHaboOperated } = req.body;
        const newManagement = new Management({
            name,
            weapon,
            defenseSystem,
            version,
            cyberSecurityVersion,
            aiHaboOperated: aiHaboOperated === 'on',
            userId // Add user ID here
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
    console.log(`Server is listening on port ${port}`);
});



/*

import dotenv from "dotenv";
import axios from "axios";
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import methodOverride from "method-override";
import session from "express-session";
import Management from "./models/management.js";
import authRouter from "./controllers/auth.js";

dotenv.config({ path: ".env" });

const app = express();
const port = process.env.PORT || 2000;

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(morgan("dev"));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Error connecting to MongoDB:", error));

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.set("view engine", "ejs");

// Route for the home page
/*app.get("/", (req, res) => {
  res.render("index.ejs", { user: req.session.user });
});

app.get('/guardian', async (req, res) => {
    res.render("2index");
});

app.get('/', async (req, res) => {
    try {
        // Call OpenAI API or use a placeholder response if not needed
        const aiResponse = await testOpenAI(); // You can remove or modify this line if not needed
        
        res.render("index.ejs", { 
            user: req.session.user,
            aiResponse: aiResponse || "No AI response available." // Handle undefined cases
        });
    } catch (error) {
        console.error('Error fetching AI response:', error);
        res.render("index.ejs", { 
            user: req.session.user, 
            aiResponse: "Error fetching AI response."
        });
    }
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

// Route for OpenAI API call and management page rendering
app.get("/management", async (req, res) => {
  try {
    const management = await Management.find({});

    // Call OpenAI API
    const openAIResponse = await testOpenAI();

    res.render("management/index", {
      management,
      aiResponse: openAIResponse,
    });
  } catch (error) {
    console.error("Error fetching management data or OpenAI response:", error);
    res.send("Error fetching management data or OpenAI response.");
  }
});

// Other routes...
// (the rest of your routes, like /management/new, /management/:managementId, etc.)

app.use("/guardian", authRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// OpenAI API function
async function testOpenAI() {
  let retryCount = 0;
  const maxRetries = 10;
  const initialDelay = 60 * 1000; // 60-second delay
  const delayFactor = 2; // Exponential backoff

  while (retryCount < maxRetries) {
    try {
      console.log("Attempting to make a request to OpenAI...");

      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4",
          messages: [{ role: "user", content: "Berlin crimes" }],
          temperature: 0,
          max_tokens: 1000,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          }
        }
      );

      console.log("Response received:", response.data.choices[0].message.content);
      return response.data.choices[0].message.content; // Return the response content
    } catch (err) {
      if (err.response && err.response.status === 429) {
        retryCount++;
        const delay = initialDelay * Math.pow(delayFactor, retryCount - 1);
        console.log(`Rate limit exceeded. Retrying in ${delay / 1000} seconds...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
      } else {
        console.error("Error:", err.message);
        break; // Exit loop if other error
      }
    }
  }
}

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
*/