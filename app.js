const express = require('express'),
  bodyParser = require('body-parser'),
  xAdmin = require('express-admin');
  DEFAULT_BODY_SIZE_LIMIT = 1024 * 1024 * 10,
  DEFAULT_PARAMETER_LIMIT = 10000;

const bodyParserJsonConfig = () => ({
  parameterLimit: DEFAULT_PARAMETER_LIMIT,
  limit: DEFAULT_BODY_SIZE_LIMIT
});

const bodyParserUrlencodedConfig = () => ({
  extended: true,
  parameterLimit: DEFAULT_PARAMETER_LIMIT,
  limit: DEFAULT_BODY_SIZE_LIMIT
});

const adminConfig = {
    dpath: './project/',
    config: require('./project/config.json'),
    settings: require('./project/settings.json'),
    custom: require('./project/custom.json'),
    users: require('./project/users.json')
};


xAdmin.init(adminConfig, function (err, admin) {
    if (err) return console.log(err);
    // web site
    // console.log(admin);
    var app = express();
    // mount express-admin before any other middlewares
    app.use('/admin', admin);
    // site specific middlewares
    // Client must send "Content-Type: application/json" header
    app.use(bodyParser.json(bodyParserJsonConfig()));
    app.use(bodyParser.urlencoded(bodyParserUrlencodedConfig()));
    // site routes
    app.get('/', function (req, res) {
        res.send('Hello World');
    });
    // site server
    app.listen(3000, function () {
        console.log('My awesome site listening on port 3000');
    });
});
