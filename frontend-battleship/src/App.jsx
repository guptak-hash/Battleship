import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import GameRules from './pages/GameRules';
import About from './pages/About';
import SinglePlayer from './pages/SinglePlayer';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/rules' element={<GameRules/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/singleplayer' element={<SinglePlayer/>}/>
        {/* <Route path='/singleplayer' element={<div style={{color: 'red'}}>TEST</div>}/> */}
      </Routes>
    </Router>
  );
}

export default App;
