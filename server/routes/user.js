import express from 'express'
import {signin, signup } from '../controller/user.js'

const Router = express.Router()

Router.post('/signup', signup)
Router.post('/signin', signin)

export default Router  