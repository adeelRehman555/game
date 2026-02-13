'use client';
import { useState, useEffect, useRef } from 'react';

export default function GameScreen({ onGameOver }) {
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameSpeed, setGameSpeed] = useState(1.5);
  const [playerPos, setPlayerPos] = useState({ x: 20, y: 50 }); // percentage based
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
  const playerPosRef = useRef(playerPos);
  const itemsRef = useRef(items);
  const obstaclesRef = useRef(obstacles);
  const powerupsRef = useRef(powerups);
  const activePowerupRef = useRef(activePowerup);

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

  useEffect(() => {
    activePowerupRef.current = activePowerup;
  }, [activePowerup]);

  // Funny score deduction texts
  const deductionTexts = [
    { text: "-5 Aniba kyunke tum bahut khubsurat lag rahi ho 😍", amount: 5 },
    { text: "-10 Aniba wo smile dekh ke focus kho gaya 😊", amount: 10 },
    { text: "-5 Aniba tumhari aankhein bahut pyari hain 💕", amount: 5 },
    { text: "-10 Aniba tumhare paas hoon toh concentrate nahi ho pata 😘", amount: 10 },
    { text: "-5 Aniba tum ne blink kiya 😜", amount: 5 },
    { text: "-10 Aniba... bas kyunke 🤭", amount: 10 },
    { text: "-5 Aniba zidd karne pe 😤", amount: 5 },
    { text: "-10 kyunke maine kaha Aniba 😏", amount: 10 },
    { text: "-5 Aniba itni cutu si ho 🥰", amount: 5 },
    { text: "-10 Aniba dimples dikhe 😍", amount: 10 },
    { text: "-5 Aniba bahut smart ho 🤓", amount: 5 },
    { text: "-10 Aniba mera dil churaya tumne 💝", amount: 10 },
    { text: "-5 Aniba hasna mana hai 😆", amount: 5 },
    { text: "-10 Aniba tum perfect ho ✨", amount: 10 },
    { text: "-5 Aniba meri favorite ho 💗", amount: 5 },
    { text: "-8 Aniba aaj bohot pyari lag rahi ho 🌹", amount: 8 },
    { text: "-7 Aniba tumhari awaaz yaad aa gayi 🎵", amount: 7 },
    { text: "-10 Aniba cheating kar raha hoon kyunke pyar hai 😇", amount: 10 },
    { text: "-5 Aniba tumne hans diya ab kaise jeetu? 😂", amount: 5 },
    { text: "-10 Aniba sochna band karo, dil sun lo 💖", amount: 10 },
  ];

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

  // Play sound effect
  const playSound = (type) => {
    if (isMuted) return;
    
    try {
      const audio = new Audio();
      if (type === 'collect') {
        // Simple beep sound using Web Audio API
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
    }, 25);

    return () => clearInterval(movementIntervalRef.current);
  }, [keysPressed, activePowerup]);

  // Initialize game
  useEffect(() => {
    setGameText("Chalo Aniba game start ho gai! 🎮");
    
    // Show helpful tips at start
    setTimeout(() => setGameText("Hearts collect karo Aniba! ❤️"), 3000);
    setTimeout(() => setGameText("Obstacles se bacho Aniba! ⚠️"), 6000);
    
    // Spawn items periodically
    itemSpawnRef.current = setInterval(() => {
      spawnItem();
      spawnObstacle(); // Obstacles from start!
      if (Math.random() < 0.12) spawnPowerup(); // 12% chance
    }, 1800);

    // Random score deductions
    scoreDeductRef.current = setInterval(() => {
      if (score > 10 && Math.random() < 0.35) { // 35% chance when score > 10
        const deduction = deductionTexts[Math.floor(Math.random() * deductionTexts.length)];
        setScore(prev => Math.max(0, prev - deduction.amount));
        setGameText(deduction.text);
        playSound('hit');
      }
    }, 8000);

    // Increase speed over time - balanced progression
    speedIncreaseRef.current = setInterval(() => {
      setGameSpeed(prev => {
        const newSpeed = Math.min(prev + 0.3, 5);
        if (newSpeed < 4.8) setGameText("Speed badh gai Aniba! Sambhal ke! 🚀");
        return newSpeed;
      });
    }, 15000);

    // Game loop - 30ms for smooth 33fps performance
    gameLoopRef.current = setInterval(() => {
      updateGame();
      checkCollisions();
    }, 30);

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
      setTimeout(() => onGameOver(score), 500);
    }
    if (score >= 100) {
      clearInterval(gameLoopRef.current);
      clearInterval(itemSpawnRef.current);
      clearInterval(scoreDeductRef.current);
      clearInterval(speedIncreaseRef.current);
      clearInterval(movementIntervalRef.current);
      setTimeout(() => onGameOver(score), 500);
    }
  }, [lives, score]);

  const spawnItem = () => {
    const newY = Math.random() * 75 + 12; // Random Y position
    
    // Check if there's already something too close at this Y position
    const tooClose = [...items, ...obstacles, ...powerups].some(existing => {
      return Math.abs(existing.y - newY) < 15 && existing.x > 80; // Check if within 15 units vertically and still on screen
    });
    
    if (tooClose) return; // Skip spawning if too close to another item
    
    const newItem = {
      id: Math.random(),
      x: 100,
      y: newY,
      type: 'heart'
    };
    setItems(prev => [...prev, newItem]);
  };

  const spawnObstacle = () => {
    const newY = Math.random() * 75 + 12; // Random Y position
    
    // Check if there's already something too close at this Y position
    const tooClose = [...items, ...obstacles, ...powerups].some(existing => {
      return Math.abs(existing.y - newY) < 15 && existing.x > 80; // Check if within 15 units vertically and still on screen
    });
    
    if (tooClose) return; // Skip spawning if too close to another item
    
    const types = [
      { type: 'rose', damage: 'life' },      // 🥀 Takes 1 life
      { type: 'broken', damage: 'score' }    // 💔 Takes 2 score
    ];
    const selectedType = types[Math.floor(Math.random() * types.length)];
    const newObstacle = {
      id: Math.random(),
      x: 100,
      y: newY,
      type: selectedType.type,
      damage: selectedType.damage
    };
    setObstacles(prev => [...prev, newObstacle]);
  };

  const spawnPowerup = () => {
    const newY = Math.random() * 75 + 12; // Random Y position
    
    // Check if there's already something too close at this Y position
    const tooClose = [...items, ...obstacles, ...powerups].some(existing => {
      return Math.abs(existing.y - newY) < 15 && existing.x > 80; // Check if within 15 units vertically and still on screen
    });
    
    if (tooClose) return; // Skip spawning if too close to another item
    
    const types = ['shield', 'speed', 'magnet', 'life'];
    const newPowerup = {
      id: Math.random(),
      x: 100,
      y: newY,
      type: types[Math.floor(Math.random() * types.length)]
    };
    setPowerups(prev => [...prev, newPowerup]);
  };

  const updateGame = () => {
    // Move items
    setItems(prev => prev
      .map(item => ({ ...item, x: item.x - gameSpeed }))
      .filter(item => item.x > -10)
    );

    // Move obstacles
    setObstacles(prev => prev
      .map(obs => ({ ...obs, x: obs.x - gameSpeed }))
      .filter(obs => obs.x > -10)
    );

    // Move powerups
    setPowerups(prev => prev
      .map(pow => ({ ...pow, x: pow.x - gameSpeed }))
      .filter(pow => pow.x > -10)
    );
  };

  const checkCollisions = () => {
    // EQUAL range for ALL emojis - consistent across entire screen
    const collisionRange = 10;
    const magnetRange = 25; // Magnet pulls hearts from farther away
    
    // Track what we've already processed this frame to prevent double hits
    const processedItems = new Set();
    const processedObstacles = new Set();
    const processedPowerups = new Set();

    // Check heart collection - ONE heart per frame max (unless magnet is active)
    setItems(prev => {
      const remaining = [];
      let heartCollected = false;
      const useRange = activePowerup === 'magnet' ? magnetRange : collisionRange;
      
      for (const item of prev) {
        if (processedItems.has(item.id)) {
          remaining.push(item);
          continue;
        }
        
        const xDiff = Math.abs(item.x - playerPos.x);
        const yDiff = Math.abs(item.y - playerPos.y);
        
        // Check if touching (within range in BOTH X and Y)
        if (xDiff <= useRange && yDiff <= useRange && !heartCollected) {
          setScore(s => s + 1); // +1 score per heart
          playSound('collect');
          const randomText = gameTexts[Math.floor(Math.random() * gameTexts.length)];
          setGameText(randomText);
          processedItems.add(item.id);
          heartCollected = true;
          // DON'T add to remaining - it's collected!
        } else {
          remaining.push(item);
        }
      }
      return remaining;
    });

    // Check obstacle collision - ONE obstacle per frame max
    if (activePowerup !== 'shield') {
      setObstacles(prev => {
        const remaining = [];
        let obstacleHit = false;
        
        for (const obs of prev) {
          if (obstacleHit || processedObstacles.has(obs.id)) {
            remaining.push(obs);
            continue;
          }
          
          const xDiff = Math.abs(obs.x - playerPos.x);
          const yDiff = Math.abs(obs.y - playerPos.y);
          
          // Check if touching (within range in BOTH X and Y)
          if (xDiff <= collisionRange && yDiff <= collisionRange) {
            // Apply damage based on obstacle type
            if (obs.damage === 'life') {
              // Flower takes -1 life ONLY
              setLives(l => {
                const newLives = l - 1;
                return Math.max(0, newLives);
              });
              setGameText("🥀 Aniba phool ke kante lag gaye! -1 Life! 💔");
            } else if (obs.damage === 'score') {
              // Broken heart takes -2 score ONLY
              setScore(s => {
                const newScore = s - 2;
                return Math.max(0, newScore);
              });
              setGameText("💔 Aniba broken heart! -2 Score! 😢");
            }
            playSound('hit');
            processedObstacles.add(obs.id);
            obstacleHit = true;
            // DON'T add to remaining - it hit us!
          } else {
            remaining.push(obs);
          }
        }
        return remaining;
      });
    } else {
      // Shield active - just remove obstacles that go off screen
      setObstacles(prev => prev.filter(obs => obs.x > -10));
    }

    // Check powerup collection - ONE powerup per frame max
    setPowerups(prev => {
      const remaining = [];
      let powerupCollected = false;
      
      for (const pow of prev) {
        if (powerupCollected || processedPowerups.has(pow.id)) {
          remaining.push(pow);
          continue;
        }
        
        const xDiff = Math.abs(pow.x - playerPos.x);
        const yDiff = Math.abs(pow.y - playerPos.y);
        
        // Check if touching (within range in BOTH X and Y)
        if (xDiff <= collisionRange && yDiff <= collisionRange) {
          if (pow.type === 'life') {
            // Light gives +1 life ONLY
            setLives(l => {
              const newLives = l + 1;
              return Math.min(5, newLives);
            });
            setGameText("💡 Aniba light mil gayi! +1 Life! 🎉");
            playSound('collect');
          } else {
            setActivePowerup(pow.type);
            playSound('collect');
            if (pow.type === 'shield') {
              setGameText("💫 Aniba shield mil gaya! 5 seconds safe! ✨");
            } else if (pow.type === 'speed') {
              setGameText("⚡ Aniba speed boost! 3 seconds fast! 🚀");
            } else if (pow.type === 'magnet') {
              setGameText("🧲 Aniba magnet mil gaya! 3 seconds auto-collect! 💫");
            }
            setTimeout(() => setActivePowerup(null), pow.type === 'speed' || pow.type === 'magnet' ? 3000 : 5000);
          }
          processedPowerups.add(pow.id);
          powerupCollected = true;
          // DON'T add to remaining - it's collected!
        } else {
          remaining.push(pow);
        }
      }
      return remaining;
    });
  };

  const movePlayer = (direction) => {
    setPlayerPos(prev => {
      let newPos = { ...prev };
      const moveSpeed = activePowerup === 'speed' ? 5 : 3;

      switch(direction) {
        case 'up':
          newPos.y = Math.max(5, prev.y - moveSpeed);
          break;
        case 'down':
          newPos.y = Math.min(90, prev.y + moveSpeed);
          break;
        case 'left':
          newPos.x = Math.max(5, prev.x - moveSpeed);
          setFacingRight(false);
          break;
        case 'right':
          newPos.x = Math.min(40, prev.x + moveSpeed);
          setFacingRight(true);
          break;
      }
      return newPos;
    });
  };

  const getObstacleEmoji = (type) => {
    switch(type) {
      case 'rose': return '🥀'; // Takes 1 life
      case 'broken': return '💔'; // Takes 2 score
      default: return '💔';
    }
  };

  const getPowerupEmoji = (type) => {
    switch(type) {
      case 'shield': return '💫';
      case 'speed': return '⚡';
      case 'magnet': return '🧲';
      case 'life': return '💡';
      default: return '✨';
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-r from-pink-200 via-purple-200 to-red-200 overflow-hidden game-container">
      {/* Game Info Bar */}
      <div className="absolute top-0 left-0 right-0 bg-black/50 text-white p-2 md:p-3 flex justify-between items-center z-20">
        <div className="flex items-center gap-2 md:gap-4">
          <div className="text-lg md:text-xl lg:text-2xl font-bold">
            Score: {score}/100
          </div>
          <div className="flex gap-1">
            {[...Array(Math.max(0, lives || 0))].map((_, i) => (
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

      {/* Active Powerup Indicator */}
      {activePowerup && (
        <div className="absolute top-12 md:top-16 right-2 md:right-4 bg-yellow-400 text-black px-2 md:px-4 py-1 md:py-2 rounded-full text-xs md:text-base font-bold z-20 animate-pulse">
          {getPowerupEmoji(activePowerup)} Active!
        </div>
      )}

      {/* Game Area */}
      <div className="relative w-full h-full">
        {/* Player Character */}
        <div
          className="absolute transition-all duration-100"
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
            className={`w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 object-contain ${activePowerup === 'shield' ? 'ring-4 ring-blue-400 rounded-full' : ''}`}
          />
        </div>

        {/* Hearts */}
        {items.map(item => (
          <div
            key={item.id}
            className="absolute text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
            style={{
              left: `${item.x}%`,
              top: `${item.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            ❤️
          </div>
        ))}

        {/* Obstacles */}
        {obstacles.map(obs => (
          <div
            key={obs.id}
            className="absolute text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
            style={{
              left: `${obs.x}%`,
              top: `${obs.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            {getObstacleEmoji(obs.type)}
          </div>
        ))}

        {/* Powerups */}
        {powerups.map(pow => (
          <div
            key={pow.id}
            className="absolute text-3xl sm:text-4xl md:text-5xl lg:text-6xl animate-spin"
            style={{
              left: `${pow.x}%`,
              top: `${pow.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            {getPowerupEmoji(pow.type)}
          </div>
        ))}
      </div>

      {/* Controls - Always visible but can use keyboard too */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-between px-4 z-20">
        {/* Left Controls - Up/Down */}
        <div className="flex flex-col gap-2">
          <button
            onTouchStart={() => movePlayer('up')}
            onMouseDown={() => movePlayer('up')}
            className="bg-white/90 hover:bg-white w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-xl shadow-xl font-bold text-2xl md:text-3xl active:scale-95 transition-transform border-2 border-pink-300"
          >
            ⬆️
          </button>
          <button
            onTouchStart={() => movePlayer('down')}
            onMouseDown={() => movePlayer('down')}
            className="bg-white/90 hover:bg-white w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-xl shadow-xl font-bold text-2xl md:text-3xl active:scale-95 transition-transform border-2 border-pink-300"
          >
            ⬇️
          </button>
        </div>

        {/* Right Controls - Left/Right */}
        <div className="flex gap-2">
          <button
            onTouchStart={() => movePlayer('left')}
            onMouseDown={() => movePlayer('left')}
            className="bg-white/90 hover:bg-white w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-xl shadow-xl font-bold text-2xl md:text-3xl active:scale-95 transition-transform border-2 border-pink-300"
          >
            ⬅️
          </button>
          <button
            onTouchStart={() => movePlayer('right')}
            onMouseDown={() => movePlayer('right')}
            className="bg-white/90 hover:bg-white w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-xl shadow-xl font-bold text-2xl md:text-3xl active:scale-95 transition-transform border-2 border-pink-300"
          >
            ➡️
          </button>
        </div>
      </div>

      {/* Desktop hint */}
      {!isMobile && (
        <div className="absolute bottom-32 md:bottom-36 left-1/2 transform -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded-full text-xs sm:text-sm z-20">
          Use Arrow Keys or WASD to move
        </div>
      )}
    </div>
  );
}
