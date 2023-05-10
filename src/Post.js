import { Link } from "react-router-dom";
const Post = ({ post }) => {
    return (
        <main>
            {
                <article className="post card">
                    <Link to={`/post/${post.id}`}>
                        <h2 className="title">{post.title}</h2>
                        <p className="postDate">{post.datetime}</p>
                        <p className="postBody">{
                        (post.body.length < 200)
                            ? post.body
                            : `${(post.body).slice(0, 200)}...`
                    }</p>
                    </Link>
                    

                </article>
            }
        </main>
    )
}
export default Post;