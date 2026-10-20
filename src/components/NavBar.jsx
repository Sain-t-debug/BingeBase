import { Link, NavLink } from "react-router-dom"

function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">BingeBase</Link>
      </div>
      <div className="navbar-links">
        {/* NavLink adds the "active" class to the page you're on */}
        <NavLink to="/" end className="navbar-link">Home</NavLink>
        <NavLink to="/favourites" className="navbar-link">Favourites</NavLink>
      </div>
    </nav>
  )
}

export default NavBar
