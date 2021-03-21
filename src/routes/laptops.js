const {Router} = require('express');
const router = Router();
const {validateToken} = require('../controllers/token');
const {get, add} = require('../controllers/laptops');

router.put('/', validateToken, get);

router.post('/', validateToken, add);

module.exports = router;