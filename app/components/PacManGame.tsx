'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';

interface Bird {
  x: number;
  y: number;
  velocity: number;
  rotation: number;
}

interface Pipe {
  x: number;
  topHeight: number;
  bottomHeight: number;
  passed: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
}

const FlappyBird: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'gameOver'>('menu');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [bird, setBird] = useState<Bird>({ x: 100, y: 200, velocity: 0, rotation: 0 });
  const [pipes, setPipes] = useState<Pipe[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);
  
  // Audio refs
  const jumpSoundRef = useRef<HTMLAudioElement | null>(null);
  const pointSoundRef = useRef<HTMLAudioElement | null>(null);
  const dieSoundRef = useRef<HTMLAudioElement | null>(null);
  
  const gameRef = useRef({
    bird: { x: 100, y: 200, velocity: 0, rotation: 0 },
    pipes: [] as Pipe[],
    particles: [] as Particle[],
    score: 0,
    gameState: 'menu' as 'menu' | 'playing' | 'gameOver',
    frameCount: 0
  });

  // Game constants - Made easier
  const CANVAS_WIDTH = 500;
  const CANVAS_HEIGHT = 500;
  const BIRD_SIZE = 28;
  const PIPE_WIDTH = 60;
  const PIPE_GAP = 160; // Increased from 140 for easier gameplay
  const GRAVITY = 0.4; // Reduced from 0.5 for slower falling
  const JUMP_FORCE = -8; // Reduced from -9 for more control
  const PIPE_SPEED = 2; // Reduced from 2.5 for more time to react
  const MAX_ROTATION = 25;
  const ROTATION_SPEED = 3;

  // Load high score from localStorage
  useEffect(() => {
    const savedHighScore = localStorage.getItem('flappyBirdHighScore');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore));
    }
    
    // Initialize audio
    jumpSoundRef.current = new Audio('/Game/flappy_whoosh.mp3');
    pointSoundRef.current = new Audio('/Game/point.mp3');
    dieSoundRef.current = new Audio('/Game/die.mp3');
    
    // Set volume
    if (jumpSoundRef.current) jumpSoundRef.current.volume = 0.3;
    if (pointSoundRef.current) pointSoundRef.current.volume = 0.4;
    if (dieSoundRef.current) dieSoundRef.current.volume = 0.4;
  }, []);

  // Play sound helper
  const playSound = useCallback((soundRef: React.MutableRefObject<HTMLAudioElement | null>) => {
    if (soundRef.current) {
      soundRef.current.currentTime = 0;
      soundRef.current.play().catch(() => {
        // Ignore audio play errors (autoplay restrictions)
      });
    }
  }, []);

  // Save high score to localStorage
  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('flappyBirdHighScore', score.toString());
    }
  }, [score, highScore]);

  const createParticles = useCallback((x: number, y: number) => {
    const newParticles: Particle[] = [];
    for (let i = 0; i < 8; i++) {
      newParticles.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 6,
        vy: (Math.random() - 0.5) * 6,
        life: 1,
        color: `hsl(${Math.random() * 60 + 40}, 100%, 60%)`
      });
    }
    gameRef.current.particles.push(...newParticles);
    setParticles(gameRef.current.particles);
  }, []);

  const resetGame = useCallback(() => {
    const newBird = { x: 100, y: 200, velocity: 0, rotation: 0 };
    setBird(newBird);
    setPipes([]);
    setScore(0);
    setParticles([]);
    gameRef.current = {
      bird: newBird,
      pipes: [],
      particles: [],
      score: 0,
      gameState: 'playing',
      frameCount: 0
    };
  }, []);

  const jump = useCallback(() => {
    if (gameRef.current.gameState === 'playing') {
      gameRef.current.bird.velocity = JUMP_FORCE;
      gameRef.current.bird.rotation = -MAX_ROTATION;
      setBird(prev => ({ ...prev, velocity: JUMP_FORCE, rotation: -MAX_ROTATION }));
      createParticles(gameRef.current.bird.x, gameRef.current.bird.y + BIRD_SIZE / 2);
      playSound(jumpSoundRef);
    } else if (gameRef.current.gameState === 'menu') {
      resetGame();
      setGameState('playing');
    } else if (gameRef.current.gameState === 'gameOver') {
      resetGame();
      setGameState('playing');
    }
  }, [resetGame, createParticles, playSound, JUMP_FORCE, MAX_ROTATION, BIRD_SIZE]);

  const checkCollision = useCallback((bird: Bird, pipes: Pipe[]): boolean => {
    // Check ground and ceiling collision
    if (bird.y + BIRD_SIZE >= CANVAS_HEIGHT || bird.y <= 0) {
      return true;
    }

    // Check pipe collision
    for (const pipe of pipes) {
      if (
        bird.x + BIRD_SIZE > pipe.x &&
        bird.x < pipe.x + PIPE_WIDTH &&
        (bird.y < pipe.topHeight || bird.y + BIRD_SIZE > CANVAS_HEIGHT - pipe.bottomHeight)
      ) {
        return true;
      }
    }

    return false;
  }, []);

  const generatePipe = useCallback((): Pipe => {
    const minTop = 80; // Increased minimum for easier gameplay
    const maxTop = CANVAS_HEIGHT - PIPE_GAP - 80; // Increased margin
    const topHeight = Math.random() * (maxTop - minTop) + minTop;
    const bottomHeight = CANVAS_HEIGHT - topHeight - PIPE_GAP;
    return {
      x: CANVAS_WIDTH,
      topHeight,
      bottomHeight,
      passed: false
    };
  }, []);

  const gameLoop = useCallback(() => {
    if (gameRef.current.gameState !== 'playing') return;

    gameRef.current.frameCount++;

    // Update bird physics
    gameRef.current.bird.velocity += GRAVITY;
    gameRef.current.bird.y += gameRef.current.bird.velocity;
    
    // Update bird rotation based on velocity
    if (gameRef.current.bird.velocity < 0) {
      gameRef.current.bird.rotation = Math.max(-MAX_ROTATION, gameRef.current.bird.rotation - ROTATION_SPEED);
    } else {
      gameRef.current.bird.rotation = Math.min(MAX_ROTATION, gameRef.current.bird.rotation + ROTATION_SPEED);
    }

    // Update particles
    gameRef.current.particles = gameRef.current.particles.map(p => ({
      ...p,
      x: p.x + p.vx,
      y: p.y + p.vy,
      vy: p.vy + 0.2,
      life: p.life - 0.02
    })).filter(p => p.life > 0);

    // Update pipes with slight speed increase based on score (slower progression)
    const currentSpeed = PIPE_SPEED + Math.floor(gameRef.current.score / 10) * 0.2; // Changed from /5 to /10
    gameRef.current.pipes = gameRef.current.pipes.map(pipe => ({
      ...pipe,
      x: pipe.x - currentSpeed
    }));

    // Remove off-screen pipes
    gameRef.current.pipes = gameRef.current.pipes.filter(pipe => pipe.x + PIPE_WIDTH > 0);

    // Add new pipes with more spacing
    if (gameRef.current.pipes.length === 0 || gameRef.current.pipes[gameRef.current.pipes.length - 1].x < CANVAS_WIDTH - 280) {
      gameRef.current.pipes.push(generatePipe());
    }

    // Update score
    gameRef.current.pipes.forEach(pipe => {
      if (!pipe.passed && pipe.x + PIPE_WIDTH < gameRef.current.bird.x) {
        pipe.passed = true;
        gameRef.current.score++;
        playSound(pointSoundRef); // Play point sound
      }
    });

    // Check collision
    if (checkCollision(gameRef.current.bird, gameRef.current.pipes)) {
      gameRef.current.gameState = 'gameOver';
      setGameState('gameOver');
      playSound(dieSoundRef); // Play die sound
      // Create explosion effect
      createParticles(gameRef.current.bird.x + BIRD_SIZE / 2, gameRef.current.bird.y + BIRD_SIZE / 2);
      createParticles(gameRef.current.bird.x + BIRD_SIZE / 2, gameRef.current.bird.y + BIRD_SIZE / 2);
    }

    // Update state
    setBird({ ...gameRef.current.bird });
    setPipes([...gameRef.current.pipes]);
    setScore(gameRef.current.score);
    setParticles([...gameRef.current.particles]);
  }, [checkCollision, generatePipe, createParticles, playSound]);

  // Game loop
  useEffect(() => {
    const interval = setInterval(gameLoop, 16); // ~60 FPS
    return () => clearInterval(interval);
  }, [gameLoop]);

  // Draw game
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas with gradient background
    const gradient = ctx.createLinearGradient(0, 0, 0, CANVAS_HEIGHT);
    gradient.addColorStop(0, '#87CEEB');
    gradient.addColorStop(1, '#E0F6FF');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Draw animated clouds
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.shadowBlur = 15;
    ctx.shadowColor = 'rgba(255, 255, 255, 0.5)';
    for (let i = 0; i < 4; i++) {
      const x = (i * 150 + gameRef.current.frameCount * 0.3) % (CANVAS_WIDTH + 100) - 100;
      const y = 60 + i * 50;
      ctx.beginPath();
      ctx.arc(x, y, 25, 0, Math.PI * 2);
      ctx.arc(x + 30, y, 35, 0, Math.PI * 2);
      ctx.arc(x + 60, y, 25, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.shadowBlur = 0;

    if (gameState === 'playing' || gameState === 'gameOver') {
      // Draw pipes with gradient and highlights
      pipes.forEach(pipe => {
        // Top pipe
        const topGradient = ctx.createLinearGradient(pipe.x, 0, pipe.x + PIPE_WIDTH, 0);
        topGradient.addColorStop(0, '#2D5016');
        topGradient.addColorStop(0.5, '#3A6B1F');
        topGradient.addColorStop(1, '#2D5016');
        ctx.fillStyle = topGradient;
        ctx.fillRect(pipe.x, 0, PIPE_WIDTH, pipe.topHeight);
        
        // Bottom pipe
        ctx.fillRect(pipe.x, CANVAS_HEIGHT - pipe.bottomHeight, PIPE_WIDTH, pipe.bottomHeight);
        
        // Pipe caps with 3D effect
        const capGradient = ctx.createLinearGradient(pipe.x - 5, 0, pipe.x + PIPE_WIDTH + 5, 0);
        capGradient.addColorStop(0, '#4CAF50');
        capGradient.addColorStop(0.5, '#66BB6A');
        capGradient.addColorStop(1, '#4CAF50');
        ctx.fillStyle = capGradient;
        
        // Top cap
        ctx.fillRect(pipe.x - 5, pipe.topHeight - 25, PIPE_WIDTH + 10, 25);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.fillRect(pipe.x - 5, pipe.topHeight - 3, PIPE_WIDTH + 10, 3);
        
        // Bottom cap
        ctx.fillStyle = capGradient;
        ctx.fillRect(pipe.x - 5, CANVAS_HEIGHT - pipe.bottomHeight, PIPE_WIDTH + 10, 25);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.fillRect(pipe.x - 5, CANVAS_HEIGHT - pipe.bottomHeight, PIPE_WIDTH + 10, 3);
      });

      // Draw particles
      particles.forEach(p => {
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.life;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      // Draw bird with rotation and better design
      ctx.save();
      ctx.translate(bird.x + BIRD_SIZE / 2, bird.y + BIRD_SIZE / 2);
      ctx.rotate((bird.rotation * Math.PI) / 180);
      
      // Bird shadow
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.fillRect(-BIRD_SIZE / 2 + 2, -BIRD_SIZE / 2 + 2, BIRD_SIZE, BIRD_SIZE);
      
      // Bird body with gradient
      const birdGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, BIRD_SIZE);
      birdGradient.addColorStop(0, '#FFD700');
      birdGradient.addColorStop(0.7, '#FFA500');
      birdGradient.addColorStop(1, '#FF8C00');
      ctx.fillStyle = birdGradient;
      ctx.beginPath();
      ctx.arc(0, 0, BIRD_SIZE / 2, 0, Math.PI * 2);
      ctx.fill();
      
      // Bird highlight
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.beginPath();
      ctx.arc(-4, -4, 6, 0, Math.PI * 2);
      ctx.fill();
      
      // Bird eye
      ctx.fillStyle = 'white';
      ctx.beginPath();
      ctx.arc(6, -2, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = 'black';
      ctx.beginPath();
      ctx.arc(7, -2, 3, 0, Math.PI * 2);
      ctx.fill();
      
      // Bird beak
      ctx.fillStyle = '#FF6347';
      ctx.beginPath();
      ctx.moveTo(BIRD_SIZE / 2, 0);
      ctx.lineTo(BIRD_SIZE / 2 + 8, -2);
      ctx.lineTo(BIRD_SIZE / 2 + 8, 2);
      ctx.closePath();
      ctx.fill();
      
      // Bird wing
      const wingOffset = Math.sin(gameRef.current.frameCount * 0.3) * 3;
      ctx.fillStyle = '#FF8C00';
      ctx.beginPath();
      ctx.ellipse(-2, wingOffset, 8, 12, Math.PI / 4, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.restore();

      // Draw score with better styling
      ctx.fillStyle = 'white';
      ctx.strokeStyle = '#333';
      ctx.lineWidth = 4;
      ctx.font = 'bold 48px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.textAlign = 'center';
      ctx.strokeText(score.toString(), CANVAS_WIDTH / 2, 60);
      ctx.fillText(score.toString(), CANVAS_WIDTH / 2, 60);
      
      // Draw subtle score shadow
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillText(score.toString(), CANVAS_WIDTH / 2 + 2, 62);
    }
  }, [bird, pipes, gameState, score, particles]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.key === ' ') {
        e.preventDefault();
        jump();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [jump]);

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 min-h-full">
      <div className="relative shadow-2xl rounded-2xl overflow-hidden">
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          onClick={jump}
          className="border-4 border-gray-200 dark:border-gray-700 rounded-2xl cursor-pointer bg-sky-200 transition-all hover:border-gray-300 dark:hover:border-gray-600"
        />
        
        {gameState === 'menu' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-black/60 via-black/50 to-black/60 backdrop-blur-sm rounded-2xl">
            <div className="text-center transform -translate-y-8">
              <h1 className="text-6xl font-bold text-white mb-2 font-mono drop-shadow-lg animate-pulse">
                Flappy Bird
              </h1>
              <div className="h-1 w-64 mx-auto bg-gradient-to-r from-transparent via-white/50 to-transparent mb-8 rounded-full"></div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 mb-6 border border-white/20">
                <p className="text-white text-xl mb-3 font-semibold">How to Play:</p>
                <p className="text-white text-lg mb-2">Click or press Space to jump</p>
                <p className="text-white text-lg mb-2">Avoid the pipes</p>
                <p className="text-white text-lg mb-3">Get the highest score!</p>
                {highScore > 0 && (
                  <>
                    <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent my-3"></div>
                    <p className="text-white text-lg font-semibold">
                      High Score: {highScore}
                    </p>
                  </>
                )}
              </div>
              <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-8 py-3 rounded-full font-bold text-lg shadow-lg inline-block hover:bg-gray-100 dark:hover:bg-gray-700 transition-all cursor-pointer">
                Click to Start
              </div>
            </div>
          </div>
        )}
        
        {gameState === 'gameOver' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-red-900/80 via-black/70 to-red-900/80 backdrop-blur-sm rounded-2xl animate-in fade-in duration-300">
            <div className="text-center transform scale-100 animate-in zoom-in duration-500">
              <h2 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">Game Over!</h2>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-6 border-2 border-white/30">
                <div className="mb-4">
                  <p className="text-gray-300 text-lg mb-2">Your Score</p>
                  <p className="text-6xl font-bold text-yellow-400 drop-shadow-lg">{score}</p>
                </div>
                <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent my-4"></div>
                <div>
                  <p className="text-gray-300 text-lg mb-2">Best Score</p>
                  <p className="text-4xl font-bold text-white drop-shadow-lg flex items-center justify-center gap-2">
                    {highScore}
                  </p>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-8 py-3 rounded-full font-bold text-lg shadow-lg inline-block hover:bg-gray-100 dark:hover:bg-gray-700 transition-all cursor-pointer">
                Click to Restart
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-6 text-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-700">
        <p className="text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
          <span className="font-bold">Controls:</span> Click canvas or press <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-xs font-mono">Space</kbd> to jump
        </p>
        <p className="text-gray-500 dark:text-gray-400 text-xs">
          Tip: The game gets faster as your score increases!
        </p>
      </div>
    </div>
  );
};

export default FlappyBird;