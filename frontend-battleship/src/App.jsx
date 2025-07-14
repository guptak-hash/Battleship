import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import GameRules from './pages/GameRules';
import About from './pages/About';
import SinglePlayer from './pages/SinglePlayer';
import GamePage from './pages/GamePage';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/rules' element={<GameRules/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/singleplayer' element={<SinglePlayer/>}/>
        <Route path='/game' element={<GamePage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
