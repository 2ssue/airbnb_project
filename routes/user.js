const express = require('express');
const router = express.Router();
const { user } = require('../database/models');
const auth = require('../auth/auth');

router.post('/user/login', async function(req, res, next){
    const { userId, password } = req.body;
    const userData = await user.findOne({ where: {
        userid: userId,
        password: password
    } });

    if(userData){
        const token = auth.issueToken(userData);
        res.cookie('user', token);
        res.json({ result: 'success', token });
    }else{
        res.json({ result: 'fail' });
    }
})

module.exports = router;