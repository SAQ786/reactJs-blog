import { useState } from "react";

const NewPost = ({ handleSubmit}) => {
    const[newPost, setNewPost] = useState({
        title: "",
        body: ""
    })
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewPost((prevVal)=>{
            return {...prevVal,[name]:value}
        })
    }
    return (
        <main className="NewPost">
        <h2>New Post</h2>
            <form className="newPostForm" onSubmit={(e)=>{
                handleSubmit(e,newPost)
                setNewPost({
                    title: "",
                    body: ""   
                })
                }}>
                <label htmlFor="postTitle">Title</label>
                <input id="postTitle" value={newPost.title } type="text" name="title" onChange={handleChange} required></input>
                <label htmlFor="postBody">Post:</label>
                <textarea id="postBody" value={newPost.body} type="text" name="body" onChange={handleChange} required></textarea>
                <button type="submit">Add Post</button>
            </form>
        </main>
    )
}
export default NewPost;