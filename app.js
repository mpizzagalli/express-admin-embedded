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
    "port": process.env.PORT
  },
  "app": {
    "layouts": true,
    "themes": true,
    "languages": true,
    "root": "/admin"
  }
};
//
// const users = {
//   "admin": {
//     "name": "admin",
//     "admin": true,
//     "salt": process.env.API_SALT,
//     "hash": process.env.ADMIN_HASH
//   }
// }

const adminConfig = {
    dpath: './project/',
    config: asd,
    settings: require('./project/settings.json'),
    custom: require('./project/custom.json'),
    users: require('./project/users.json')
};

console.log(asd);
console.log('Starting admin');

// xAdmin.init(adminConfig, function (err, admin) {
  console.log('Admin started');
  // if (err) return console.log(err);
  // web site
  // console.log(admin);
  console.log('Starting express app');
  var app = express();
  // mount express-admin before any other middlewares
  // app.use('/admin', admin);
  // site specific middlewares
  // Client must send "Content-Type: application/json" header
  app.use(bodyParser.json(bodyParserJsonConfig()));
  app.use(bodyParser.urlencoded(bodyParserUrlencodedConfig()));
  // site routes
  app.get('/', function (req, res) {
      res.send('Hello World');
  });
  // site server
  const port = process.env.PORT || 3000;
  console.log('Port ', port);
  app.listen(port, function () {
      console.log(`My awesome site listening on port ${port}`);
  });
// });
