import Blog from "../models/blog.js"
import User from "../models/user.js";

export const createBlog = async (req, res) => {


    const { title, description, selectedFile, tags } = req.body;
    const author = req.userId

    try {
        const existing_user = await User.findById(author)

        if (!existing_user) {
            return res.status(404).json({ mssg: "User doesn't exist" })
        }

        const blog = new Blog({
            title,
            description,
            author,
            selectedFile,
            tags
        })

        await blog.save()

        return res.status(201).json({ mssg: "Blog created successfully", blog })
    }
    catch (error) {
        return res.status(500).json({ mssg: "Error occured in creating the blog", error })
    }
}

export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({})
        return res.status(200).json(blogs)

    } catch (error) {
        return res.status(500).json({ mssg: "Error occured in getting all the blogs", error })
    }
}

export const getBlogBySearch = async(req, res) =>{
    const {searchQuery, tags} = req.query
    try {
        const title = new RegExp(searchQuery, 'i')
        const tagArray = tags.split(',').map(tag => new RegExp(tag.trim(), 'i'));
        let blogs;
        if(tags){
            blogs = await Blog.find({$or : [{title}, {tags: { $in: tagArray }}]})
        }
        else{
            blogs  = await Blog.find({title})
        }

        return res.status(200).json({blogs})
    } catch (error) {
        return res.status(404).json({mssg : "Search failed"})
    }
}



export const updateBlog = async (req, res) => {
    const { id } = req.params
    const { title, description, selectedFile, tags } = req.body
    try {
        const updatedBlog = await Blog.findByIdAndUpdate(id, { title, description, selectedFile, tags }, { new: true })

        res.status(200).json(updatedBlog)

    } catch (error) {
        return res.status(500).json({ mssg: "Error occured in updating the blog", error })
    }
}


export const deleteBlog = async (req, res) => {
    const { id } = req.params
    try {
        await Blog.findByIdAndDelete(id)

        res.status(200).json({ mssg: "Blog deleted successfully" })

    } catch (error) {
        return res.status(500).json({ mssg: "Error occured in deleting the blog", error })
    }
}