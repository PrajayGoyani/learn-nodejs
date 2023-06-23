const Post = require('../../models/Post');

const postController = {
  // ... other methods ...

  addPost: async (req, res) => {
    const { title, content } = req.body;
    const userId = req.user.userId; // Extract userId from JWT token payload

    try {
      const newPost = new Post({
        title,
        content,
        userId: userId
      });

      await newPost.save();

      res.json({ message: 'Post added successfully', id: newPost._id });
    } catch (error) {
      console.error(error);
      res.status(500).json(error.message);
    }
  },

  updatePost: async (req, res) => {
    const { postId, title, content } = req.body;

    try {
      const post = await Post.findById(postId);

      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }

      post.title = title;
      post.content = content;

      await post.save();

      res.json({ message: 'Post updated successfully', id: post._id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  },

  deletePost: async (req, res) => {
    const { postId } = req.body;

    try {
      if (postId) {
        // Delete a specific post
        const post = await Post.findOneAndDelete({ _id: postId });

        if (!post) {
          return res.status(404).json({ error: 'Post not found' });
        }

        res.json({ message: 'Post deleted successfully' });
      } else {
        // Delete all posts
        await Post.deleteMany({});
        res.json({ message: 'All posts deleted successfully' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  },

  getPosts: async (req, res) => {
    try {
      const { postId, page, limit } = req.body;
      let posts;

      if (postId) {
        // Get a single post by postId with user data
        const post = await Post.findById(postId).populate('userId', '-password');

        if (!post) {
          return res.status(404).json({ error: 'Post not found' });
        }

        return res.json({ posts: [post] });
      }

      // Get all posts with pagination and user data
      const pageNumber = parseInt(page) || 1;
      const pageSize = parseInt(limit) || 10;
      const skip = (pageNumber - 1) * pageSize;

      const totalPosts = await Post.countDocuments();
      const totalPages = Math.ceil(totalPosts / pageSize);

      posts = await Post.find()
        .skip(skip)
        .limit(pageSize)
        .populate('userId', '-password');

      return res.json({ posts,totalPosts, totalPages });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'An error occurred' });
    }
  },

};

module.exports = postController;