var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Comment = require('../modules/Comment');
var bcrypt = require('bcrypt');
var articleSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, require: true },
    likes: { type: Number,default:0 },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    author: String,
    slug: String,
  },
  { timestamps: true }
);

articleSchema.pre('save', function (next) {
  (this.slug = this.title),
    (this.slug = this.title.toLowerCase().split(' ').join('-'));
  next();
});
module.exports = mongoose.model('Article', articleSchema);
