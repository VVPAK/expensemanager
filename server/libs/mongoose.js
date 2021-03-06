const mongoose = require('mongoose');
const log = require('./log')(module);
const config = require('config');

//connecting models
const Article = require('../models/article');
const User = require('../models/user');
const AccessToken = require('../models/accessToken');
const RefreshToken = require('../models/refreshToken');
const Client = require('../models/client');

//connection db
mongoose.connect(config.get('mongoose.uri'));

const db = mongoose.connection;

db.on('error', function(err){
    log.error('Connection error:', err.message);
});

db.once('open', function callback (){
    log.info('Connected to db');
});