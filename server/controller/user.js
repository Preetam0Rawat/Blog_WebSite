import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from "../models/user.js"



export const signup = async(req, res) =>{
    const {name, email, password, confirmPassword}  = req.body  //Don't forget to use middleware body-parser (npm i body-parser)
    try{
          const existing_user = await User.findOne({email})
          if(existing_user){

            return res.status(400).json({mssg : "User already exists"})                      //Giving stauts code is neccesary so that the front end knows whether to run try block or catch block
          }

          if(password != confirmPassword){

            return res.status(400).json({mssg : "Password does not match"})
          }

          const hashedPassword = await bcrypt.hash(password, 12)

          const result = await User.create({ email, password : hashedPassword, name : name})


          return res.status(200).json({mssg : "Sign up Successful, now signin", result})
 
    }
    catch(error){
      console.log("Sign up not working")

      return res.status(501).json({mssg : "Sign up failed", error})

    }
}

export const signin = async(req, res) =>{
  const {email, password} = req.body
  try{
    const existing_user = await User.findOne({email})
    if(!existing_user){
      return res.status(400).json({mssg : "User does not  exists"})
    }

    const isPasswordCorrect = await bcrypt.compare(password, existing_user.password)
    if(!isPasswordCorrect){
      return res.status(401).json({mssg : "Invalid password"})
    }
  
    const token = jwt.sign({email : existing_user.email, id : existing_user._id}, 'test', {expiresIn : "1h"});
    return res.status(200).json({mssg : "User sign in successful", result : existing_user, token})

  }
  catch(error){
    return res.status(500).json({mssg : "Sign in failed",  error})
  }
}
  