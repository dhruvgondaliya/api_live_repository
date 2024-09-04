const express = require('express');
const router = express.Router();

const { 
    signUp,
    login
} = require('../controllers/adminController');

const { authMiddleware } = require('../middleware/AdminAuthMiddleware')

router.post('/signup', signUp);
router.post('/login', login);

module.exports = router