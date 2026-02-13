'use client';
import { useState } from 'react';

export default function LoginScreen({ onLogin }) {
  const [nickname, setNickname] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (nickname.toLowerCase() !== 'nibi') {
      setError('Wrong nickname! Try again 💔');
      return;
    }
    
    if (date !== '2003-05-19') {
      setError('Wrong date of birth! Think again 🤔');
      return;
    }
    
    onLogin();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10 max-w-md w-full border-4 border-pink-300 my-4">
        <div className="text-center mb-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-red-500 mb-2">
            💝 Valentine's Game 💝
          </h1>
          <p className="text-gray-600 text-xs sm:text-sm md:text-base">
            Guess karo kaun ho tum? 😏
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2 text-xs sm:text-sm md:text-base">
              Your Nickname 💕
            </label>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-xl border-2 border-pink-200 focus:border-pink-400 focus:outline-none text-gray-800 text-sm sm:text-base md:text-lg"
              placeholder="Enter your nickname"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2 text-xs sm:text-sm md:text-base">
              Date of Birth 🎂
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-xl border-2 border-pink-200 focus:border-pink-400 focus:outline-none text-gray-800 text-sm sm:text-base md:text-lg"
              required
            />
          </div>

          {error && (
            <div className="bg-red-100 border-2 border-red-300 text-red-700 px-4 py-3 rounded-xl text-center animate-shake">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold py-3 px-4 sm:py-4 sm:px-6 rounded-xl hover:from-pink-600 hover:to-red-600 transform hover:scale-105 transition-all duration-200 shadow-lg text-sm sm:text-base md:text-lg"
          >
            Let's Play! 🎮
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-500 text-xs md:text-sm">
            Made with ❤️ for someone special
          </p>
        </div>
      </div>
    </div>
  );
}
