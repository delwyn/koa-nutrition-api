'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var koa  = require('koa');
var json = require('koa-json');
var app  = module.exports = koa();

var config = require('./config');

app.use(function *(next) {
  var start = new Date;
  yield next;
  var ms = new Date - start;

  // console.log(`${this.request.method}: ${this.request.url} [${ms}ms]`)
  // console.log('Query: ', this.request.query);
});

require('./app/routes');

app.use(json());

if (!module.parent) {
  app.listen(config.port, config.host, function() {
    console.log(`Server running on ${config.host}:${config.port}`);
  });
}
