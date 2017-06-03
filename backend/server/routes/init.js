const express = require(`express`);
const router = express.Router();
const log                 = require('../libs/log')(module);
const UserModel           = require('../models/user');
const ClientModel         = require('../models/client');
const AccessTokenModel    = require('../models/accessToken');
const RefreshTokenModel   = require('../models/refreshToken');
const faker               = require('Faker');

router.get('/', (req, res) => {
    UserModel.remove({}, function(err) {
        var admin = new UserModel({ username: "admin", password: "023023" });
        admin.save(function(err, user) {
            if(err) return log.error(err);
            else log.info("New user - %s:%s",user.username,user.password);
        });

        var user = new UserModel({ username: "vvpak", password: "023023" });
        user.save(function(err, user) {
            if(err) return log.error(err);
            else log.info("New user - %s:%s",user.username,user.password);
        }); 
    });

    ClientModel.remove({}, function(err) {
        var client = new ClientModel({ name: "OurService iOS client v1", clientId: "mobileV1", clientSecret:"abc123456" });
        client.save(function(err, client) {
            if(err) return log.error(err);
            else log.info("New client - %s:%s",client.clientId,client.clientSecret);
        });
    });

    AccessTokenModel.remove({}, function (err) {
        if (err) return log.error(err);
    });
    
    RefreshTokenModel.remove({}, function (err) {
        if (err) return log.error(err);
    });

    res.send('Ok');
});

module.exports = router;