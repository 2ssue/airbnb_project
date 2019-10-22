const express = require('express');
const router = express.Router();
const { user } = require('../database/models');
const auth = require('../auth/auth');

router.post('/user/login', async function(req, res, next) {
  const userName = await user.checkRightUser(req.body);

  if (!userName) {
    res.json({ result: 'fail' });
    return;
  }

  const token = auth.issueToken(userName);

  res.cookie('user', token);
  res.json({ result: 'success', token });
});

router.post('/', async function(req, res, next) {
  const result = await user.createUserIfNotExists(req.body);

  res.json({ result: result ? 'success' : 'fail' });
});

router.get('/:userid', async function(req, res, next) {
  const userId = req.url.split('/').pop();
  const result = await user.findUserById(userId);

  res.json({ result: result ? 'found' : 'not-found' });
});

module.exports = router;
