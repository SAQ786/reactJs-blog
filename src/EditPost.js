import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";


const EditPost = ({ posts, handleEdit, editPostTitle, setEditPostTitle, editPostBody, setEditPostBody }) => {
    const { id } = useParams();
    const post = posts.find(post => (post.id).toString() === id);
    
    useEffect(()=>{
        if(post){
            setEditPostTitle(post.title);
            setEditPostBody(post.body);

        }
    },[post, setEditPostTitle, setEditPostBody])
    return (
        <main className="NewPost">
            {editPostTitle &&
                <div className="newPostForm" >
                    <h2>Edit Post</h2>
                    <form  onSubmit={(e) => e.preventDefault()}>
                        <label htmlFor="postTitle">Title:</label>
                        <input
                            id="postTitle"
                            type="text"
                            required
                            value={editPostTitle}
                            onChange={(e) => setEditPostTitle(e.target.value)}
                        />
                        <label htmlFor="postBody">Post:</label>
                        <textarea
                            id="postBody"
                            required
                            value={editPostBody}
                            onChange={(e) => setEditPostBody(e.target.value)}
                        />
                        <button type="submit" onClick={() => handleEdit(post.id)}>Submit</button>
                    </form>
                </div>
            }
            {!editPostTitle &&
                <>
                    <h2>Post Not Found</h2>
                    <p>Well, that's disappointing.</p>
                    <p>
                        <Link to='/'>Visit Our Homepage</Link>
                    </p>
                </>
            }
        </main>
    )
}

export default EditPost;