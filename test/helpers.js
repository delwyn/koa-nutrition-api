var db = require('../app/db');
var setup = module.exports = {};
var foodsCollection = db.get('foods');

var foodFixtures = [{ name: 'Tests' }, { name: 'Blah' }];

setup.resetDB = function *() {
  yield foodsCollection.remove({});
  yield foodsCollection.insert(foodFixtures);
}
