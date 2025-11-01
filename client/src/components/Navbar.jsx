import React from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const token = localStorage.getItem("token")
  const navigate = useNavigate()

  const handleSignin = () => {
    navigate('/signin')
  }

  const handleSignOut = () => {
    localStorage.removeItem('token')
    navigate('/signin')
  }

  const handleCreateBlog = () => {
    navigate('/createForm')
  }

  return (
    <nav className="flex justify-between items-center px-8 py-5 shadow-md bg-white">
      {/* Logo / Title */}
      <h1 className="text-3xl font-bold">Blog Website</h1>

      {/* Buttons */}
      <div className="flex items-center space-x-4">
        {/* Create Blog Button */}
        <button
          onClick={handleCreateBlog}
          className="bg-black text-white rounded-full px-5 py-2 font-medium hover:bg-[#FFD42F] hover:text-black transition-all duration-300"
        >
          Create Blog
        </button>

        {/* Signin / Signout Buttons */}
        {!token ? (
          <button
            onClick={handleSignin}
            className="bg-black text-white rounded-full px-5 py-2 font-medium hover:bg-[#FFD42F] hover:text-black transition-all duration-300"
          >
            Sign in
          </button>
        ) : (
          <button
            onClick={handleSignOut}
            className="bg-black text-white rounded-full px-5 py-2 font-medium hover:bg-[#FFD42F] hover:text-black transition-all duration-300"
          >
            Sign out
          </button>
        )}
      </div>
    </nav>
  )
}

export default Navbar
