const express = require('express');
const router = express.Router();
const { user } = require('../database/models');
const auth = require('../auth/auth');

router.post('/user/login', async function(req, res, next){
    const userName = await user.findUser(req.body);

    if(!userName){
        res.json({ result: 'fail' });
        return;
    }

    const token = auth.issueToken(userName);
    
    res.cookie('user', token);
    res.json({ result: 'success', token });
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