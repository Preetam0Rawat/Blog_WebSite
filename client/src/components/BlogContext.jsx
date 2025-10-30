import React, { createContext, useContext, useState } from "react";

const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
    const [selectedBlog, setSelectedBlog] = useState(null);

    return (
        <BlogContext.Provider value={{ selectedBlog, setSelectedBlog }}>
            {children}
        </BlogContext.Provider>
    );
};

// Custom Hook for easy access
export const useBlog = () => useContext(BlogContext);
