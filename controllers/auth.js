/*import express from "express";
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
            return res.send('Error during sign-out.');
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
            return res.send('User does not exist or incorrect credentials.');
        }

        const validPassword = bcrypt.compareSync(req.body.password, user.password);
        if (!validPassword) {
            return res.send('Incorrect password.');
        }

        req.session.user = {
            username: user.username
        };

        res.redirect('/');
    } catch (error) {
        console.error('Error during sign-in:', error);
        res.send('Error during sign-in.');
    }
});

// for management system new guardian registration
const index = async (req, res) => {
    res.render("management/new");
};

export { index };
export default authRouter;
*/



import express from "express";
import bcrypt from 'bcrypt';
import User from '../models/user.js';

const authRouter = express.Router();

// Render the single authentication page
authRouter.get('/', (req, res) => {
    res.render('guardian/auth.ejs', { user: req.session.user });
});
//sign up below 
authRouter.get('/sign-up', (req, res) => {
    res.render('guardian/sign-up.ejs');
});

// Handle sign-up form submission
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
            res.redirect('/guardian');
        } else {
            res.send('Error creating a user.');
        }
    } catch (error) {
        console.error('Error during sign-up:', error);
        res.send('Error during sign-up.');
    }
});

// Handle sign-in form submission
authRouter.post('/sign-in', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });

        if (!user) {
            return res.send('User does not exist or incorrect credentials.');
        }

        const validPassword = bcrypt.compareSync(req.body.password, user.password);
        if (!validPassword) {
            return res.send('Incorrect password.');
        }

        req.session.user = {
            username: user.username
        };

        res.redirect('/');
    } catch (error) {
        console.error('Error during sign-in:', error);
        res.send('Error during sign-in.');
    }
});

// Handle sign-out
authRouter.get('/sign-out', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.send('Error during sign-out.');
        }
        res.clearCookie('connect.sid');
        res.redirect('/guardian');
    });
});

authRouter.get('/sign-in', (req, res) => {
    res.render('guardian/sign-in.ejs');
});

export default authRouter;




/*import express from "express";
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
            return res.send('Error during sign-out.');
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
            return res.send('User does not exist or incorrect credentials.');
        }

        const validPassword = bcrypt.compareSync(req.body.password, user.password);
        if (!validPassword) {
            return res.send('Incorrect password.');
        }

        req.session.user = {
            username: user.username
        };

        res.redirect('/');
    } catch (error) {
        console.error('Error during sign-in:', error);
        res.send('Error during sign-in.');
    }
});

// for management system new guardian registration
const index = async (req, res) => {
    res.render("management/new");
};

export { index };
export default authRouter;
*/