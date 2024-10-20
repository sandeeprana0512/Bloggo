import React from 'react'
import Layout from './Layout'
import Home from "./pages/Home";
import PageNotFound from './pages/Error/PageNotFound';
import { Routes, Route } from "react-router-dom"
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import PostPage from './pages/Post/PostPage';
import CreatePost from './pages/Post/CreatePost';
import SearchResult from './pages/SearchResult';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='login' element={<Login />} />
        <Route path='create-account' element={<Register />} />
        <Route path='/post/:postId' element={<PostPage />} />
        <Route path='/create-new-post' element={<CreatePost />} />
        <Route path='/search/:query' element={<SearchResult />} />
        <Route path='*' element={<PageNotFound />} />
      </Route>
    </Routes>
  )
}

export default App