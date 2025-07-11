import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="flex justify-between items-center px-8 py-6">
        <h1 className="text-2xl font-bold">Battleship</h1>
        <ul className="flex space-x-8 font-semibold text-white text-lg">
          <li><Link to="/" className="hover:underline">Homepage</Link></li>
          <li><Link to="/rules" className="hover:underline">Game Rules</Link></li>
          <li><Link to="/about" className="hover:underline">About Us</Link></li>
        </ul>
      </nav>
  )
}

export default Navbar