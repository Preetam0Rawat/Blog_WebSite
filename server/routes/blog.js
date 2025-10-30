import express from 'express'
import { createBlog, deleteBlog, getAllBlogs,  getBlogBySearch,  updateBlog } from '../controller/blog.js'
import {auth, editAndDeleteBlogAuth} from '../middleware/index.js'

const router = express.Router()

router.post('/',auth, createBlog)
router.get('/', getAllBlogs)
router.get('/search', getBlogBySearch)
router.post('/:id', auth, editAndDeleteBlogAuth, updateBlog)
router.delete('/:id', auth, editAndDeleteBlogAuth, deleteBlog)


export default router;  