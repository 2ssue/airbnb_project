const express = require('express');
const router = express.Router();
const { resort } = require('../database/models');
const { verifyUser } = require('../auth/auth');

router.use(verifyUser);

router.get('/', async function(req, res, next){
    res.json(await resort.getAllResort());
})

module.exports = router;