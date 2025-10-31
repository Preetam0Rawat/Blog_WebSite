import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import userRoutes from './routes/user.js'
import blogRoutes from './routes/blog.js'
import cors from 'cors'

dotenv.config()

const app = express()

//database connection
mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("Database connection successful"))
.catch((error)=> console.log("Error occures while connecting", error))

//middlewares
app.use(bodyParser.json())                         //As a mmidlle ware it  parses(convert json to object) before the data with post request reaches the backend router/controller.
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors({
    origin : process.env.FRONTEND_URL
}))


//routes
app.use('/user', userRoutes)
app.use('/blog', blogRoutes)
 
const PORT = process.env.PORT || 8000
app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`))  