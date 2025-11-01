import './App.css'
import Signin from './pages/Signin.jsx';
import Home from './pages/Home.jsx';
import Signup from './pages/Signup.jsx';
import CreateForm from './pages/CreateForm.jsx';
import EditForm from './pages/EditForm.jsx';
import ViewBlog from './pages/ViewBlog.jsx';
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import { BlogProvider } from './components/BlogContext';

function App() {

  return (
     <div className="">
      <BrowserRouter>
      <BlogProvider>
      <Routes>
        <Route path = '/' element = {<Home/>} />
        <Route path = '/signin' element = {<Signin/>}/>
        <Route path = '/signup' element = {<Signup/>}/>
        <Route path = '/blog/search' element = {<Home/>}/>
        <Route path = '/createForm' element = {<CreateForm/>}/>
        <Route path = '/editForm' element = {<EditForm/>}/>
        <Route path = '/viewBlog' element = {<ViewBlog/>}/>
      </Routes>
      </BlogProvider>
    </BrowserRouter>
    </div>
  )
}

export default App
