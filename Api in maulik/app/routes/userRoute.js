const express = require('express');
const router = express.Router();

const { 
    signUp,
    login,
    changePassword,
    productAdd,
    getProduct,
    productUpdate,
    productDelete,
    homeScreen,
    details,
    cart
} = require('../controllers/userController');

const { authMiddleware } = require('../middleware/AdminAuthMiddleware');

router.post('/signup', signUp);
router.post('/login', login);
router.put('/change-password', authMiddleware, changePassword);
router.post('/add-product', authMiddleware, productAdd);
router.get("/get-product", authMiddleware, getProduct);
router.put('/update-product/:id', authMiddleware, productUpdate);
router.delete('/delete-product/:id', authMiddleware, productDelete)
router.post('/home-screen',authMiddleware, homeScreen);
router.post('/details/:id', authMiddleware, details);
router.post('/cart', authMiddleware, cart)

module.exports = router