// const express = require('express');
// const router = express.Router();
// const auth = require('../middleware/auth');
// const Game = require('../models/Game');
// const User = require('../models/User');

// // Save game result
// router.post('/', auth, async (req, res) => {
//   try {
//     const { result, opponentType, playerHits, playerMisses, opponentHits, opponentMisses, duration } = req.body;
    
//     const game = new Game({
//       player: req.user._id,
//       opponentType,
//       result,
//       playerHits,
//       playerMisses,
//       opponentHits,
//       opponentMisses,
//       duration
//     });

//     const savedGame = await game.save();
    
//     // Update user stats
//     const user = await User.findById(req.user._id);
//     user.stats.gamesPlayed += 1;
    
//     if (result === 'win') {
//       user.stats.wins += 1;
//       // Update best score if this is a new high score
//     //   const totalHits = playerHits;
//     //   if (totalHits > user.stats.bestScore) {
//     //     user.stats.bestScore = totalHits;
//     //   }
//     } else if (result === 'loss') {
//       user.stats.losses += 1;
//     }
    
//     await user.save();
    
//     res.send(savedGame);
//   } catch (err) {
//     res.status(400).send(err);
//   }
// });

// // Get user's game history
// router.get('/history', auth, async (req, res) => {
//   try {
//     const games = await Game.find({ player: req.user._id })
//       .sort({ datePlayed: -1 })
//       .limit(10);
//     res.send(games);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

// // Get user stats
// router.get('/stats', auth, async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id).select('stats');
//     res.send(user.stats);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

// module.exports = router;











const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Game = require('../models/Game');
const User = require('../models/User');

// Save final game result
router.post('/', auth, async (req, res) => {
  try {
    const { result, duration } = req.body;
    
    const game = new Game({
      player: req.user._id,
      result,
      duration
    });

    await game.save();
    
    // Update user stats
    const user = await User.findById(req.user._id);
    user.stats.gamesPlayed += 1;
    
    if (result === 'win') {
      user.stats.wins += 1;
    } else {
      user.stats.losses += 1;
    }
    
    await user.save();
    
    res.status(201).send(game);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Get user game history (only final results)
router.get('/stats', auth, async (req, res) => {
  try {
    const user = await User.find({ _id: req.user._id })
      console.log('user >> ',user)
    res.json({user})
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;