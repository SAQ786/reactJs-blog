import { Link } from "react-router-dom";
const Nav = ({ search, setSearch }) => {
    return (
        <nav className="Nav">
            <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
                <input id="search" placeholder="Search Post" type="text" value={search} onChange={(e) => { setSearch(e.target.value) }} />
            </form>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/post">Post</Link></li>
                <li><Link to="/About">About</Link></li>
            </ul>
        </nav>
    )
}
export default Nav;