import React from 'react'
import { useNavigate } from 'react-router-dom'
import sakura from '../images/sakura.png'
import food from '../images/food.png'
import blog from '../images/blog.jpg'
import attractions from '../images/attractions.png'
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
    <nav className="flex flex-col bg-gradient-to-b from-rose-400 via-rose-400 to-white h-[50vh] md:h-200 relative ">
      <img src={sakura} alt="error" className='absolute bottom-0 opacity-85 animate-showTitle' />
      <div className='flex justify-between items-center px-8 py-5 z-1'>
        <h1 className="text-2xl md:text-4xl font-bold font-serif text-white">SAKURA</h1>
        <div className="flex items-center space-x-2 md:space-x-4">
          <button
            onClick={handleCreateBlog}
            className="bg-white text-red-500 md:text-xl rounded-full px-2 md:px-5 py-2 font-medium hover:bg-pink-200 hover:text-black transition-all duration-300"
          >
            Create Blog
          </button>

          {!token ? (
            <button
              onClick={handleSignin}
              className="bg-white text-red-500 md:text-xl rounded-full px-2 md:px-5 py-2 font-medium hover:bg-pink-200 hover:text-black transition-all duration-300"
            >
              Sign in
            </button>
          ) : (
            <button
              onClick={handleSignOut}
              className="bg-black text-white rounded-full md:text-xl  px-2 md:px-5 py-2  font-medium hover:bg-pink-200 hover:text-black transition-all duration-300"
            >
              Sign out
            </button>
          )}

        </div>
      </div>
      <h1 className='text-white font-cursive text-3xl md:text-8xl text-center   md:w-300 absolute top-35 left-1/2 -translate-x-1/2 animate-showTitle'>Between Kana and Culture</h1>
      <h1 className='text-white font-cursive text-2xl md:text-5xl text-center md:w-300 absolute top-70 left-1/2 -translate-x-1/2 animate-showTitle'>見て、感じて、語る日本</h1>
      <div className=' flex-1 relative overflow-hidden'>
        <img src={blog} alt="error" className='absolute w-[60vw] md:w-200 md:h-130 left-1/2 -translate-x-1/2 bottom-2 animate-riseDropFade' />
        <img src={food} alt="error" className=' absolute w-[20vw] md:w-100 md:h-130 left-1 md:left-15 bottom-2 animate-dropFade' />
        <img src={attractions} alt="error" className=' absolute w-[20vw] md:w-100 md:h-130 right-1 md:right-15 bottom-2 animate-dropFade' />
      </div>
    </nav>
  )
}

export default Navbar
