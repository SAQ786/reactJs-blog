import './App.css';
import Header from "./Header";
import Nav from "./Nav";
import Footer from "./Footer";
import Home from "./Home";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import About from "./About";
import Missing from "./Missing";
import EditPost from './EditPost';
import { Route, Routes, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { format } from "date-fns"
import api from "./api/posts"
function App() {
  const [posts, setPosts] = useState([])
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [editPostBody, setEditPostBody] = useState('');
  const [editPostTitle, setEditPostTitle] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    //for fetching data
    const fetchPost = async () => {
      try {
        const response = await api.get("/posts");
        setPosts(response.data)
      } catch (err) {
        if (err.response) {
          //Not in the range of 200
          console.log(err.response.data)
          console.log(err.response.status)
          console.log(err.response.headers)
        } else {
          console.log(`Error:${err.msg}`)
        }
      }
    }
    fetchPost()
  }, [])

  useEffect(() => {
    const filterResults = posts.filter(post => {
      return ((post.body).toLowerCase()).includes(search.toLowerCase())
        || ((post.title).toLowerCase()).includes(search.toLowerCase())
    })
    setSearchResult(filterResults.reverse());
  }, [posts, search]);

  const handleDelete = async (id) => {
    const postsList = posts.filter((post) => post.id !== id);
    try {
      await api.delete(`/posts/${id}`)
      setPosts(postsList);
      navigate('/');
    } catch (err) {
      console.log(`Error:${err.msg}`)
    }

  }

  const handleSubmit = async (e, post) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 0;
    const datetime = format(new Date(), 'MMMM, dd,yyyy pp');
    const newPost = {
      id: id,
      title: post.title,
      datetime: datetime,
      body: post.body
    }
    try {
      const response = await api.post('/posts', newPost);
      const allPost = [...posts, response.data]
      setPosts(allPost);
      navigate('/');
    } catch (err) {
      if (err.response) {
        //Not in the range of 200
        console.log(`Error:${err.msg}`)
      }
    }
  }

  const handleEdit = async (id) => {
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const updatedPost = { id, title: editPostTitle, datetime, body: editPostBody };
    try {
      const response = await api.put(`/posts/${id}`, updatedPost);
      setPosts(posts.map(post => post.id === id ? { ...response.data } : post));
      setEditPostBody('');
      setEditPostTitle('');
      navigate('/');
    } catch (err) {
      if (err.response) {
        console.log(`Error:${err.msg}`)
      }
    }
  }

  return (
    <div className="App">
      <Header title="React Js Blogs" />
      <Nav search={search} setSearch={setSearch} />
      <Routes>
        <Route exact path='/' element={<Home posts={searchResult} />} >
          {/* <Home /> */}
        </Route>
        <Route path='/post' element={
          <NewPost posts={posts}
            handleSubmit={handleSubmit
            } />}
        />
        <Route path='/post/:id' element={
          <PostPage 
            posts={posts}
            handleDeletePosts={handleDelete}
            />}>

        </Route>

        <Route path="/edit/:id" element={
          <EditPost
            posts={posts}
            handleEdit={handleEdit}
            editPostTitle={editPostTitle}
            setEditPostTitle={setEditPostTitle}
            editPostBody={editPostBody}
            setEditPostBody={setEditPostBody}
          /> }>
        </Route>
        <Route path='/about' element={<About />} />
        <Route path='*' element={<Missing />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
