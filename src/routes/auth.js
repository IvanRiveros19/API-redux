const {Router} = require('express');
const router = Router();
const {login} = require('../controllers/auth');

router.put('/',login);

module.exports = router;