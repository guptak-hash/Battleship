import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
    const { user, logout } = useAuth();
    const [stats, setStats] = useState(null);
    const [gameHistory, setGameHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            // Fetch user stats
            axios.get('/api/games/stats')
                .then(res => {
                    console.log(res.data.user[0].stats)
                    setStats({...res.data.user[0].stats});
                })
                .catch(err => {
                    console.error('Error fetching stats:', err);
                });

        }
    }, [user]);

    if (!user) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-900 to-sky-900 text-white flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl mb-4">Please log in to view your profile</h2>
                    <a href="/login" className="bg-cyan-600 hover:bg-cyan-500 text-white py-2 px-4 rounded-lg">
                        Login
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-900 to-sky-900 text-white p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* User Info */}
                    <div className="bg-blue-800/40 p-6 rounded-xl backdrop-blur-sm border border-cyan-400/20 shadow-lg flex-1">
                        <h2 className="text-3xl font-bold mb-6">Profile</h2>
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-sm text-cyan-300">Username</h3>
                                <p className="text-xl">{user.username}</p>
                            </div>
                            <div>
                                <h3 className="text-sm text-cyan-300">Email</h3>
                                <p className="text-xl">{user.email}</p>
                            </div>
                            <div>
                                <h3 className="text-sm text-cyan-300">Member Since</h3>
                                <p className="text-xl">{new Date(user.createdAt).toLocaleDateString()}</p>
                            </div>
                            <div>
                                <h3 className="text-sm text-cyan-300">Last Login</h3>
                                <p className="text-xl">{user.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'Never'}</p>
                            </div>
                            <button
                                onClick={()=>navigate('/')}
                                className="mt-6 bg-red-600 hover:bg-red-500 text-white py-2 px-4 rounded-lg"
                            >
                                Go Back
                            </button>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="bg-blue-800/40 p-6 rounded-xl backdrop-blur-sm border border-cyan-400/20 shadow-lg flex-1">
                        <h2 className="text-3xl font-bold mb-6">Game Stats</h2>
                        {loading ? (
                            <p>Loading stats...</p>
                        ) : stats ? (
                            <div className="grid grid-cols-3 gap-4">
                                <div className="bg-blue-900/50 p-4 rounded-lg">
                                    <h3 className="text-sm text-cyan-300">Games Played</h3>
                                    <p className="text-2xl font-bold">{stats.gamesPlayed}</p>
                                </div>
                                <div className="bg-blue-900/50 p-4 rounded-lg">
                                    <h3 className="text-sm text-cyan-300">Wins</h3>
                                    <p className="text-2xl font-bold">{stats.wins}</p>
                                </div>
                                <div className="bg-blue-900/50 p-4 rounded-lg">
                                    <h3 className="text-sm text-cyan-300">Losses</h3>
                                    <p className="text-2xl font-bold">{stats.losses}</p>
                                </div>
                            </div>
                        ) : (
                            <p>No stats available</p>
                        )}
                    </div>
                </div>

                {/* Game History */}
                {/* <div className="mt-8 bg-blue-800/40 p-6 rounded-xl backdrop-blur-sm border border-cyan-400/20 shadow-lg">
                    <h2 className="text-3xl font-bold mb-6">Recent Games</h2>
                    {loading ? (
                        <p>Loading game history...</p>
                    ) : gameHistory.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="text-left border-b border-cyan-400/30">
                                        <th className="pb-2">Date</th>
                                        <th className="pb-2">Opponent</th>
                                        <th className="pb-2">Result</th>
                                        <th className="pb-2">Hits</th>
                                        <th className="pb-2">Misses</th>
                                        <th className="pb-2">Duration</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {gameHistory.map((game, index) => (
                                        <tr key={index} className="border-b border-cyan-400/10 hover:bg-blue-900/30">
                                            <td className="py-3">{new Date(game.datePlayed).toLocaleString()}</td>
                                            <td>{game.opponentType === 'computer' ? 'Computer' : 'Human'}</td>
                                            <td>
                                                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${game.result === 'win' ? 'bg-green-500/30 text-green-300' :
                                                        game.result === 'loss' ? 'bg-red-500/30 text-red-300' :
                                                            'bg-gray-500/30 text-gray-300'
                                                    }`}>
                                                    {game.result}
                                                </span>
                                            </td>
                                            <td>{game.playerHits}</td>
                                            <td>{game.playerMisses}</td>
                                            <td>{Math.floor(game.duration / 60)}m {game.duration % 60}s</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p>No game history yet</p>
                    )}
                </div> */}
            </div>
        </div>
    );
}