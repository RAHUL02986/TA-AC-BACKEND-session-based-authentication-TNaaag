var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

var adminSchema = new Schema(
  {
    name: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

adminSchema.pre('save', async function (next) {
  if (this.password && this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
    next();
  }
});
adminSchema.methods.verifyPassword = function (password, cb) {
  bcrypt.compare(password, this.password, (err, result) => {
    return cb(err, result);
  });
};

module.exports = mongoose.model('Admin', adminSchema);
