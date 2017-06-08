const express = require(`express`);
const router = express.Router();
const UserModel = require('../models/user');
const log = require('../libs/log')(module);

router.get('/', (req, res) => {
    res.send('asd');
});

router.post('/', (req, res) => {
    var newUser = new UserModel({ username: req.body.username, password: req.body.password, role: "User" });
    newUser.save(function(error, user) {
        if(error) {
            log.error(error);
            return res.status(500).send(error);
        }
        else {
            log.info("New user - %s:%s",user.username,user.password);
            return res.status(204).end();
        }
    });
});

module.exports = router;