var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  age: Number,
  password: { type: String, min: 5, required: true },
});

userSchema.pre('save', async function (next) {
  if (this.password && this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
    //  console.log('Hased  password is :'+this.password);
    return next();
  }
  next();
});

var User = mongoose.model('User', userSchema);
module.exports = User;
