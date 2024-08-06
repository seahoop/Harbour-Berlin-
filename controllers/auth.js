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

authRouter.post('/sign-in', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });

        if (!user) {
            return res.send('User either does not exist, or you have provided the wrong credentials');
        }

        const validPassword = bcrypt.compareSync(req.body.password, user.password);
        if (!validPassword) {
            return res.send('Error, the password is wrong!');
        }

        req.session.user = {
            username: user.username
        };

        res.redirect('/');
    } catch (error) {
        console.error('Was not able to sign in', error);
        res.send('Was not able to sign in.');
    }
});

export default authRouter;
