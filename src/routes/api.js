const express = require('express');
const { validateToken } = require('../middleware/tokenMiddleware');
const authController = require('../controllers/api/authController');
const postController = require('../controllers/api/postController');
const fileUploadController = require('../controllers/api/fileUploadController');
const multer  = require('multer');
const upload = multer({ dest: 'public/uploads/' });

const router = express.Router();

// Public routes
router.post('/login', authController.login);
router.post('/register', authController.register);

// File Upload
router.post('/upload', upload.single('file'), fileUploadController.uploadFile);

// Protected routes
router.use(validateToken); // Middleware to validate token for all protected routes

router.post('/post/add', postController.addPost);
router.patch('/post/update', postController.updatePost);
router.delete('/post/delete', postController.deletePost);
router.post('/posts', postController.getPosts);

module.exports = router;