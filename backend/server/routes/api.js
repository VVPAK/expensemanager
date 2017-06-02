const express = require('express');
const router = express.Router();
const articles = require('./articles');

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('Api works');
});

router.use('/articles', articles);

module.exports = router;
