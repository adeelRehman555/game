'use client';
import { useState } from 'react';
import LoginScreen from './components/LoginScreen';
import InstructionScreen from './components/InstructionScreen';
import GameScreen from './components/GameScreen';
import GameOverScreen from './components/GameOverScreen';

export default function Home() {
  const [gameState, setGameState] = useState('login'); // login, instructions, playing, gameover
  const [score, setScore] = useState(0);
  const [finalScore, setFinalScore] = useState(0);

  const handleLogin = () => {
    setGameState('instructions');
  };

  const handleStartGame = () => {
    setScore(0);
    setGameState('playing');
  };

  const handleGameOver = (finalScore) => {
    setFinalScore(finalScore);
    setGameState('gameover');
  };

  const handlePlayAgain = () => {
    setScore(0);
    setGameState('instructions');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-red-50 to-white overflow-y-auto">
      {gameState === 'login' && <LoginScreen onLogin={handleLogin} />}
      {gameState === 'instructions' && <InstructionScreen onStart={handleStartGame} />}
      {gameState === 'playing' && <GameScreen onGameOver={handleGameOver} />}
      {gameState === 'gameover' && <GameOverScreen score={finalScore} onPlayAgain={handlePlayAgain} />}
    </div>
  );
}
