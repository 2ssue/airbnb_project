const express = require('express');
const router = express.Router();
const { user } = require('../database/models');
const auth = require('../auth/auth');

router.post('/user/login', async function(req, res, next){
    const { userId, password } = req.body;
    const userData = await user.findOne({ where: { userid: userId, password }});

    if(userData){
        const token = auth.issueToken(userData);
        res.cookie('user', token);
        res.json({ result: 'success', token });
    }else{
        res.json({ result: 'fail' });
    }
})

router.post('/', async function(req, res, next){
    const { userId, password, name } = req.body;
    const result = await user.findOrCreate( { where: { userid: userId, password, name }});

    res.json({ result: result[1] ? 'success': 'fail' });
})

router.get('/:userid', async function(req, res, next){
    const userId = req.url.split('/').pop();
    const result = await user.findOne({ where: { userid: userId }});
    
    res.json({ result: result ? 'found':'not-found' });
})

module.exports = router;