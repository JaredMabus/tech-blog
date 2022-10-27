const router = require('express').Router();
const homeRoutes = require('./homeRoutes');
const apiRoutes = require("./api");
const auth = require('../utils/auth')

router.use('/', auth, homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;
