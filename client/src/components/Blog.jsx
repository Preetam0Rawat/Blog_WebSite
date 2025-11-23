import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useBlog } from './BlogContext.jsx'
import { FaEdit, FaEye } from 'react-icons/fa' // replaces MUI icons

export default function Blog({ data }) {
  const navigate = useNavigate()
  const { setSelectedBlog } = useBlog()

  const handleEditBlog = () => {
    setSelectedBlog(data)
    navigate('/editForm')
  }

  const handleClickCard = () => {
    setSelectedBlog(data)
    navigate('/viewBlog')
  }

  return (
    <div className=" md:w-[20vw] md:h-[50vh] 2xl:h-[45vh] rounded-2xl m-6 shadow-lg border border-gray-200 bg-white overflow-hidden hover:shadow-xl transition-all duration-300">
      {/* Image section */}
      <div className="h-[240px] w-[80vw]  md:w-full overflow-hidden">
        <img
          src={data.selectedFile}
          alt="blog"
          className="w-full h-full object-cover md:object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content section */}
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{data.title}</h2>
        <p className="text-gray-600 text-lg font-bold leading-6 mb-3">
          {data.tags.map((tag) => `#${tag} `)}
        </p>
      </div>

      {/* Action buttons */}
      <div className="flex justify-between items-center px-4 pb-4">
        <button
          onClick={handleEditBlog}
          className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
        >
          <FaEdit />
          Edit Blog
        </button>

        <button
          onClick={handleClickCard}
          className="flex items-center gap-2 text-sm font-medium text-green-600 hover:text-green-800 transition-colors"
        >
          <FaEye />
          View Blog
        </button>
      </div>
    </div>
  )
}
