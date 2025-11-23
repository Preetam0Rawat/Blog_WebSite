import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import siimage from '../images/signin.png'
import { signin } from '../api/index.jsx'

const Signin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSignin = async (e) => {
    e.preventDefault()
    try {
      const response = await signin(formData)
      console.log("Signin successful", response.data)

      // ✅ Store token locally
      localStorage.setItem("token", response.data.token)
      navigate('/')
    } catch (error) {
      alert(error.response?.data?.mssg || "Signin failed")
      setFormData({ email: '', password: '' })
    }
  }

  return (
    <div className="flex h-screen">
      {/* Left side (form) */}
      <div className="md:flex-1 flex flex-col justify-center items-end bg-gray-300">
        <h1 className="md:text-5xl text-3xl font-bold md:w-[30vw] text-center">SIGN IN</h1>

        <form
          onSubmit={handleSignin}
          className="flex flex-col justify-center items-center mt-8 md:sw-[30vw]"
        >
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            className="mt-6 md:w-4/5 border border-gray-400 rounded-md p-3 text-lg focus:outline-none focus:ring-2 focus:ring-black"
          />

          <input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            className="mt-6 md:w-4/5 border border-gray-400 rounded-md p-3 text-lg focus:outline-none focus:ring-2 focus:ring-black"
          />

          <Link to="/signup" className="mt-5 underline font-semibold">
            Create account?
          </Link>

          <button
            type="submit"
            className="mt-10 md:w-4/5 py-3 text-xl font-semibold text-white bg-black rounded-xl border border-black hover:bg-gray-900 transition-all duration-300"
          >
            Sign in
          </button>
        </form>
      </div>

      {/* Right side (image) */}
      <div className="flex justify-end items-center bg-gray-50 md:w-220">
        <img
          src={siimage}
          alt="signin"
          className="h-screen w-600 object-cover  mix-blend-multiply"
        />
      </div>
    </div>
  )
}

export default Signin
