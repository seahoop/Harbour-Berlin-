import express from "express";
import bcrypt from 'bcrypt';
import User from '../models/user.js';

const authRouter = express.Router();

authRouter.get('/sign-up', (req, res) => {
    res.render('guardian/sign-up.ejs');
});

authRouter.get('/sign-in', (req, res) => {
    res.render('guardian/sign-in.ejs');
});

authRouter.get('/sign-out', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return err
        }
        res.clearCookie('connect.sid');
        res.redirect('/guardian');
    });
});

authRouter.post('/sign-up', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });

        if (user) {
            return res.send('User already exists');
        }

        if (req.body.password !== req.body.confirmPassword) {
            return res.send('Password does not match Confirm Password');
        }

        const hashedPassword = bcrypt.hashSync(req.body.password, 10);
        req.body.password = hashedPassword;

        const newUser = await User.create(req.body);

        if (newUser) {
            res.redirect('/guardian/sign-in');
        } else {
            res.send('Error creating a user.');
        }
    } catch (error) {
        console.error('Error during sign-up:', error);
        res.send('Error during sign-up.');
    }
});



authRouter.post('/new', async (req, res) => {
    try {
        const { name, weapon, defenseSystem, version, cyberSecurityVersion, aiHaboOperated } = req.body;

        const newUser = new User({
            name,
            weapon,
            defenseSystem,
            version,
            cyberSecurityVersion,
            aiHaboOperated: aiHaboOperated === 'on',
            isReadyforManagement: req.body.isReadyforManagement === 'on'
        });

        await newUser.save();

        req.session.user = {
            name: newUser.name,
        };

        res.redirect('/');
    } catch (error) {
        console.error('Error during registration:', error);
        res.send('Error during registration.');
    }
});




//for management system new guardian registration
const index = async (req, res) => {
    res.render("management/new");
};

export { index };
export default authRouter;
