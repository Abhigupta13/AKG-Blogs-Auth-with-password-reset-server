const Blog = require('../models/blog');

exports.getBlogs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10; // Default limit is 10

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const totalBlogs = await Blog.countDocuments({});
    const totalPages = Math.ceil(totalBlogs / limit);

    let blogs;

    if (endIndex < totalBlogs) {
      blogs = await Blog.find({}).skip(startIndex).limit(limit);
    } else {
      blogs = await Blog.find({}).skip(startIndex);
    }

    res.status(200).json({
      blogs,
      totalPages,
      currentPage: page,
      totalBlogs
    });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
