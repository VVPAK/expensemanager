const express = require(`express`);
const router = express.Router();
const UserModel = require('../models/user');
const log = require('../libs/log')(module);

router.get('/', (req, res) => {
    res.send('asd');
});

router.post('/', (req, res) => {
    var newUser = new UserModel({ username: req.body.username, password: req.body.password });
    newUser.save(function(error, user) {
        if(error) {
            log.error(error);
            res.statusCode = 500;
            return res.send({ error: error });
        }
        else {
            log.info("New user - %s:%s",user.username,user.password);
            res.statusCode = 201;
            return res.end();
        }
    });
});

module.exports = router;