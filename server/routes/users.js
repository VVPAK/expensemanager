const express = require(`express`);
const router = express.Router();
const UserModel = require('../models/user');
const log = require('../libs/log')(module);
const passport = require('passport');

router.get('/', passport.authenticate('bearer', { session: false }), function(req, res) {

    var role = req.user.role;

    if (role !== 'Admin') {
        return res.status(403).send({
            'status': 403,
            'code': 1, // custom code that makes sense for your application
            'message': 'You are not admin',
            'moreInfo': ''
        });
    }

    return UserModel.find(function(err, users) {
        if (!err) {
            res.send(users);
        } else {
            log.error(err);
            res.status(500).send(err);
        }
    });
});

router.get('/:id', passport.authenticate('bearer', { session: false }), function(req, res) {
    return UserModel.findById(req.params.id, function(err, user) {
        if (!user) {
            res.send(404, {
            'status': 404,
            'code': 4, // custom code that makes sense for your application
            'message': 'User not found',
            'moreInfo': ''
            })
        }
        if (!err) {
            return res.send(200, user);
        } else {
            log.error('Internal error(%d): %s',res.statusCode, err.message);
            return res.send(500, { error: 'Server error' });
        }
    });
});

router.post('/', (req, res) => {
    var newUser = new UserModel({ 
        username: req.body.username.toLowerCase(), 
        password: req.body.password, 
        name: {
            first: req.body.name.first,
            last: req.body.name.last
        },
        role: "User" });
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