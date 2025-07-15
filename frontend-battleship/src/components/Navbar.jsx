// import { Link } from 'react-router-dom';

// function Navbar() {
//   return (
//     <nav className="flex justify-between items-center px-8 py-6">
//         <h1 className="text-2xl font-bold">Battleship</h1>
//         <ul className="flex space-x-8 font-semibold text-white text-lg">
//           <li><Link to="/" className="hover:underline">Homepage</Link></li>
//           <li><Link to="/rules" className="hover:underline">Game Rules</Link></li>
//           <li><Link to="/about" className="hover:underline">About Us</Link></li>
//         </ul>
//       </nav>
//   )
// }

// export default Navbar




import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="flex justify-between items-center p-4 bg-blue-800/30 backdrop-blur-sm border-b border-cyan-400/20">
      {/* Logo/Title */}
      <div className="flex items-center">
        <Link 
          to="/" 
          className="text-2xl font-bold text-white hover:text-cyan-300 transition-colors font-serif"
        >
          BATTLESHIP
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="flex items-center space-x-6">
        <Link 
          to="/rules" 
          className="text-white hover:text-cyan-300 transition-colors text-lg font-medium"
        >
          Game Rules
        </Link>
        <Link 
          to="/about" 
          className="text-white hover:text-cyan-300 transition-colors text-lg font-medium"
        >
          About Us
        </Link>

        {/* Conditional Auth Links */}
        {user ? (
          <>
            <Link 
              to="/profile" 
              className="text-white hover:text-cyan-300 transition-colors text-lg font-medium"
            >
              Profile
            </Link>
            <button 
              onClick={logout}
              className="text-white hover:text-cyan-300 transition-colors text-lg font-medium"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link 
              to="/login" 
              className="text-white hover:text-cyan-300 transition-colors text-lg font-medium"
            >
              Login
            </Link>
            <Link 
              to="/register" 
              className="bg-cyan-600 hover:bg-cyan-500 text-white py-2 px-4 rounded-lg text-lg font-medium transition-colors"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}