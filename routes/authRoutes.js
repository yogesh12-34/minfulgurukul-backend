const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/authController');
const checkAuth = require('../middlewares/checkAuth');

router.post('/signup', signup);
router.post('/login', login);
router.get('/checkAuth', checkAuth, async (req, res) => res.status(200).json({
    message: 'Authorized'
}))

module.exports = router;
