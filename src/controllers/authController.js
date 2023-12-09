// controllers/authController.js

const User = require('../models/User');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const authController = {
    getLogin: async (req, res) => {
        // Redirect to the dashboard if already logged in
        if (req.session.isLoggedIn) {
            return res.redirect('/dashboard');
        }
        const query = req.query
        res.render('login-register', query);
    },

    postLogin: async (req, res) => {
        const {email, password} = req.body;

        try {
            const user = await User.findOne({email});

            if (!user) {
                return res.render('login-register', {error: 'Invalid email or password'});
            }

            const passwordMatch = await bcrypt.compare(password, user.password);
            console.log(passwordMatch);

            if (!passwordMatch) {
                return res.render('login-register', {error: 'Invalid email or password'});
            }

            req.session.isLoggedIn = true;
            req.session.userId = user._id; // Store the user ID in the session
            res.redirect('/dashboard');
        } catch (error) {
            console.error(error);
            res.render('login-register', {error: 'An error occurred'});
        }
    },

    getRegister: (req, res) => {
        // Redirect to the dashboard if already logged in
        if (req.session.isLoggedIn) {
            return res.redirect('/dashboard');
        }
        res.render('login-register');
    },

    postRegister: async (req, res) => {
        const {firstName, lastName, email, password} = req.body;

        try {
            const existingUser = await User.findOne({email});

            if (existingUser) {
                throw 'Email already registered';
            }
            if (firstName === '') {
                throw "First Name field is required!";
            }
            if (lastName === '') {
                throw "Last Name field is required!";
            }
            if (email === '') {
                throw "Email field is required!";
            }
            if (password === '') {
                throw "Password field is required!";
            }

            const hashedPassword = await bcrypt.hash(password, saltRounds);

            const newUser = new User({
                firstName,
                lastName,
                email,
                password: hashedPassword
            });

            await newUser.save();

            res.render('login-register', {success: "Registration successful! You can now log in."});
        } catch (error) {
            console.log(error);
            res.render('login-register', {
                error,
                firstName,
                lastName,
                email,
            });
        }
    },

    getDashboard: async (req, res) => {
        try {

            const user = await User.findById(req.session.userId); // Fetch user data based on the stored user ID

            if (!user) {
                return res.redirect('/login'); // Redirect to login if user data is not found
            }

            res.render('dashboard', {user});
        } catch (error) {
            console.error(error);
            res.render('login-register', {error: 'An error occurred'});
        }
    },

    logout: (req, res) => {
        req.session.destroy();
        res.redirect('/login?logout=1');
    }
};

module.exports = authController;
