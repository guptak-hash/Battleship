# Battleship Game - MERN Stack Implementation

![Battleship Game](https://example.com/path-to-your-game-screenshot.png) <!-- Add a screenshot later -->

A full-stack implementation of the classic Battleship board game using the MERN stack (MongoDB, Express.js, React, Node.js). This project features user authentication, game state management, and player statistics tracking.

## Features

- **User Authentication**
  - Registration with username, email, and password
  - Login with JWT token authentication
  - Protected routes for authenticated users

- **Gameplay**
  - Single-player mode against AI
  - Interactive game board with drag-and-drop ship placement
  - Real-time hit/miss feedback
  - Game timer and move history

- **Player Statistics**
  - Wins/losses tracking
  - Games played history
  - Performance metrics

- **Additional Features**
  - Game rules documentation
  - Responsive design for all screen sizes
  - Modern UI with Tailwind CSS

## Technologies Used

### Frontend
- React.js
- React Router DOM
- Tailwind CSS
- Vite (Build tool)
- Axios (HTTP client)

### Backend
- Node.js
- Express.js
- MongoDB (Database)
- Mongoose (ODM)
- JWT (Authentication)
- Bcryptjs (Password hashing)
- Joi (Validation)

## Installation

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- Git

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/guptak-hash/Battleship.git
   cd Battleship

2. **Backend Setup**
   cd backend-battleship
    npm install

3. **Create a .env file in the backend directory with:**
    PORT=5000
MONGODB_URI=your_mongodb_connection_string
TOKEN_SECRET=your_jwt_secret_key

4. **Frontend Setup**
cd ../frontend-battleship
npm install

5. **Run the application**
In one terminal (backend):
  cd backend-battleship
npm start

In another terminal (frontend):
cd frontend-battleship
npm run dev

6. **Access the application**
Frontend: http://localhost:5173 (or the port Vite uses)

Backend API: http://localhost:5000

### API Endpoints ###
**Authentication**
POST /api/auth/register - Register a new user

POST /api/auth/login - Login an existing user

**Game**
POST /api/games - Save game result (protected)

GET /api/games/stats - Get user game statistics (protected)