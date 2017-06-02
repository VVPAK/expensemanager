const express = require(`express`);
const router = express.Router();
const log                 = require('../libs/log')(module);
const mongoose            = require('../libs/mongoose').mongoose;
const UserModel           = require('../libs/mongoose').UserModel;
const ClientModel         = require('../libs/mongoose').ClientModel;
const AccessTokenModel    = require('../libs/mongoose').AccessTokenModel;
const RefreshTokenModel   = require('../libs/mongoose').RefreshTokenModel;
const faker               = require('Faker');


router.get('/', (req, res) => {
    UserModel.remove({}, function(err) {
        var user = new UserModel({ username: "vvpak", password: "simplepassword" });
        user.save(function(err, user) {
            if(err) return log.error(err);
            else log.info("New user - %s:%s",user.username,user.password);
        });

        for(i=0; i<4; i++) {
            var user = new UserModel({ username: faker.name.findName().toLowerCase(), password: "qwe" });
            user.save(function(err, user) {
                if(err) return log.error(err);
                else log.info("New user - %s:%s",user.username,user.password);
            });
        }
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