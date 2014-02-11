var express = require('express');
var Habitat = require('habitat');
var WebmakerLogin = require('../webmaker-login');

Habitat.load();

var env = new Habitat();
var app = express();
var login = new WebmakerLogin({
  loginURL: env.get('LOGIN_URL'),
  secretKey: env.get('SECRET_KEY')
});

app.use(express.logger('dev'));
app.use(express.compress());
app.use(express.json());
app.use(express.urlencoded());

app.use(login.cookieParser());
app.use(login.cookieSession());

app.use(express.static('./example'));

app.post('/verify', login.handlers.verify);
app.post('/authenticate', login.handlers.authenticate);
app.post('/create', login.handlers.create);

app.listen(env.get('PORT'), function() {
  console.log('App listening on ' + env.get('PORT'));
});