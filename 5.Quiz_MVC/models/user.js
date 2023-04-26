var crypto = require('crypto');
var key = process.env.PASSWORD_ENCRYPTION_KEY || "asdfghjklzxcvbnmqwertyuiop";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  hashed_password: {
    type: String,
    required: true,
    trim: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  created: {
    type: Date,
    default: Date.now,
    required: true
  },
  updated:  {
    type: Date,
    default: Date.now,
    required: true
  }
});


User.virtual('password')
  .set(function(password) {
    this._password = password;
    this.hashed_password = crypto.createHmac('sha1', key).update(password).digest('hex');
  })
  .get(function() { return this._password });


User.methods = {

  verifyPassword: function (plainText) {
    console.log("verificando password");
    return crypto.createHmac('sha1', key).update(plainText).digest('hex') === this.hashed_password;
  }
}

module.exports = User;