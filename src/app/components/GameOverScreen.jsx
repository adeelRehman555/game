'use client';
import { useEffect, useState } from 'react';

export default function GameOverScreen({ score, onPlayAgain }) {
  const [showConfetti, setShowConfetti] = useState(false);
  const isWin = score >= 100;

  useEffect(() => {
    if (isWin) {
      setShowConfetti(true);
      
      // Optional: Add a timeout to stop confetti after some time
      const timeout = setTimeout(() => setShowConfetti(false), 5000);
      return () => clearTimeout(timeout);
    }
  }, [isWin]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-y-auto">
      {/* Confetti effect for winning */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-fall"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-20px`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
                fontSize: '24px',
                opacity: Math.random() * 0.8 + 0.2,
                transform: `rotate(${Math.random() * 360}deg)`
              }}
            >
              {['❤️', '💕', '💖', '💝', '🌹', '💘', '💓'][Math.floor(Math.random() * 7)]}
            </div>
          ))}
        </div>
      )}

      <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10 max-w-2xl w-full border-4 border-pink-300 text-center relative z-10 my-4">
        {isWin ? (
          // Winning Screen (very rare!)
          <>
            <div className="text-6xl md:text-8xl mb-4 animate-bounce">
              🎉
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-500 mb-4">
              Wow Aniba! Tum Jeet Gai! 😱
            </h1>
            <p className="text-2xl md:text-4xl font-bold text-pink-600 mb-6">
              Score: {score}/200 ✨
            </p>
            <div className="bg-green-50 p-6 rounded-xl border-2 border-green-200 mb-6">
              <p className="text-lg md:text-2xl text-gray-700 mb-2">
                Theek hai Aniba, tumhari marzi... 😊
              </p>
              <p className="text-base md:text-xl text-gray-600">
                Lekin dil toh mere paas hi rahega 💝
              </p>
            </div>
          </>
        ) : (
          // Losing Screen (most common!)
          <>
            <div className="text-6xl md:text-8xl mb-4 animate-pulse">
              💔
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-red-500 mb-4">
              Game Over Aniba! 😄
            </h1>
            <p className="text-2xl md:text-4xl font-bold text-red-600 mb-6">
              Score: {score}/200
            </p>
            <div className="bg-pink-50 p-6 rounded-xl border-2 border-pink-300 mb-6">
              <p className="text-lg md:text-2xl text-gray-700 mb-3 font-bold">
                Aniba haar gai! ❤️
              </p>
              <p className="text-base md:text-xl text-gray-600 mb-2">
                Ab toh meri Valentine banna padega 😍
              </p>
              <p className="text-sm md:text-lg text-gray-500 italic">
                "200 bohot mushkil hai Aniba, dil dena aasaan hai" 💕
              </p>
            </div>

            {/* Funny remarks based on score */}
            <div className="bg-red-50 p-4 rounded-xl border-2 border-red-200 mb-6">
              <p className="text-sm md:text-base text-gray-700">
                {score < 30 && "Itna kam? Koshish toh karo thori! 😂"}
                {score >= 30 && score < 50 && "Acha try tha, lekin kaafi nahi 😏"}
                {score >= 50 && score < 70 && "Qareeb pahanch gai, par nahi! 😉"}
                {score >= 70 && score < 90 && "Bohot close! Maar khao dobara 💪"}
                {score >= 90 && score < 200 && "Oh no! Sirf thora sa reh gaya! Phir try karo 🎯"}
              </p>
            </div>
          </>
        )}

        {/* Play Again Button */}
        <button
          onClick={onPlayAgain}
          className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold py-4 px-6 rounded-xl hover:from-pink-600 hover:to-red-600 transform hover:scale-105 transition-all duration-200 shadow-lg text-lg md:text-xl mb-4"
        >
          {isWin ? "Phir Khelo? 🎮" : "Jao Azmao Phir Khud Ko! 🚀"}
        </button>

        <p className="text-gray-500 text-xs md:text-sm">
          {isWin ? "Shayad is baar haar jao 😉" : "Is baar pakka jeet jaogi... shayad 😄"}
        </p>

        {/* Valentine message */}
        {!isWin && (
          <div className="mt-6 bg-gradient-to-r from-pink-100 to-red-100 p-6 rounded-xl border-2 border-pink-300">
            <p className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-red-600">
              Will you be my Valentine? 💝
            </p>
            <p className="text-sm md:text-base text-gray-600 mt-2">
              Game toh haar gai... ab haan bolo 😊
            </p>
          </div>
        )}
      </div>
    </div>
  );
}