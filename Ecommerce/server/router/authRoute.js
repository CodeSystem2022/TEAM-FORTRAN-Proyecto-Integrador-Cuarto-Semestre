const express = require('express');
const router = express.Router();
const {createUser, loginUserControl} = require('../controllers/userController');


router.post('/register', createUser);

router.post('/login', loginUserControl);

module.exports = router;