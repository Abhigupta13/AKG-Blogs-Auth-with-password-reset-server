const mongoose = require('mongoose');

const blogSchema = mongoose.Schema(
  {
    id: {
      type: Number,
    },
    title: {
      type: String,
      required: true
    },
    userId: {
      type: Number,
    },
    
    body: {
      type: String,
      required: true
    },
    tags: {
      type: [String],
      default: []
    },
    reactions: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
