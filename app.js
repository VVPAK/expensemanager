// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const log = require('./server/libs/log')(module);
const config = require('config');
const oauth2 = require('./server/libs/auth/oauth2');
const passport = require('passport');

// Get routes
const api = require('./server/routes/api');
const init = require('./server/routes/init');
const expenses = require('./server/routes/expenses');

//App
const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

app.use(passport.initialize());

require('./server/libs/auth/auth');

app.post('/oauth/token', oauth2.token);

// Set routes
app.use('/api', api);
app.use('/init', init);

//Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

var port = config.get('port');
//app.set('port', port);

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(process.env.PORT || port, () => 
{
  log.info(`Express server listening on port ${port}`);
});