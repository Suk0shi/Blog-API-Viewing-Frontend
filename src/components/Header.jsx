import { Link } from "react-router-dom";
import '../styles/Head.css'

function Header() {

  return (
    <>
      <header>
        <div className="title">
            <h1>Blog Name</h1>
        </div>
        <div className="pageLinks">
            <Link to="/">
                Blog
            </Link>
        </div>
      </header>
    </>
  )
}

export default Header