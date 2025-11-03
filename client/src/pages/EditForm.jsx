import React, { useState } from "react";
import { editBlog } from "../api/index.jsx";
import { useNavigate } from "react-router-dom";
import { useBlog } from "../components/BlogContext.jsx";

const EditForm = () => {
  const { selectedBlog } = useBlog();
  const data = selectedBlog;

  const [formData, setFormData] = useState({
    title: data.title,
    description: data.description,
    selectedFile: data.selectedFile,
  });

  const [tags, setTags] = useState(data.tags || []);
  const [tagInput, setTagInput] = useState("");

  const navigate = useNavigate();

  // 🟡 Add tag
  const handleAddTag = (e) => {
    e.preventDefault();
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  // 🔴 Remove tag
  const handleRemoveTag = (tagToDelete) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };

  // 📝 Input change handler
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


  // 💾 Submit updated blog
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const id = data._id;
      const token = localStorage.getItem("token");
      const response = await editBlog(id, token, { ...formData, tags });
      console.log("✅ Blog updated successfully", response.data);
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.mssg || "Failed to update blog");
    }
  };

  return (
    <div className="flex flex-col h-screen items-center justify-center  px-6  bg-gradient-to-b from-pink-400 via-white to-pink-300">
      <div className="w-350 mt-10 bg-gradient-to-b from-white via-pink-300 to-white border-4 border-pink-700 rounded-3xl p-10 shadow-lg">
        <h1 className="text-4xl font-bold mb-8 text-center">
          EDIT YOUR BLOG
        </h1>

        {/* Title */}
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleInputChange}
          className="w-full border border-gray-400 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
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
        <div className="mt-6">
           <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-2 bg-pink-400 w-80 cursor-grab border-2"
          />
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          className="mt-10 w-full bg-black text-white text-xl font-semibold rounded-xl py-3 hover:bg-yellow-400 hover:text-black transition-all"
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default EditForm;
