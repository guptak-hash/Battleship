import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Ship configurations
const SHIPS = [
  { name: 'Carrier', length: 5, count: 1 },
  { name: 'Battleship', length: 4, count: 1 },
  { name: 'Cruiser', length: 3, count: 1 },
  { name: 'Submarine', length: 3, count: 1 },
  { name: 'Destroyer', length: 2, count: 1 }
];

const BOARD_SIZE = 10;
const EMPTY = 0;
const SHIP = 1;
const HIT = 2;
const MISS = 3;

// Game phases
const PHASE_SETUP = 'setup';
const PHASE_PLAYER_TURN = 'player_turn';
const PHASE_COMPUTER_TURN = 'computer_turn';
const PHASE_GAME_OVER = 'game_over';

export default function GamePage() {
  // Game state
  const [gamePhase, setGamePhase] = useState(PHASE_SETUP);
  const [playerBoard, setPlayerBoard] = useState(() => createEmptyBoard());
  const [computerBoard, setComputerBoard] = useState(() => createEmptyBoard());
  const [playerShots, setPlayerShots] = useState(() => createEmptyBoard());
  const [computerShots, setComputerShots] = useState(() => createEmptyBoard());
  const [currentShipIndex, setCurrentShipIndex] = useState(0);
  const [isHorizontal, setIsHorizontal] = useState(true);
  const [winner, setWinner] = useState(null);
  const [message, setMessage] = useState('Place your ships on the board');
  const [playerShipsRemaining, setPlayerShipsRemaining] = useState(17); // Total ship cells
  const [computerShipsRemaining, setComputerShipsRemaining] = useState(17);
  const [startTime, setStartTime] = useState(null);
  const { user } = useAuth();
  const navigate=useNavigate();

  // Create empty board
  function createEmptyBoard() {
    return Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(EMPTY));
  }

  // Check if ship placement is valid
  function isValidPlacement(board, row, col, length, horizontal) {
    if (horizontal) {
      if (col + length > BOARD_SIZE) return false;
      for (let i = 0; i < length; i++) {
        if (board[row][col + i] !== EMPTY) return false;
      }
    } else {
      if (row + length > BOARD_SIZE) return false;
      for (let i = 0; i < length; i++) {
        if (board[row + i][col] !== EMPTY) return false;
      }
    }
    return true;
  }

  // Place ship on board
  function placeShip(board, row, col, length, horizontal) {
    const newBoard = board.map(row => [...row]);
    if (horizontal) {
      for (let i = 0; i < length; i++) {
        newBoard[row][col + i] = SHIP;
      }
    } else {
      for (let i = 0; i < length; i++) {
        newBoard[row + i][col] = SHIP;
      }
    }
    return newBoard;
  }

  // Handle player ship placement
  function handleCellClick(row, col) {
    if (gamePhase !== PHASE_SETUP) return;

    const currentShip = SHIPS[currentShipIndex];
    if (!currentShip) return;

    if (isValidPlacement(playerBoard, row, col, currentShip.length, isHorizontal)) {
      const newBoard = placeShip(playerBoard, row, col, currentShip.length, isHorizontal);
      setPlayerBoard(newBoard);

      if (currentShipIndex < SHIPS.length - 1) {
        setCurrentShipIndex(currentShipIndex + 1);
        setMessage(`Place your ${SHIPS[currentShipIndex + 1].name} (${SHIPS[currentShipIndex + 1].length} cells)`);
      } else {
        setMessage('All ships placed! Starting battle...');
        setTimeout(() => {
          setGamePhase(PHASE_PLAYER_TURN);
          setMessage('Your turn - Click on enemy waters to fire!');
        }, 1500);
      }
    }
  }

  // Handle player attack
  function handleAttack(row, col) {
    if (gamePhase !== PHASE_PLAYER_TURN || playerShots[row][col] !== EMPTY) return;

    const newPlayerShots = [...playerShots];
    const hit = computerBoard[row][col] === SHIP;

    newPlayerShots[row][col] = hit ? HIT : MISS;
    setPlayerShots(newPlayerShots);

    if (hit) {
      const newShipsRemaining = playerShipsRemaining - 1;
      setPlayerShipsRemaining(newShipsRemaining);
      setMessage('You hit enemy ship!');

      // Add this block - Computer win condition
      if (newShipsRemaining === 0) {
        setWinner('player');
        setGamePhase(PHASE_GAME_OVER);
        setMessage('Victory! You sank all enemy ships!');
        saveGameResult('win'); // Only save final result
        return;
      }

      setTimeout(computerTurn, 1000);
    } else {
      setMessage('You missed! Computer turn!');
      setGamePhase(PHASE_PLAYER_TURN);
    }
  }



  // Computer's turn
  function computerTurn() {
    let row, col;
    do {
      row = Math.floor(Math.random() * BOARD_SIZE);
      col = Math.floor(Math.random() * BOARD_SIZE);
    } while (computerShots[row][col] !== EMPTY);

    const newComputerShots = [...computerShots];
    const hit = playerBoard[row][col] === SHIP;

    newComputerShots[row][col] = hit ? HIT : MISS;
    setComputerShots(newComputerShots);

    if (hit) {
      const newShipsRemaining = playerShipsRemaining - 1;
      setPlayerShipsRemaining(newShipsRemaining);
      setMessage('Computer hit your ship!');

      if (newShipsRemaining === 0) {
        setWinner('computer');
        setGamePhase(PHASE_GAME_OVER);
        setMessage('Defeat! Computer sank all your ships!');
        saveGameResult('loss'); // Only save final result
        return;
      }

      setTimeout(computerTurn, 1000);
    } else {
      setMessage('Computer missed! Your turn!');
      setGamePhase(PHASE_PLAYER_TURN);
    }
  }

  

  // effect to set start time on initial render
  useEffect(() => {
    setStartTime(new Date());
  }, []);

  // Generate computer ships
  useEffect(() => {
    let board = createEmptyBoard();

    SHIPS.forEach(ship => {
      let placed = false;
      let attempts = 0;

      while (!placed && attempts < 100) {
        const row = Math.floor(Math.random() * BOARD_SIZE);
        const col = Math.floor(Math.random() * BOARD_SIZE);
        const horizontal = Math.random() < 0.5;

        if (isValidPlacement(board, row, col, ship.length, horizontal)) {
          board = placeShip(board, row, col, ship.length, horizontal);
          placed = true;
        }
        attempts++;
      }
    });

    setComputerBoard(board);
  }, []);

  

  // Get cell display class
  function getCellClass(value, isPlayerBoard = false, shots = null, row = null, col = null) {
    const baseClass = "w-8 h-8 border border-cyan-400/30 cursor-pointer transition-all hover:border-cyan-400 flex items-center justify-center text-xs font-bold";

    if (isPlayerBoard) {
      // Player's board
      if (shots && shots[row][col] === HIT) {
        return `${baseClass} bg-red-500 text-white`;
      } else if (shots && shots[row][col] === MISS) {
        return `${baseClass} bg-blue-400 text-white`;
      } else if (value === SHIP) {
        return `${baseClass} bg-gray-600 hover:bg-gray-500`;
      }
    } else {
      // Computer's board (enemy view)
      if (shots && shots[row][col] === HIT) {
        return `${baseClass} bg-red-500 text-white`;
      } else if (shots && shots[row][col] === MISS) {
        return `${baseClass} bg-blue-400 text-white`;
      }
    }

    return `${baseClass} bg-blue-900/50 hover:bg-blue-800/70`;
  }

  // Get cell content
  function getCellContent(value, shots = null, row = null, col = null) {
    if (shots && shots[row][col] === HIT) return '💥';
    if (shots && shots[row][col] === MISS) return '💧';
    return '';
  }

  // Add this function to save game results
  const saveGameResult = async (result) => {
    if (!user) return; // Don't save if user is not logged in

    const endTime = new Date();
    const duration = Math.floor((endTime - startTime) / 1000); // in seconds

    // Calculate hits and misses
    let playerHits = 0;
    let playerMisses = 0;
    let opponentHits = 0;
    let opponentMisses = 0;

    playerShots.forEach(row => {
      row.forEach(cell => {
        if (cell === HIT) playerHits++;
        if (cell === MISS) playerMisses++;
      });
    });

    computerShots.forEach(row => {
      row.forEach(cell => {
        if (cell === HIT) opponentHits++;
        if (cell === MISS) opponentMisses++;
      });
    });

    try {
      await axios.post('/api/games', {
        result,
        opponentType: 'computer',
        // playerHits,
        // playerMisses,
        // opponentHits,
        // opponentMisses,
        duration
      });
    } catch (err) {
      console.error('Error saving game result:', err);
    }
  };



  function resetGame() {
    setGamePhase(PHASE_SETUP);
    setPlayerBoard(createEmptyBoard());
    setComputerBoard(createEmptyBoard());
    setPlayerShots(createEmptyBoard());
    setComputerShots(createEmptyBoard());
    setCurrentShipIndex(0);
    setIsHorizontal(true);
    setWinner(null);
    setMessage('Place your ships on the board');
    setPlayerShipsRemaining(17);
    setComputerShipsRemaining(17);
    setStartTime(new Date()); // Set start time when game resets
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-sky-900 text-white p-4">
      {/* Header */}
      <header className="text-center mb-6">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-2 font-serif tracking-tight">
          BATTLESHIP
        </h1>
        <h2 className="text-2xl md:text-3xl font-semibold text-cyan-200 font-mono">
          BATTLE IN PROGRESS
        </h2>
      </header>

      {/* Game Status */}
      <div className="text-center mb-6">
        <div className="bg-blue-800/40 p-4 rounded-xl backdrop-blur-sm border border-cyan-400/20 shadow-lg inline-block">
          <p className="text-xl font-semibold text-cyan-100 mb-2">{message}</p>
          {gamePhase === PHASE_SETUP && (
            <div className="flex items-center justify-center gap-4">
              <p className="text-sm text-gray-300">
                Placing: {SHIPS[currentShipIndex]?.name} ({SHIPS[currentShipIndex]?.length} cells)
              </p>
              <button
                onClick={() => setIsHorizontal(!isHorizontal)}
                className="px-3 py-1 bg-cyan-600 hover:bg-cyan-500 rounded text-sm font-medium"
              >
                {isHorizontal ? 'Horizontal' : 'Vertical'}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Game Boards */}
      <div className="flex flex-col lg:flex-row justify-center items-start gap-8 mb-8">
        {/* Player Board */}
        <div className="flex flex-col items-center">
          <div className="bg-blue-800/40 p-6 rounded-xl backdrop-blur-sm border border-cyan-400/20 shadow-lg">
            <h3 className="text-xl font-bold text-white mb-4 text-center">YOUR FLEET</h3>
            <div className="grid grid-cols-10 gap-1 mb-4">
              {playerBoard.map((row, rowIndex) =>
                row.map((cell, colIndex) => (
                  <div
                    key={`player-${rowIndex}-${colIndex}`}
                    className={getCellClass(cell, true, computerShots, rowIndex, colIndex)}
                    onClick={() => handleCellClick(rowIndex, colIndex)}
                  >
                    {getCellContent(cell, computerShots, rowIndex, colIndex)}
                  </div>
                ))
              )}
            </div>
            {/* <div className="text-center">
              <p className="text-sm text-cyan-200">Ships Remaining: {playerShipsRemaining}</p>
            </div> */}
          </div>
        </div>

        {/* VS Badge */}
        <div className="flex items-center justify-center my-4 lg:my-0">
          <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center shadow-lg shadow-red-500/30 animate-pulse">
            <span className="text-white font-bold text-xl">VS</span>
          </div>
        </div>

        {/* Computer Board */}
        <div className="flex flex-col items-center">
          <div className="bg-blue-800/40 p-6 rounded-xl backdrop-blur-sm border border-cyan-400/20 shadow-lg">
            <h3 className="text-xl font-bold text-white mb-4 text-center">ENEMY WATERS</h3>
            <div className="grid grid-cols-10 gap-1 mb-4">
              {computerBoard.map((row, rowIndex) =>
                row.map((cell, colIndex) => (
                  <div
                    key={`computer-${rowIndex}-${colIndex}`}
                    className={getCellClass(cell, false, playerShots, rowIndex, colIndex)}
                    onClick={() => handleAttack(rowIndex, colIndex)}
                  >
                    {getCellContent(cell, playerShots, rowIndex, colIndex)}
                  </div>
                ))
              )}
            </div>
            {/* <div className="text-center">
              <p className="text-sm text-cyan-200">Ships Remaining: {computerShipsRemaining}</p>
            </div> */}
          </div>
        </div>
      </div>

      {/* Game Controls */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={resetGame}
          className="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-lg shadow-md hover:shadow-cyan-500/50 transition-all"
        >
          New Game
        </button>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 bg-blue-700 hover:bg-blue-600 text-white font-bold rounded-lg shadow-md hover:shadow-blue-500/50 transition-all"
        >
          Back to Home
        </button>
        {/* <button
          onClick={() => window.location.href = '/'}
          className="px-6 py-3 bg-red-700 hover:bg-red-600 text-white font-bold rounded-lg shadow-md hover:shadow-red-500/50 transition-all"
        >
          Exit
        </button> */}
      </div>

      {/* Game Over Modal */}
      {gamePhase === PHASE_GAME_OVER && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-blue-800 p-8 rounded-xl border border-cyan-400/20 shadow-2xl text-center">
            <h2 className="text-4xl font-bold text-white mb-4">
              {winner === 'player' ? '🎉 VICTORY!' : '💀 DEFEAT!'}
            </h2>
            <p className="text-xl text-cyan-200 mb-6">{message}</p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={resetGame}
                className="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-lg"
              >
                Play Again
              </button>
              <button
                onClick={() => window.history.back()}
                className="px-6 py-3 bg-blue-700 hover:bg-blue-600 text-white font-bold rounded-lg"
              >
                Back to Menu
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="text-center">
        <p className="text-blue-300 text-sm opacity-70">
          {gamePhase === PHASE_SETUP ?
            'Click on your board to place ships. Use the Horizontal/Vertical button to rotate.' :
            'Click on enemy waters to fire. Hit all enemy ships to win!'
          }
        </p>
      </div>
    </div>
  );
}