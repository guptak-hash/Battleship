import { Link } from 'react-router-dom';
import shipImage from '../assets/ship.png';
import Navbar from '../components/Navbar';
import { useState } from 'react';

export default function Home() {
  const [showPlayOptions, setShowPlayOptions] = useState(false);

  const togglePlayOptions = () => {
    setShowPlayOptions(!showPlayOptions);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-sky-900 text-white font-sans">
      {/* Navbar */}
      <Navbar />

      {/* Hero section */}
      <div className="flex flex-col md:flex-row justify-between items-center px-10 py-10">
        {/* Left content */}
        <div className="max-w-2xl">
          <h2 className="text-lg text-gray-300 font-semibold">Online Game</h2>
          <h1 className="text-6xl md:text-7xl font-extrabold text-white mt-2 mb-6 font-[cursive]">BATTLESHIP</h1>
          <p className="text-md text-gray-200 leading-relaxed">
            Welcome to the world of online Battleship Game! Dive into epic sea battles, challenge opponents from around the globe, and put your tactical skills to the test...
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-col gap-4">
            {/* ▶ PLAY NOW button */}
            <button
              onClick={togglePlayOptions}
              className="bg-gray-400 hover:bg-gray-500 text-white py-3 px-6 rounded-full shadow-md font-semibold flex items-center gap-2 w-[15rem]"
            >
              ▶ PLAY NOW
            </button>

            {/* Conditional Play Options */}
            {showPlayOptions && (
              <div className="flex gap-4 flex-wrap">
                <Link
                  to="/singleplayer"
                  className="bg-blue-700 hover:bg-blue-800 text-white py-2 px-5 rounded-full font-semibold"
                >
                  🎯 Single Player
                </Link>
                <Link
                  to="/multiplayer"
                  className="bg-green-600 hover:bg-green-700 text-white py-2 px-5 rounded-full font-semibold"
                >
                  🌐 Multiplayer
                </Link>
              </div>
            )}

            {/* HOW TO PLAY */}
            <Link
              to="/rules"
              className="border border-white hover:bg-white hover:text-blue-800 py-3 px-6 rounded-full font-semibold flex items-center gap-2 w-[15rem]"
            >
              ❓ HOW TO PLAY
            </Link>
          </div>
        </div>

        {/* Right image */}
        <div className="mt-10 md:mt-0 md:ml-10">
          <img
            src={shipImage}
            alt="Battleship"
            className="w-[800px] max-w-full mr-36"
          />
        </div>
      </div>

      {/* Footer */}
      <footer className="text-gray-400 text-sm text-center mt-12 pb-6">
        © 2025 Battleship.
        <div className="mt-2">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">
            <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="GitHub" className="w-5 h-5 inline-block" />
          </a>
        </div>
      </footer>
    </div>
  );
}
