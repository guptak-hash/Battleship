import { useNavigate } from "react-router-dom";
import user1 from "../assets/user1.png";
import bot from "../assets/bot.png";

// frontend-battleship\src\pages\SinglePlayer.jsx
export default function SinglePlayer() {
 const navigate=useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-sky-900 p-4 flex flex-col items-center">
      {/* Header Section */}
      <header className="text-center mb-8 mt-6">
        <h1 className="text-6xl md:text-7xl font-extrabold text-white mb-4 font-serif tracking-tight">
          BATTLESHIP
        </h1>
        <h2 className="text-3xl md:text-4xl font-semibold text-cyan-200 font-mono">
          SINGLE PLAYER MODE
        </h2>
      </header>

      {/* VS Battle Section */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-12 w-full max-w-4xl">
        {/* Player Card */}
        <div className="flex flex-col items-center bg-blue-800/40 p-6 rounded-xl backdrop-blur-sm border border-cyan-400/20 shadow-lg shadow-blue-500/10 w-full max-w-xs">
          <img 
            src={user1} 
            alt="Player" 
            className="w-32 h-32 object-contain mb-4 drop-shadow-lg"
          />
          <h3 className="text-2xl font-bold text-white mb-2">YOU</h3>
          <div className="h-1 w-16 bg-cyan-400 mb-3"></div>
          {/* <p className="text-cyan-100 text-center">Command your fleet</p> */}
        </div>

        {/* VS Badge */}
        <div className="relative my-6 md:my-0">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center shadow-lg shadow-red-500/30 animate-pulse">
              <span className="text-white font-bold text-xl">VS</span>
            </div>
          </div>
        </div>

        {/* Bot Card */}
        <div className="flex flex-col items-center bg-blue-800/40 p-6 rounded-xl backdrop-blur-sm border border-cyan-400/20 shadow-lg shadow-blue-500/10 w-full max-w-xs">
          <img 
            src={bot} 
            alt="Computer" 
            className="w-32 h-32 object-contain mb-4 drop-shadow-lg grayscale hover:grayscale-0 transition-all"
          />
          <h3 className="text-2xl font-bold text-white mb-2">Computer</h3>
          <div className="h-1 w-16 bg-cyan-400 mb-3"></div>
          {/* <p className="text-cyan-100 text-center">Advanced naval AI</p> */}
        </div>
      </div>

      {/* Game Controls */}
      <div className="mt-8 flex flex-col sm:flex-row gap-4">
        {/* <button className="px-8 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-lg shadow-md hover:shadow-cyan-500/50 transition-all">
          New Game
        </button> */}
        <button onClick={()=>navigate('/game')} className="px-8 py-3 bg-blue-700 hover:bg-blue-600 text-white 
        font-bold rounded-lg shadow-md hover:shadow-blue-500/50 transition-all">
          Start Battle
        </button>
        <button onClick={()=>navigate('/')} className="px-8 py-3 bg-red-700 hover:bg-red-600 text-white 
        font-bold rounded-lg shadow-md hover:shadow-red-500/50 transition-all">
          Exit
        </button>
      </div>

      {/* Footer Note */}
      <p className="mt-12 text-blue-300 text-sm opacity-70">
        Tip: Right-click to rotate ships during placement
      </p>
    </div>
  );
}