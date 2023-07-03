// routes/authRoutes.js

const express = require('express');
const router = express.Router();
const {
	getLogin,
	postLogin,
	getRegister,
	postRegister,
	getDashboard,
	logout,
} = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', getLogin);
router.route('/login').get(getLogin).post(postLogin);
router.route('/register').get(getRegister).post(postRegister);
router.get('/dashboard', authMiddleware, getDashboard);
router.get('/logout', logout);

module.exports = router;