const express = require('express');
const { singup, signin, updateProfile, getUserById, getUserByEmail } = require('../controllers/user.controllers');

const router = express.Router();

router.post('/signup', singup);
router.post('/signin', signin);
router.put('/update-profile', updateProfile);
router.get('/user/:userId', getUserById);
router.get('/user-by-email/:email', getUserByEmail);

module.exports = router; 