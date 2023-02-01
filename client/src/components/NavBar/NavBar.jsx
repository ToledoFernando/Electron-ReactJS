import { Link } from "react-router-dom"

function NavBar() {
  return (
    <div>
        <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/like'>likes</Link></li>
            <li><Link to='/local'>Biblioteca Local</Link></li>
        </ul>
    </div>
  )
}

export default NavBar