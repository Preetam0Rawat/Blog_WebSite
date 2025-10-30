import React, { useState } from 'react'
import suimage from '../images/signup.png'
import { Link, useNavigate } from 'react-router-dom'
import { signup } from '../api/index.jsx'



const Signup = () => {

    const [formData, setFormData] = useState({
        name: '',
        email: "",
        password: "",
        confirmPassword: ""
    })

    const navigate = useNavigate()

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState, [name]: value
        }))
    }


  const handleSignup = async(e) => {
      e.preventDefault();
    try {
            const response = await signup(formData)
            console.log("Singnup successful", response.data)
            navigate('/signin')
        } catch (error) {
            //console.log("Signup failed: ", error)
            alert(error.response.data.mssg)
            setFormData({ name: '', email: '', password: '', confirmPassword: '' })
        }

    }


  return (
    <div className="flex h-screen">
      {/* Left image section */}
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <img
          src={suimage}
          alt="signup"
          className="max-h-screen max-w-full object-contain"
        />
      </div>

      {/* Right signup section */}
    <div className="flex-1 flex flex-col justify-center items-start px-16">
  <h1 className="text-5xl font-bold mb-6 w-[30vw]">Sign up</h1>

  {/* Removed <form>, replaced with div */}
  <div className="flex flex-col items-center w-[30vw] space-y-6">
    <input
      type="text"
      id="name"
      name="name"
      placeholder="Name"
      value={formData.name}
      onChange={handleInputChange}
      className="w-4/5 border border-gray-400 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
      required
    />

    <input
      type="email"
      id="email"
      name="email"
      placeholder="Email"
      value={formData.email}
      onChange={handleInputChange}
      className="w-4/5 border border-gray-400 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
      required
    />

    <input
      type="password"
      id="password"
      name="password"
      placeholder="Password"
      value={formData.password}
      onChange={handleInputChange}
      className="w-4/5 border border-gray-400 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
      required
    />

    <input
      type="password"
      id="confirmPassword"
      name="confirmPassword"
      placeholder="Confirm Password"
      value={formData.confirmPassword}
      onChange={handleInputChange}
      className="w-4/5 border border-gray-400 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
      required
    />

    <Link
      to="/signin"
      className="mt-2 text-black font-semibold underline hover:text-gray-700"
    >
      Already a user?
    </Link>

    {/* Changed type from "submit" → "button" */}
    <button
      type="button"
      onClick={handleSignup}
      className="w-4/5 mt-8 py-3 bg-black text-white text-lg font-semibold rounded-xl hover:bg-gray-800 transition"
    >
      Sign up
    </button>
  </div>
</div>

    </div>
  )
}

export default Signup
