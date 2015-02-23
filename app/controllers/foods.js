'use strict';

var db = require('../db');

var route = module.exports = {};
var foods = db.get('foods');

route.list = function *(next) {
  var self    = this;
  var query   = this.request.query;
  var where   = {};
  var options = { limit : 25, sort : { name : 1 } }

  if (query.name) where.name = new RegExp(query.name, 'i');

  yield foods.find(where, options, function(err, foods) {
    self.body = {
      foods: foods
    };
  });

  yield next;
};
