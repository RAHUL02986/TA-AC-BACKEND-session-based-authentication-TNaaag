var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bcrypt = require('bcrypt');
var userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, minlength: 5, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (this.password && this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
    return next();
  }
});
userSchema.methods.verifyPassword = function (password, cb) {
    bcrypt.compare(password, this.password, (err, result) => {
      return cb(err, result);
    });
  };
  
module.exports = mongoose.model('User', userSchema);
