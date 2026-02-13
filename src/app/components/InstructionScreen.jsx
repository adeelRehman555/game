'use client';
import { useState, useEffect } from 'react';

export default function InstructionScreen({ onStart }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 max-w-2xl w-full border-4 border-pink-300 my-4">
        <div className="text-center mb-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-red-500 mb-2">
            🎮 Kaise Khelna Hai? 🎮
          </h1>
        </div>

        <div className="space-y-3 mb-4 text-gray-700">
          <div className="bg-pink-50 p-3 rounded-xl border-2 border-pink-200">
            <h3 className="font-bold text-base md:text-lg mb-1 text-pink-700">🎯 Goal:</h3>
            <p className="text-xs sm:text-sm md:text-base">
              Collect <span className="font-bold text-red-600">100 hearts ❤️</span> to prove you don't want to be my Valentine 😏
            </p>
          </div>

          <div className="bg-blue-50 p-3 rounded-xl border-2 border-blue-200">
            <h3 className="font-bold text-base md:text-lg mb-1 text-blue-700">🕹️ Controls:</h3>
            {isMobile ? (
              <>
                <p className="text-xs sm:text-sm md:text-base mb-1">
                  <span className="font-semibold">📱 Rotate phone to landscape!</span>
                </p>
                <ul className="text-xs space-y-0.5 ml-3">
                  <li>• ⬅️➡️ Left/Right buttons</li>
                  <li>• ⬆️⬇️ Up/Down buttons</li>
                </ul>
              </>
            ) : (
              <>
                <p className="text-xs sm:text-sm md:text-base mb-1">
                  <span className="font-semibold">⌨️ Arrow Keys or WASD!</span>
                </p>
                <ul className="text-xs space-y-0.5 ml-3">
                  <li>• ⬆️ Up / W • ⬇️ Down / S</li>
                  <li>• ⬅️ Left / A • ➡️ Right / D</li>
                </ul>
              </>
            )}
          </div>

          <div className="bg-green-50 p-3 rounded-xl border-2 border-green-200">
            <h3 className="font-bold text-base md:text-lg mb-1 text-green-700">✨ Collect:</h3>
            <ul className="text-xs space-y-0.5">
              <li>• ❤️ Hearts = +1 point each</li>
              <li>• � Light = +1 life!</li>
              <li>• 💫 Shield • ⚡ Speed • 🧲 Magnet (3 sec)</li>
            </ul>
          </div>

          <div className="bg-red-50 p-3 rounded-xl border-2 border-red-200">
            <h3 className="font-bold text-base md:text-lg mb-1 text-red-700">⚠️ Avoid:</h3>
            <ul className="text-xs space-y-0.5">
              <li>• 🥀 Wilted roses (lose 1 life)</li>
              <li>• 💔 Broken hearts (lose 2 points)</li>
            </ul>
          </div>

          <div className="bg-pink-100 p-3 rounded-xl border-2 border-pink-300">
            <p className="font-bold text-center text-sm md:text-base text-pink-700">
              ❤️ Apko 3 dil de diye hain, sare mujh pe harr jao hahaha 😂
            </p>
          </div>
        </div>

        <button
          onClick={onStart}
          className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold py-3 px-4 sm:py-4 sm:px-6 rounded-xl hover:from-pink-600 hover:to-red-600 transform hover:scale-105 transition-all duration-200 shadow-lg text-base sm:text-lg md:text-xl"
        >
          Chalo Shuru Karte Hain! 🚀
        </button>

        <p className="text-center text-gray-500 text-xs sm:text-sm mt-2">
          Good luck... tumhe zarurat padegi 😉
        </p>
      </div>
    </div>
  );
}
