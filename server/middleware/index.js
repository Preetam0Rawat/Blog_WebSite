import jwt from 'jsonwebtoken'
import Blog from '../models/blog.js'

export const auth = async(req , res , next) =>{
    try{         
        const authHeader = req.header('Authorization')                  
        if(!authHeader || authHeader.split(' ')[1] === 'null'){                          
            return res.status(401).json({mssg : "You are unauthorized"})  //Unauthorized
        }

        // In jwt we don't use Basic but Bearer
        const token = authHeader.split(' ')[1]
                           
        const isCustomAuth = token.length < 500
        let decodedData;
                           

        if(token && isCustomAuth){                          
           decodedData = jwt.verify(token, 'test')
            req.userId = decodedData?.id                         
        }else{                         
            decodedData = jwt.decode(token)
            req.userId = decodedData?.sub
        }
        next()

    }
    catch(error){
        console.log(error)
        res.status(403).json({mssg : "Error occured while authorization"})
    }

}

export const editAndDeleteBlogAuth = async(req, res, next)=> {
    try {
                             
        const {id} = req.params; // Blog ID
        const blog = await Blog.findById(id);

        if (blog.author.toString() !== req.userId) {
            return res.status(403).json({ mssg: "Unauthorized: You can only edit and delete your own blog" });
        }
                                
        next(); // Proceed to update if authorized
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
}