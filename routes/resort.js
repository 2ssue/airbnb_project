const express = require('express');
const router = express.Router();
const { resort } = require('../database/models');
const { verifyUser } = require('../auth/auth');

router.use(verifyUser);

router.get('/', async function(req, res, next){
    let data;
    if(req.query){
        data = await resort.getPartResort(req.query);
    }else{
        data = await resort.getAllResort();
    }

    res.json({ result: data ? "success" : "fail", data });
})

module.exports = router;