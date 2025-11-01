import axios from 'axios'

const API = axios.create({baseURL : import.meta.env.VITE_API_URL})

export const signin = (formData) => API.post('/user/signin', formData)
export const signup = (formData) => API.post('/user/signup', formData)

export const createBlog = (formData, token) => {
    return API.post('/blog/', formData, {
        headers: {
            'Authorization' : `Bearer ${token}`
        }
    });
}
export const getAllBlogs = () => API.get('/blog/')


export const deleteBlog = (id, token) =>  {
    return API.delete(`/blog/${id}`,{
        headers: {
            'Authorization' : `Bearer ${token}` // Attach JWT token
        }
    });
};


export const editBlog = (id, token, formData) => {
    return API.post(`/blog/${id}`, formData, {
        headers: {
            'Authorization' : `Bearer ${token}` // Attach JWT token
        }
    });
};

export const getBlogBysearch = (searchQuery) => API.get(`/blog/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags || 'none'}`)