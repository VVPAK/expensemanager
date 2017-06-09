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
        var admin = new UserModel({ username: "admin", password: "023023", role: "Admin", name: { first: 'admin', last: 'admin' } });
        admin.save(function(err, user) {
            if(err) return log.error(err);
            else log.info("New user - %s:%s",user.username,user.password);
        });

        var user = new UserModel({ username: "vvpak", password: "023023", role: "User", name: { first: 'Vyacheslav', last: 'Pak' } } );
        user.save(function(err, user) {
            if(err) return log.error(err);
            else log.info("New user - %s:%s",user.username,user.password);
        }); 
    });

    ClientModel.remove({}, function(err) {
        var client = new ClientModel({ name: "Postman test client", clientId: "test1", clientSecret:"023023" });
        client.save(function(err, client) {
            if(err) return log.error(err);
            else log.info("New client - %s:%s",client.clientId,client.clientSecret);
        });
        var client = new ClientModel({ name: "Angular client", clientId: "web", clientSecret:"verystrongpassword" });
        client.save(function(err, client) {
            if(err) return log.error(err);
            else log.info("New client - %s:%s",client.clientId,client.clientSecret);
        });
        var client = new ClientModel({ name: "iOS mobile client", clientId: "iOS", clientSecret:"verystrongpassword" });
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