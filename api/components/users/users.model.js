var mongoose = require('mongoose');

var roles = ['admin','assistant','teacher','student'],
    states = ['active','inactive','banned'];

var UserSchema = new mongoose.Schema({
  // Aqui va el modelo de usuarios
});

module.exports = mongoose.model('users', UserSchema);


/* NO BORRAR
{
  "foo": 1,
  "v": 1,
  "unique": true,
  "key": {
    "email": 1
  },
  "name": "email_1",
  "ns": "db_fct.users",
  "background": true
}
*/