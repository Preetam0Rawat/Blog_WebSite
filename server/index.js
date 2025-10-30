import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'

import userRoutes from './routes/user.js'
import blogRoutes from './routes/blog.js'

import cors from 'cors'

const app = express()

//database connection
mongoose.connect("mongodb+srv://Preetam:zOEAeScPU2HVY8Jb@cluster0.u7r6o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(()=> console.log("Database connection successful"))
.catch((error)=> console.log("Error occures while connecting", error))

//middlewares
app.use(bodyParser.json())                         //As a mmidlle ware it  parses(convert json to object) before the data with post request reaches the backend router/controller.
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors({
    origin : 'http://localhost:5173'
}))


//routes
app.use('/user', userRoutes)
app.use('/blog', blogRoutes)
 
app.listen(8000, ()=> console.log(`Server running on port 8000`))  