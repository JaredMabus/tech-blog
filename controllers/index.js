const router = require('express').Router();
const auth = require('../utils/auth')

const apiRoutes = require("./api");
const homeRoutes = require('./homeRoutes');
const dashRoutes = require('./dashRoutes');


router.use('/api', apiRoutes);
router.use('/dashboard', auth, dashRoutes);
router.use('/', auth, homeRoutes);


module.exports = router;
