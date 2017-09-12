const express = require('express'),
  bodyParser = require('body-parser'),
  xAdmin = require('express-admin'),
  pg = require('pg'),
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

const asd = {
  "pg": {
    "user": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "host": process.env.DB_HOST,
    "port": process.env.DB_PORT,
    "database": process.env.DB_NAME,
    "schema": process.env.DB_SCHEMA || 'public',
    "ssl": true
  },
  "server": {
    "port": 3000
  },
  "app": {
    "layouts": true,
    "themes": true,
    "languages": true,
    "root": "/admin"
  }
};

const users = {
  "admin": {
    "name": "admin",
    "admin": true,
    "salt": process.env.API_SALT,
    "hash": process.env.ADMIN_HASH
  }
}

const adminConfig = {
    dpath: './project/',
    config: asd,
    settings: require('./project/settings.json'),
    custom: require('./project/custom.json'),
    users: require('./project/users.json')
};

const transactionsAdminConfig = {
    dpath: './transactionsApi/',
    config: require('./transactionsApi/config.json'),
    settings: require('./transactionsApi/settings.json'),
    custom: require('./transactionsApi/custom.json'),
    users: require('./transactionsApi/users.json')
};

xAdmin.init(adminConfig, function (err, admin) {
    if (err) return console.log(err);
    xAdmin.init(transactionsAdminConfig, function (err2, adminTx) {
        if (err2) return console.log(err2);
        // web site
        // console.log(admin);
        var app = express();
        // mount express-admin before any other middlewares
        app.use('/admin', admin);
        app.use('/transactionsApi/admin', adminTx);
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
});
