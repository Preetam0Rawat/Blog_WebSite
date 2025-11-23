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
  const [loading, setLoading] = useState(true);


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
        setLoading(true);
        const response = await getAllBlogs()
        setBlogs(response.data)
        console.log("Getting all blogs successful", response.data)
      } catch (error) {
        alert(error.response?.data?.mssg || "Failed to fetch blogs")
      } finally {
        setLoading(false); // stop loading
      }
    }

    getBlogs()
  }, [])

  const handleSearch = async () => {
    try {
      if (search.trim() || tags.length > 0) {
        const response = await getBlogBysearch({ search, tags: tags.join(',') })
        if (response.data.blogs.length === 0) { alert("No blogs found") }
        setSearchResult(response.data.blogs)
        navigate(`/blog/search?searchQuery=${search || 'none'}&tags=${tags.join(',') || 'none'}`)
      }
      else {
        navigate('/')
        alert("No blogs found")
      }
    } catch (error) {
      alert(error.response?.data?.mssg || "Search failed")
    }
  }

  return (
    <div>
      <Navbar />

      {/* Hero Section
      <div className='w-full h-190'>

      </div> */}

      {/* Search Bar Section */}
      <div className="bg-white pt-6 flex flex-col items-center">
        <div className="flex flex-col  md:flex-row flex-wrap justify-center items-center gap-4 w-full md:w-auto">
          {/* Search Input */}
          <input
            type="text"
            name="search"
            placeholder="Search blogs"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-pink-400 rounded-md p-3 w-64 focus:outline-none focus:ring-2 focus:ring-white"
          />

          {/* Tags Input (replaces ChipInput) */}
          <div className="flex flex-wrap gap-2 border border-pink-400 rounded-md p-2 w-64 min-h-[48px]">
            {tags.map((tag) => (
              <span
                key={tag}
                className="bg-gray-200
                 px-2 py-1 rounded-full text-sm flex items-center gap-1"
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
            className="bg-pink-400 text-white px-6 py-3 rounded-md hover:bg-pink-200 hover:text-black transition-all duration-300"
          >
            Search
          </button>
        </div>
      </div>

      {/* Blog Display Section */}

      {loading ? (
        <div className="flex justify-center items-center mt-5">
          <p className="text-2xl md:text-4xl text-pink-400 mr-5">Loading Data From Backend</p>
          <div className="animate-spin rounded-full h-7 w-7 border-4 border-pink-400 border-t-transparent"></div>
        </div>
      ) :
        (
          <div className="">
            {searchResult.length > 0 ? (
              <>
                <h2 className="text-3xl font-semibold mb-6 text-center pt-20">
                  SEARCH RESULTS: {searchResult.length}
                </h2>
                <div className=" bg-white md:pl-30 md:pr-30 flex flex-wrap justify-center md:gap-5 md:pt-30">
                  {searchResult.map((blog) => (
                    <div key={blog._id} className="flex justify-center">
                      <Blog data={blog} />
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                <div className=" bg-white md:pl-30 md:pr-30 flex flex-wrap justify-center md:gap-5 md:pt-30">
                  {blogs.map((blog) => (
                    <div key={blog._id} className="flex justify-center">
                      <Blog data={blog} />
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}


    </div>
  )
}

export default Home
