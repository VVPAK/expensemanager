const express = require('express');
const router = express.Router();
const articles = require('./articles');
const expenses = require('./expenses');

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('Api works');
});

router.use('/articles', articles);
router.use('/expenses', expenses);

module.exports = router;
