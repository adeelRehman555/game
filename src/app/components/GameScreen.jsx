'use client';
import { useState, useEffect, useRef } from 'react';

export default function GameScreen({ onGameOver }) {
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(5);
  const [gameSpeed, setGameSpeed] = useState(1.8);
  const [playerPos, setPlayerPos] = useState({ x: 20, y: 50 });
  const [facingRight, setFacingRight] = useState(true);
  const [items, setItems] = useState([]);
  const [obstacles, setObstacles] = useState([]);
  const [powerups, setPowerups] = useState([]);
  const [activePowerup, setActivePowerup] = useState(null);
  const [gameText, setGameText] = useState("Chalo game start ho gai! 🎮");
  const [isMuted, setIsMuted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [keysPressed, setKeysPressed] = useState({});
  const gameLoopRef = useRef(null);
  const itemSpawnRef = useRef(null);
  const scoreDeductRef = useRef(null);
  const speedIncreaseRef = useRef(null);
  const movementIntervalRef = useRef(null);
  const scoreRef = useRef(score); // Add ref for score
  const playerPosRef = useRef(playerPos);
  const itemsRef = useRef(items);
  const obstaclesRef = useRef(obstacles);
  const powerupsRef = useRef(powerups);

  // Keep score ref in sync
  useEffect(() => {
    scoreRef.current = score;
  }, [score]);
  const gameContainerRef = useRef(null);

  // Keep refs in sync with state
  useEffect(() => {
    playerPosRef.current = playerPos;
  }, [playerPos]);

  useEffect(() => {
    itemsRef.current = items;
  }, [items]);

  useEffect(() => {
    obstaclesRef.current = obstacles;
  }, [obstacles]);

  useEffect(() => {
    powerupsRef.current = powerups;
  }, [powerups]);

  // Roman Urdu game texts
  const gameTexts = [
    "Shabash Aniba! Dil mil gaya ❤️",
    "Bacho Aniba bacho! ⚠️",
    "Koshish aur karo Aniba! 💪",
    "Wah wah Aniba! 👏",
    "Aray bacho Aniba! 😱",
    "Bohot khub Aniba! 🌟",
    "Dhyan se Aniba! 👀",
    "Aniba haarna manzoor hai? 😏",
    "Challenge accept karo Aniba! 🎯",
    "Focus Aniba focus! 🎮",
    "Kamaal kar diya Aniba! 💫",
    "Keep going Aniba! 🚀",
    "Yeh hui na baat Aniba! ⭐",
    "Ek aur Aniba! 🎊",
    "Perfect Aniba! 💯",
    "Mushkil hai Aniba par namumkin nahi! 💪",
    "Thoda aur try karo Aniba! 🎯",
    "Achha chal raha hai Aniba! 👍",
    "Haar mat mano Aniba! 💝",
    "Koshish jari rakho Aniba! 🔥",
    "Bohot accha Aniba! 🎉",
    "Alag level Aniba! ⚡",
    "Champion vibes Aniba! 👑",
    "Score badh raha hai Aniba! 📈",
  ];

  // Deduction texts for broken hearts
  const deductionTexts = [
    "Arre Aniba! Broken heart ❤️‍🩹 -2",
    "Oho! Yeh toh toda! 💔 -2",
    "Aniba bacho! Broken heart! 😢 -2",
    "Nahi Aniba! Yeh accha nahi hai 💔 -2",
    "Sorry Aniba! Score kam ho gaya 📉 -2",
  ];

  // Funny cheating score deductions - MANY reasons to make winning very hard!
  const cheatingTexts = [
    { text: "Aniba tum bohot khubsurat lag rahi ho -5 😍", amount: 5 },
    { text: "Aniba wo smile dekh ke focus kho gaya -10 😊", amount: 10 },
    { text: "Aniba tumhari aankhein bahut pyari hain -5 💕", amount: 5 },
    { text: "Aniba tumhare paas hoon toh concentrate nahi ho pata -10 😘", amount: 10 },
    { text: "Aniba tum ne blink kiya -5 😜", amount: 5 },
    { text: "Aniba... bas kyunke -10 🤭", amount: 10 },
    { text: "Aniba zidd karne pe -5 😤", amount: 5 },
    { text: "Kyunke maine kaha Aniba -10 😏", amount: 10 },
    { text: "Aniba itni cute si ho -5 🥰", amount: 5 },
    { text: "Aniba dimples dikhe -10 😍", amount: 10 },
    { text: "Aniba bahut smart ho -5 🤓", amount: 5 },
    { text: "Aniba mera dil churaya tumne -10 💝", amount: 10 },
    { text: "Aniba hasna mana hai -5 😆", amount: 5 },
    { text: "Aniba tum perfect ho -10 ✨", amount: 10 },
    { text: "Aniba meri favorite ho -5 💗", amount: 5 },
    { text: "Aniba aaj bohot pyari lag rahi ho -8 🌹", amount: 8 },
    { text: "Aniba tumhari awaaz yaad aa gayi -7 🎵", amount: 7 },
    { text: "Aniba cheating kar raha hoon kyunke pyar hai -10 😇", amount: 10 },
    { text: "Aniba tumne hans diya ab kaise jeetu? -5 😂", amount: 5 },
    { text: "Aniba sochna band karo, dil sun lo -10 💖", amount: 10 },
    { text: "Aniba tum itni adorable ho -7 💞", amount: 7 },
    { text: "Aniba birthday yaad aa gaya -10 🎂", amount: 10 },
    { text: "Aniba tumse baat karke khush ho gaya -5 😊", amount: 5 },
    { text: "Aniba muskurahat dekh li -8 ☺️", amount: 8 },
    { text: "Aniba tumhara naam soch liya -5 👌", amount: 5 },
    { text: "Aniba focus nahi kar pa raha -10 😵", amount: 10 },
    { text: "Aniba bohot miss kar raha hoon -7 🥰", amount: 7 },
    { text: "Aniba tumhari baatein yaad aa gayi -5 💬", amount: 5 },
    { text: "Aniba pyar ho gaya na -10 😍", amount: 10 },
    { text: "Aniba game haar jao please -10 😂", amount: 10 },
  ];

  // Life loss texts
  const lifeLossTexts = [
    "Aniba! Life gayi! 🥀 -1 Life",
    "Oho! Bahut bura! 💔 -1 Life",
    "Bacho Aniba! Life kam ho gayi! 😱",
    "Nahi! Yeh accha nahi hua 🌹 -1 Life",
  ];

  // Life gain texts
  const lifeGainTexts = [
    "Wah Aniba! Extra Life! 💝 +1 Life",
    "Kamaal kar diya! Extra Life mil gayi! ✨",
    "Shabash! Life badh gayi! 💫",
    "Bohat khoob! Extra Life! 🌟",
  ];

  // Play sound effect
  const playSound = (type) => {
    if (isMuted) return;
    
    try {
      if (type === 'collect') {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        oscillator.frequency.value = 800;
        gainNode.gain.value = 0.1;
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.1);
      } else if (type === 'hit') {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        oscillator.frequency.value = 200;
        oscillator.type = 'triangle';
        gainNode.gain.value = 0.2;
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.2);
      } else if (type === 'life') {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        oscillator.frequency.value = 600;
        oscillator.type = 'sine';
        gainNode.gain.value = 0.15;
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.15);
      }
    } catch (e) {
      console.log('Audio not supported');
    }
  };

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Keyboard controls for desktop
  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase();
      if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright', 'w', 'a', 's', 'd'].includes(key)) {
        e.preventDefault();
        setKeysPressed(prev => ({ ...prev, [key]: true }));
      }
    };

    const handleKeyUp = (e) => {
      const key = e.key.toLowerCase();
      setKeysPressed(prev => ({ ...prev, [key]: false }));
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Handle continuous keyboard movement
  useEffect(() => {
    movementIntervalRef.current = setInterval(() => {
      if (keysPressed['arrowup'] || keysPressed['w']) movePlayer('up');
      if (keysPressed['arrowdown'] || keysPressed['s']) movePlayer('down');
      if (keysPressed['arrowleft'] || keysPressed['a']) movePlayer('left');
      if (keysPressed['arrowright'] || keysPressed['d']) movePlayer('right');
    }, 20);

    return () => clearInterval(movementIntervalRef.current);
  }, [keysPressed]);

  // Initialize game
  useEffect(() => {
    setGameText("Chalo Aniba game start ho gai! 🎮");
    
    setTimeout(() => setGameText("Hearts collect karo, dangers se bacho! ❤️💔🥀💝"), 3000);
    
    // Spawn items - balanced spawn rates
    itemSpawnRef.current = setInterval(() => {
      // Randomly decide what to spawn
      const random = Math.random();
      if (random < 0.42) { // 42% chance for heart (+1 score) - increased so she can score
        spawnItem();
      } else if (random < 0.70) { // 28% chance for broken heart (-2 score)
        spawnObstacle('broken');
      } else if (random < 0.92) { // 22% chance for rose (-1 life)
        spawnObstacle('rose');
      } else { // 8% chance for life gain (+1 life)
        spawnPowerup('life');
      }
    }, 1400);

    // Random funny score deductions - increases with score to give false hope!
    scoreDeductRef.current = setInterval(() => {
      const currentScore = scoreRef.current;
      
      // Calculate deduction probability based on score - starts easy, gets brutal!
      let deductionChance = 0.05; // 5% at start (very low)
      
      if (currentScore >= 30) deductionChance = 0.12; // 12% after score 30
      if (currentScore >= 50) deductionChance = 0.30; // 30% after score 50 - gets harder!
      if (currentScore >= 60) deductionChance = 0.45; // 45% after score 60 - much harder!
      if (currentScore >= 70) deductionChance = 0.60; // 60% after score 70 - very hard!
      if (currentScore >= 80) deductionChance = 0.75; // 75% after score 80 - brutal!
      if (currentScore >= 90) deductionChance = 0.85; // 85% after score 90 - almost impossible!
      
      if (Math.random() < deductionChance) {
        const deduction = cheatingTexts[Math.floor(Math.random() * cheatingTexts.length)];
        setScore(prev => Math.max(0, prev - deduction.amount));
        setGameText(deduction.text);
        try {
          playSound('hit');
        } catch(e) {
          console.log('Sound error:', e);
        }
      }
    }, 7000); // Every 7 seconds

    // Increase speed over time
    speedIncreaseRef.current = setInterval(() => {
      setGameSpeed(prev => {
        const newSpeed = Math.min(prev + 0.15, 3.2);
        if (newSpeed > prev) setGameText("Speed badh gai! Sambhal ke Aniba! 🚀");
        return newSpeed;
      });
    }, 18000);

    // Game loop - check collisions frequently
    gameLoopRef.current = setInterval(() => {
      updateGame();
      checkCollisions();
    }, 50);

    return () => {
      clearInterval(itemSpawnRef.current);
      clearInterval(scoreDeductRef.current);
      clearInterval(speedIncreaseRef.current);
      clearInterval(gameLoopRef.current);
      clearInterval(movementIntervalRef.current);
    };
  }, []);

  // Check if game over
  useEffect(() => {
    if (lives <= 0) {
      clearInterval(gameLoopRef.current);
      clearInterval(itemSpawnRef.current);
      clearInterval(scoreDeductRef.current);
      clearInterval(speedIncreaseRef.current);
      clearInterval(movementIntervalRef.current);
      setGameText("Game Over Aniba! 😢");
      setTimeout(() => onGameOver(score), 500);
    }
    if (score >= 100) {
      clearInterval(gameLoopRef.current);
      clearInterval(itemSpawnRef.current);
      clearInterval(scoreDeductRef.current);
      clearInterval(speedIncreaseRef.current);
      clearInterval(movementIntervalRef.current);
      setGameText("You Win Aniba! 🎉");
      setTimeout(() => onGameOver(score), 500);
    }
  }, [lives, score]);

  const spawnItem = () => {
    const newY = Math.random() * 80 + 10;
    
    const newItem = {
      id: Math.random(),
      x: 100,
      y: newY,
      type: 'heart'
    };
    setItems(prev => [...prev, newItem]);
  };

  const spawnObstacle = (type) => {
    const newY = Math.random() * 80 + 10;
    
    const newObstacle = {
      id: Math.random(),
      x: 100,
      y: newY,
      type: type // 'broken' or 'rose'
    };
    setObstacles(prev => [...prev, newObstacle]);
  };

  const spawnPowerup = (type) => {
    const newY = Math.random() * 80 + 10;
    
    const newPowerup = {
      id: Math.random(),
      x: 100,
      y: newY,
      type: type // 'life'
    };
    setPowerups(prev => [...prev, newPowerup]);
  };

  const updateGame = () => {
    // Move items left
    setItems(prev => prev
      .map(item => ({ ...item, x: item.x - gameSpeed }))
      .filter(item => item.x > -10)
    );
    
    // Move obstacles left
    setObstacles(prev => prev
      .map(obstacle => ({ ...obstacle, x: obstacle.x - gameSpeed }))
      .filter(obstacle => obstacle.x > -10)
    );
    
    // Move powerups left
    setPowerups(prev => prev
      .map(powerup => ({ ...powerup, x: powerup.x - gameSpeed }))
      .filter(powerup => powerup.x > -10)
    );
  };

  const checkCollisions = () => {
    if (!gameContainerRef.current) return;
    
    // Get the actual character element
    const characterElement = document.querySelector('.character-image');
    if (!characterElement) return;
    
    // Get character's actual position and dimensions
    const characterRect = characterElement.getBoundingClientRect();
    
    // Check hearts collisions (+1 score each)
    setItems(prev => {
      const remainingItems = [];
      let collectedHearts = 0;
      
      for (const item of prev) {
        const heartElement = document.querySelector(`[data-heart-id="${item.id}"]`);
        
        if (heartElement) {
          const heartRect = heartElement.getBoundingClientRect();
          
          const overlap = !(
            characterRect.right < heartRect.left ||
            characterRect.left > heartRect.right ||
            characterRect.bottom < heartRect.top ||
            characterRect.top > heartRect.bottom
          );
          
          if (overlap) {
            // Heart collected - increase counter
            collectedHearts++;
            playSound('collect');
            const randomText = gameTexts[Math.floor(Math.random() * gameTexts.length)];
            setGameText(randomText);
          } else {
            remainingItems.push(item);
          }
        } else {
          remainingItems.push(item);
        }
      }
      
      // Add +1 score for EACH heart collected
      if (collectedHearts > 0) {
        setScore(s => s + collectedHearts);
      }
      
      return remainingItems;
    });
    
    // Check obstacles collisions
    setObstacles(prev => {
      const remainingObstacles = [];
      let brokenHeartsHit = 0;
      let rosesHit = 0;
      
      for (const obstacle of prev) {
        const obstacleElement = document.querySelector(`[data-obstacle-id="${obstacle.id}"]`);
        
        if (obstacleElement) {
          const obstacleRect = obstacleElement.getBoundingClientRect();
          
          const overlap = !(
            characterRect.right < obstacleRect.left ||
            characterRect.left > obstacleRect.right ||
            characterRect.bottom < obstacleRect.top ||
            characterRect.top > obstacleRect.bottom
          );
          
          if (overlap) {
            playSound('hit');
            if (obstacle.type === 'broken') {
              // Broken heart hit - increase counter for -2 each
              brokenHeartsHit++;
              const randomText = deductionTexts[Math.floor(Math.random() * deductionTexts.length)];
              setGameText(randomText);
            } else if (obstacle.type === 'rose') {
              // Rose hit - increase counter for -1 life each
              rosesHit++;
              const randomText = lifeLossTexts[Math.floor(Math.random() * lifeLossTexts.length)];
              setGameText(randomText);
            }
          } else {
            remainingObstacles.push(obstacle);
          }
        } else {
          remainingObstacles.push(obstacle);
        }
      }
      
      // Apply broken heart penalties (-2 each)
      if (brokenHeartsHit > 0) {
        setScore(s => Math.max(0, s - (brokenHeartsHit * 2)));
      }
      
      // Apply rose penalties (-1 life each)
      if (rosesHit > 0) {
        setLives(l => Math.max(0, l - rosesHit));
      }
      
      return remainingObstacles;
    });
    
    // Check powerups collisions
    setPowerups(prev => {
      const remainingPowerups = [];
      let lifeGiftsCollected = 0;
      
      for (const powerup of prev) {
        const powerupElement = document.querySelector(`[data-powerup-id="${powerup.id}"]`);
        
        if (powerupElement) {
          const powerupRect = powerupElement.getBoundingClientRect();
          
          const overlap = !(
            characterRect.right < powerupRect.left ||
            characterRect.left > powerupRect.right ||
            characterRect.bottom < powerupRect.top ||
            characterRect.top > powerupRect.bottom
          );
          
          if (overlap) {
            playSound('life');
            if (powerup.type === 'life') {
              // Life gift collected - increase counter for +1 life each
              lifeGiftsCollected++;
              const randomText = lifeGainTexts[Math.floor(Math.random() * lifeGainTexts.length)];
              setGameText(randomText);
            }
          } else {
            remainingPowerups.push(powerup);
          }
        } else {
          remainingPowerups.push(powerup);
        }
      }
      
      // Apply life gain (+1 life each, max 5 lives)
      if (lifeGiftsCollected > 0) {
        setLives(l => {
          const newLives = l + lifeGiftsCollected;
          return Math.min(5, newLives); // Cap at 5 lives maximum
        });
      }
      
      return remainingPowerups;
    });
  };

  const movePlayer = (direction) => {
    setPlayerPos(prev => {
      let newPos = { ...prev };
      const moveSpeed = 2.5;

      switch(direction) {
        case 'up':
          newPos.y = Math.max(8, prev.y - moveSpeed);
          break;
        case 'down':
          newPos.y = Math.min(92, prev.y + moveSpeed);
          break;
        case 'left':
          newPos.x = Math.max(5, prev.x - moveSpeed);
          setFacingRight(false);
          break;
        case 'right':
          newPos.x = Math.min(35, prev.x + moveSpeed);
          setFacingRight(true);
          break;
      }
      return newPos;
    });
  };

  return (
    <div 
      ref={gameContainerRef}
      className="fixed inset-0 bg-gradient-to-r from-pink-200 via-purple-200 to-red-200 overflow-hidden game-container"
    >
      {/* Game Info Bar */}
      <div className="absolute top-0 left-0 right-0 bg-black/50 text-white p-2 md:p-3 flex justify-between items-center z-20">
        <div className="flex items-center gap-2 md:gap-4">
          <div className="text-lg md:text-xl lg:text-2xl font-bold">
            Score: {score}/100
          </div>
          <div className="flex gap-1">
            {[...Array(Math.max(0, lives))].map((_, i) => (
              <span key={i} className="text-xl md:text-2xl">❤️</span>
            ))}
          </div>
        </div>
        
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="bg-white/20 hover:bg-white/30 px-2 md:px-3 py-1 md:py-2 rounded-lg text-lg md:text-xl"
        >
          {isMuted ? '🔇' : '🔊'}
        </button>
      </div>

      {/* Game Text */}
      {gameText && (
        <div className="absolute top-12 md:top-16 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-4 md:px-6 py-2 md:py-3 rounded-full text-sm sm:text-base md:text-lg font-bold z-20 animate-bounce max-w-[90%] text-center">
          {gameText}
        </div>
      )}

      {/* Game Area */}
      <div className="relative w-full h-full">
        {/* Player Character */}
        <div
          className="absolute"
          style={{
            left: `${playerPos.x}%`,
            top: `${playerPos.y}%`,
            transform: 'translate(-50%, -50%)',
            zIndex: 10
          }}
        >
          <img
            src={facingRight ? '/char2.png' : '/char1.png'}
            alt="character"
            className="character-image w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 object-contain"
          />
        </div>

        {/* Hearts (+1 score each) */}
        {items.map(item => (
          <div
            key={item.id}
            data-heart-id={item.id}
            className="absolute text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
            style={{
              left: `${item.x}%`,
              top: `${item.y}%`,
              transform: 'translate(-50%, -50%)',
              zIndex: 5
            }}
          >
            ❤️
          </div>
        ))}

        {/* Obstacles - Broken Hearts (-2 score each) and Roses (-1 life each) */}
        {obstacles.map(obstacle => (
          <div
            key={obstacle.id}
            data-obstacle-id={obstacle.id}
            className="absolute text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
            style={{
              left: `${obstacle.x}%`,
              top: `${obstacle.y}%`,
              transform: 'translate(-50%, -50%)',
              zIndex: 5
            }}
          >
            {obstacle.type === 'broken' ? '💔' : '🥀'}
          </div>
        ))}

        {/* Powerups - Life Gain (+1 life each) */}
        {powerups.map(powerup => (
          <div
            key={powerup.id}
            data-powerup-id={powerup.id}
            className="absolute text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
            style={{
              left: `${powerup.x}%`,
              top: `${powerup.y}%`,
              transform: 'translate(-50%, -50%)',
              zIndex: 5
            }}
          >
            💝
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-between px-4 z-20">
        {/* Left Controls - Up/Down */}
        <div className="flex flex-col gap-2">
          <button
            onTouchStart={() => movePlayer('up')}
            onMouseDown={() => movePlayer('up')}
            className="bg-white/90 hover:bg-white w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-xl shadow-xl font-bold text-xl md:text-2xl active:scale-95 transition-transform border-2 border-pink-300"
          >
            ⬆️
          </button>
          <button
            onTouchStart={() => movePlayer('down')}
            onMouseDown={() => movePlayer('down')}
            className="bg-white/90 hover:bg-white w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-xl shadow-xl font-bold text-xl md:text-2xl active:scale-95 transition-transform border-2 border-pink-300"
          >
            ⬇️
          </button>
        </div>

        {/* Right Controls - Left/Right */}
        <div className="flex gap-2">
          <button
            onTouchStart={() => movePlayer('left')}
            onMouseDown={() => movePlayer('left')}
            className="bg-white/90 hover:bg-white w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-xl shadow-xl font-bold text-xl md:text-2xl active:scale-95 transition-transform border-2 border-pink-300"
          >
            ⬅️
          </button>
          <button
            onTouchStart={() => movePlayer('right')}
            onMouseDown={() => movePlayer('right')}
            className="bg-white/90 hover:bg-white w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-xl shadow-xl font-bold text-xl md:text-2xl active:scale-95 transition-transform border-2 border-pink-300"
          >
            ➡️
          </button>
        </div>
      </div>

      {/* Desktop hint */}
      {!isMobile && (
        <div className="absolute bottom-28 md:bottom-32 left-1/2 transform -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded-full text-xs sm:text-sm z-20">
          Use Arrow Keys or WASD to move
        </div>
      )}
    </div>
  );
}