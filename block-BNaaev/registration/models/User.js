var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var salt = 10;
var userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true },
    password: { type: String, required: true },
    age: Number,
    phone: Number,
  },
  { timestamps: true }
);

//custom preSave hook
userSchema.pre('save', function (next) {
  console.log(this);
  next();
  // if (this.password && this.isModified('password')) {
  //   try {
  //     var hashed = bcrypt.hash(this.password, 10);
  //     this.password = hashed;
  //     return next();
  //   } catch (error) {
  //     res.json({ message: error.message });
  //     next();
  //   }
  // }
});

module.exports = mongoose.model('User', userSchema);
