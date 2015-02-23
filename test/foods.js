var app     = require('../server.js');
var request = require('co-supertest').agent(app.listen());
var expect  = require('chai').expect;
var helpers = require('./helpers');

describe('GET /foods', function() {
  beforeEach(function *() {
    yield helpers.resetDB();
  });

  it('should return a list of foods', function *() {
    var res = yield request.get('/api/foods').expect(200).end();
    var foods = res.body.foods;

    expect(foods).to.be.a('array');
    expect(foods[0]).to.be.a('object');
  });
});
