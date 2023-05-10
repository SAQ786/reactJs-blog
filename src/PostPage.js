import { Link, useParams } from "react-router-dom";

const PostPage = ({ posts, handleDeletePosts }) => {
    const { id } = useParams();
    const post = posts.find(post => {
        return (post.id).toString() === id
    })
    return (
        <main className="PostPage">
            <article className="post card">
                {post &&
                    <>
                        <h1 style={{ textAlign: "center" }}>{post.title}</h1>
                        <p className="postDate">{post.dateTIME}</p>
                        <p className="postBody">{post.body}</p>
                        <Link to={`/`}><button className="editButton">Back</button></Link>
                        <Link to={`/edit/${post.id}`}><button className="editButton">Edit Post</button></Link>
                        <button style={{ backgroundColor: "#d70000" }} className="deleteButton" onClick={() => handleDeletePosts(post.id)}>
                            Delete Post
                        </button>
                        {/* <div style={{textAlign:"end"}}>
                            <button onClick={() => handleDeletePosts(post.id)}>Delete</button>
                            <button onClick={() => handleNavigation()}>Back</button>
                        </div> */}
                    </>
                }
                {!post &&
                    <>
                        <h1>Posts not found!!</h1>
                        <p>
                            <Link to="/">
                                Visit Our Home Page!</Link></p>
                    </>
                }
            </article>
        </main>
    )
}
export default PostPage;