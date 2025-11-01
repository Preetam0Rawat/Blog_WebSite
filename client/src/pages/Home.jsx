import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar.jsx'
import Blog from '../components/Blog.jsx'
import { getAllBlogs, getBlogBysearch } from '../api/index.jsx'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const [search, setSearch] = useState('')
  const [tags, setTags] = useState([])
  const [blogs, setBlogs] = useState([])
  const [searchResult, setSearchResult] = useState([])

  const navigate = useNavigate()

  const handleAdd = (tag) => {
    if (tag && !tags.includes(tag)) setTags([...tags, tag])
  }

  const handleDelete = (tagToDelete) => {
    setTags(tags.filter((tag) => tag !== tagToDelete))
  }

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const response = await getAllBlogs()
        setBlogs(response.data)
        console.log("Getting all blogs successful", response.data)
      } catch (error) {
        alert(error.response?.data?.mssg || "Failed to fetch blogs")
      }
    }

    getBlogs()
  }, [])

  const handleSearch = async () => {
    try {
      if (search.trim() || tags.length > 0) {
        const response = await getBlogBysearch({ search, tags: tags.join(',') })
        console.log("Search successful", response.data)
        setSearchResult(response.data.blogs)
        navigate(`/blog/search?searchQuery=${search || 'none'}&tags=${tags.join(',') || 'none'}`)
      } else {
        navigate('/')
        alert("No results found")
      }
    } catch (error) {
      alert(error.response?.data?.mssg || "Search failed")
    }
  }

  return (
    <div>
      <Navbar />

      {/* Search Bar Section */}
      <div className="p-6 flex flex-col items-center">
        <div className="flex flex-wrap justify-center items-center gap-4 w-full md:w-auto">
          {/* Search Input */}
          <input
            type="text"
            name="search"
            placeholder="Search blogs"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-400 rounded-md p-3 w-64 focus:outline-none focus:ring-2 focus:ring-black"
          />

          {/* Tags Input (replaces ChipInput) */}
          <div className="flex flex-wrap gap-2 border border-gray-400 rounded-md p-2 w-64 min-h-[48px]">
            {tags.map((tag) => (
              <span
                key={tag}
                className="bg-gray-200 px-2 py-1 rounded-full text-sm flex items-center gap-1"
              >
                #{tag}
                <button
                  type="button"
                  onClick={() => handleDelete(tag)}
                  className="text-red-500 hover:text-red-700 font-bold"
                >
                  ×
                </button>
              </span>
            ))}
            <input
              type="text"
              placeholder="Add tag..."
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  handleAdd(e.target.value.trim())
                  e.target.value = ''
                }
              }}
              className="flex-1 outline-none"
            />
          </div>

          {/* Search Button */}
          <button
            onClick={handleSearch}
            className="bg-black text-white px-6 py-3 rounded-md hover:bg-[#FFD42F] hover:text-black transition-all duration-300"
          >
            Search
          </button>
        </div>
      </div>

      {/* Blog Display Section */}
      <div className="px-6 mt-8">
        {searchResult.length > 0 ? (
          <>
            <h2 className="text-2xl font-semibold mb-6">
              Search Results: {searchResult.length}
            </h2>
            <div className="flex flex-wrap justify-center">
              {searchResult.map((blog) => (
                <div key={blog._id} className="flex justify-center">
                  <Blog data={blog} />
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-semibold mb-6">All Blogs</h2>
            <div className="flex flex-wrap justify-center">
              {blogs.map((blog) => (
                <div key={blog._id} className="flex justify-center">
                  <Blog data={blog} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Home
