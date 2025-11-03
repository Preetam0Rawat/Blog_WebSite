import React from 'react'
import { useBlog } from '../components/BlogContext.jsx'
import { deleteBlog } from '../api/index.jsx'
import { useNavigate } from 'react-router-dom'
import bgImage from '../images/ViewBlogBG.jpg'

const ViewBlog = () => {
  const { selectedBlog } = useBlog()
  const data = selectedBlog
  const navigate = useNavigate()

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this blog?")
    if (!confirmDelete) return

    try {
      const token = localStorage.getItem("token")
      const response = await deleteBlog(data._id, token)
      console.log("Blog deleted successfully", response.data)
      navigate('/')
    } catch (error) {
      console.log("Deletion failed", error)
      alert(error?.response?.data?.mssg || "Failed to delete blog.")
    }
  }

  return (
    <div
      className="min-h-screen flex justify-center items-center w-full p-6 bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="w-350 bg-white rounded-3xl shadow-lg p-8 text-center">
        {/* Title */}
        <h2 className="text-4xl font-bold  text-gray-900">{data.title}</h2>

        {/* Image */}
        {data.selectedFile && (
          <div className="w-full h-150 flex justify-center mt-10 mb-10">
            <img
              src={data.selectedFile}
              alt="blog visual"
              className="rounded-xl object-contain"
            />
          </div>
        )}

        {/* Description */}
        <p className="text-gray-700 whitespace-pre-line mb-4 leading-relaxed text-lg">
          {data.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 my-4">
          {Array.isArray(data.tags) &&
            data.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-800 border border-gray-300 px-3 py-1 rounded-full text-sm font-semibold"
              >
                #{tag}
              </span>
            ))}
        </div>

        {/* Delete Button */}
        <div className="flex justify-end mt-6">
          <button
            onClick={handleDelete}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg font-semibold transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default ViewBlog
