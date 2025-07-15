import React from 'react'
import Navbar from '../components/Navbar'

function GameRules() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-sky-900 text-white font-sans">
      <Navbar />

      <section className="max-w-5xl mx-auto px-4 py-10">
        <h4 className="text-lg text-sky-300">Official Battleship</h4>
        <h1 className="text-4xl font-bold mb-6">GAME RULES</h1>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-sky-200 mb-2">Characteristics and Aim/Goal:</h2>
          <p className="leading-relaxed">
            Battleship Game is a board game for two players in which the opponents try to guess
            the location of their opponent's warships and sink them. The gameplay is straightforward.
            Each player hides ships on a grid/table containing vertical and horizontal space coordinates.
            Players take turns by hitting a coordinate on the other player's grid in an attempt to identify
            a square that contains a part of a ship. Each player can see two grids/tables — one for their own ships and one to track hits/misses.
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-sky-200 mb-2">Setting up the Game:</h2>
          <p className="leading-relaxed">
            Each player receives a game board and five ships:
            <br /><strong>• Carrier</strong> (5 points)
            <br /><strong>• Battleship</strong> (4 points)
            <br /><strong>• Cruiser</strong> (3 points)
            <br /><strong>• Submarine</strong> (3 points)
            <br /><strong>• Destroyer</strong> (2 points)
            <br /><br />
            Ships are placed horizontally or vertically (not diagonally), can't overlap, and cannot be moved after the game starts.
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-sky-200 mb-2">Gameplay:</h2>
          <p className="leading-relaxed">
            Players take turns firing at coordinates. A "hit" marks part of a ship; a "miss" marks water.
            Hits are shown in red, misses in white. When all parts of a ship are hit, it sinks.
            <br />
            <strong>The first player to sink all 5 opponent ships wins.</strong>
          </p>
        </div>

        <div className="text-sm text-sky-300">
          Game Rules with ❤️ from{" "}
          <a
            href="https://www.thesprucecrafts.com/the-basic-rules-of-battleship-411069"
            target="_blank"
            rel="noreferrer"
            className="underline hover:text-sky-100"
          >
            theSpruceCrafts
          </a>
        </div>
      </section>
    </div>
  );
}

export default GameRules
