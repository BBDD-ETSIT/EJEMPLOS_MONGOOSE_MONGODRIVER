var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  phone: {
    type: String,
    validate: {
      validator: function(v) {
        return /\d{3}-\d{3}-\d{4}/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    },
    required: [true, 'User phone number required']
  }
});

var User = mongoose.model('user', userSchema);
var user = new User();
user.phone = '555.01';
var error = user.validateSync();
console.log(error.errors['phone'].message) //'555.01 is not a valid phone number!
