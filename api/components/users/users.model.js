var mongoose = require('mongoose');

var roles = ['admin','assistant','teacher','student'],
    states = ['activo','inactivo','banned'];

var UserSchema = new mongoose.Schema({
  id :            {type: String, required: true, unique: true, minlength:9,maxlength:13},
  name:           {type: String, required: true},
  surName:        {type: String, required: false},
  firstName:      {type: String, required: true},
  lastName:       {type: String, required: false},
  genre:          {type: String, required: true},
  birthday:       {type: Date, required: true},
  nationality:    {type: String, required: true},
  phone:          {type: String, required: true},
  email:          {type: String, required: true},
  photo:          {type: String, required: true},
  status:         {type: String, required: false},
  role:           {type: String, required: true},
  weight:         {type: String, required: false},
  height:         {type: String, required: false},
  academy:        {type: String, required: false},
  teacher:        {type: String, required: false},
  belt:           {type: String, required: false},
  category:       {type: String, required: false},
  tournaments:    {type: String, required: false},
  tournamentsWins:{type: String, required: false},
  password:       {type: String, required: true},
  newUser:        {type: Number, required: true}
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
