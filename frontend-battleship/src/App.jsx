
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import GameRules from './pages/GameRules';
import About from './pages/About';
import SinglePlayer from './pages/SinglePlayer';
import GamePage from './pages/GamePage';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rules" element={<GameRules/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/singleplayer" element={<SinglePlayer/>}/>
          <Route path="/game" element={<GamePage/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/profile" element={<Profile/>}/>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;