const express = require('express');
const router = express.Router();
const articles = require('./articles');
const expenses = require('./expenses');
const users = require('./users');
/* GET api listing. */
router.get('/', (req, res) => {
  res.send('Api works');
});

router.use('/articles', articles);
router.use('/expenses', expenses);
router.use('/users', users);


module.exports = router;
