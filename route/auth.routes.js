const express = require('express');
const router = express.Router();
const authControllers = require('../controllers/authControllers');
const { checkToken } = require('../middlewares/checkToken');

router.post('/register', authControllers.register);
router.post('/login', authControllers.login);
router.get('/authenticate', checkToken, authControllers.authenticate);

module.exports = router;