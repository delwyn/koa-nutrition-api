'use strict';

var app    = require('../server')
var router = require('koa-route');
var foods  = require('./controllers/foods');

app.use(router.get('/api/foods', foods.list));
