var mongoose = require('mongoose');

var roles = ['admin','assistant','teacher','student'],
    states = ['active','inactive','banned'];

var UserSchema = new mongoose.Schema({
  id :            {type: String, required: true, unique: true, minlength:9,maxlength:13},
  name:           {type: String, required: true},
  surName:        {type: String},
  firstName:      {type: String, required: true},
  lastName:       {type: String},
  genre:          {type: String, required: true},
  birthday:       {type: Date, required: true},
  nationality:    {type: String, required: true},
  phone:          {type: String, required: true},
  email:          {type: String, required: true},
  photo:          {type: String, required: true},
  status:         {type: String, required: true, em:states},
  role:           {type: String, required: true, em:roles },
  weight:         {type: String},
  height:         {type: String},
  attendAcademy:  {type: String},
  teacher:        {type: String},
  belt:           {type: String},
  category:       {type: String},
  tournaments:    {type: String},
  tournamentsWins:{type: String},
  password:       {type: String}
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