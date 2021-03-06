const express = require('express');
const router = express.Router();
const { resort } = require('../database/models');

router.get('/', async function(req, res, next) {
  let data;

  if (req.url !== '/') {
    data = await resort.getPartResort(req.query);
  } else {
    data = await resort.getAllResort();
  }

  res.json({ result: data ? 'success' : 'fail', data });
});

module.exports = router;
