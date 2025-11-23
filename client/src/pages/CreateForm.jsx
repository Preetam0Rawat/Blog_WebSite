import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createBlog } from "../api/index.jsx";

const CreateForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    selectedFile: "",
  });

  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");

  const navigate = useNavigate();

  // 🟡 Handle typing tags
  const handleAddTag = (e) => {
    e.preventDefault();
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToDelete) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setFormData((prev) => ({ ...prev, selectedFile: reader.result }));
    };
    reader.readAsDataURL(file);
  };  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await createBlog({ ...formData, tags }, token);
      console.log("✅ Blog Created Successfully", response.data);
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.mssg || "Error creating blog");
      setFormData({ title: "", description: "", selectedFile: "" });
    }
  };

  return (
    <div className="flex flex-col  h-screen justify-center items-center bg-gradient-to-b from-pink-400 via-pink-200 to-pink-100">
      <div className=" h-screen md:w-400 md:mt-20">
        <h1 className="text-2xl md:text-5xl font-bold mb-8 text-center pt-5">CREATE BLOG</h1>

        {/* Title */}
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleInputChange}
          className="w-full  border border-gray-400 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />

        {/* Description */}
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleInputChange}
          rows="10"
          className="w-full border border-gray-400 rounded-lg px-4 py-3 mt-6 text-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />

        {/* Tags */}
        <form
          onSubmit={handleAddTag}
          className="mt-6 flex flex-wrap items-center gap-3"
        >
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            placeholder="Add tags and press Enter"
            className="flex-1 border border-gray-400 rounded-lg px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded-lg hover:bg-yellow-400 hover:text-black transition"
          >
            Add
          </button>
        </form>

        {/* Show tags */}
        <div className="flex flex-wrap gap-2 mt-3">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full flex items-center gap-2"
            >
              #{tag}
              <button
                onClick={() => handleRemoveTag(tag)}
                className="text-red-500 font-bold hover:text-red-700"
              >
                ×
              </button>
            </span>
          ))}
        </div>

        {/* File Upload */}
        <div className="mt-6 ">
           <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-2 bg-slate-400 md:w-80 cursor-grab border-2"
          />
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          className="mt-10 w-full bg-black text-white text-xl font-semibold rounded-xl py-3 hover:bg-yellow-400 hover:text-black transition-all"
        >
          Create
        </button>
      </div>







    
    </div>
  );
};

export default CreateForm;
