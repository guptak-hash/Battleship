// const mongoose = require('mongoose');

// const gameSchema = new mongoose.Schema({
//   player: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
//   opponentType: {
//     type: String,
//     enum: ['computer', 'human'],
//     required: true
//   },
//   result: {
//     type: String,
//     enum: ['win', 'loss', 'draw', 'incomplete'],
//     required: true
//   },
//   duration: {
//     type: Number, // in seconds
//     required: true
//   },
//   datePlayed: {
//     type: Date,
//     default: Date.now
//   }
// });

// module.exports = mongoose.model('Game', gameSchema);




const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  player: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  result: {
    type: String,
    enum: ['win', 'loss'],
    required: true
  },
  duration: {  // in seconds
    type: Number,
    required: true
  },
  datePlayed: {
    type: Date,
    default: Date.now
  }
}, { versionKey: false });  // Disable version key

module.exports = mongoose.model('Game', gameSchema);