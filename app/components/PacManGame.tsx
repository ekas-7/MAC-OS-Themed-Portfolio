'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';

interface Bird {
  x: number;
  y: number;
  velocity: number;
}

interface Pipe {
  x: number;
  topHeight: number;
  bottomHeight: number;
  passed: boolean;
}

const FlappyBird: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'gameOver'>('menu');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [bird, setBird] = useState<Bird>({ x: 100, y: 200, velocity: 0 });
  const [pipes, setPipes] = useState<Pipe[]>([]);
  
  const gameRef = useRef({
    bird: { x: 100, y: 200, velocity: 0 },
    pipes: [] as Pipe[],
    score: 0,
    gameState: 'menu' as 'menu' | 'playing' | 'gameOver'
  });

  // Game constants
  const CANVAS_WIDTH = 400;
  const CANVAS_HEIGHT = 400;
  const BIRD_SIZE = 20;
  const PIPE_WIDTH = 50;
  const PIPE_GAP = 120;
  const GRAVITY = 0.6;
  const JUMP_FORCE = -10;
  const PIPE_SPEED = 2;

  // Load high score from localStorage
  useEffect(() => {
    const savedHighScore = localStorage.getItem('flappyBirdHighScore');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore));
    }
  }, []);

  // Save high score to localStorage
  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('flappyBirdHighScore', score.toString());
    }
  }, [score, highScore]);

  const resetGame = useCallback(() => {
    const newBird = { x: 100, y: 200, velocity: 0 };
    setBird(newBird);
    setPipes([]);
    setScore(0);
    gameRef.current = {
      bird: newBird,
      pipes: [],
      score: 0,
      gameState: 'playing'
    };
  }, []);

  const jump = useCallback(() => {
    if (gameRef.current.gameState === 'playing') {
      gameRef.current.bird.velocity = JUMP_FORCE;
      setBird(prev => ({ ...prev, velocity: JUMP_FORCE }));
    } else if (gameRef.current.gameState === 'menu') {
      resetGame();
      setGameState('playing');
    } else if (gameRef.current.gameState === 'gameOver') {
      resetGame();
      setGameState('playing');
    }
  }, [resetGame]);

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
    const topHeight = Math.random() * (CANVAS_HEIGHT - PIPE_GAP - 100) + 50;
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

    // Update bird physics
    gameRef.current.bird.velocity += GRAVITY;
    gameRef.current.bird.y += gameRef.current.bird.velocity;

    // Update pipes
    gameRef.current.pipes = gameRef.current.pipes.map(pipe => ({
      ...pipe,
      x: pipe.x - PIPE_SPEED
    }));

    // Remove off-screen pipes
    gameRef.current.pipes = gameRef.current.pipes.filter(pipe => pipe.x + PIPE_WIDTH > 0);

    // Add new pipes
    if (gameRef.current.pipes.length === 0 || gameRef.current.pipes[gameRef.current.pipes.length - 1].x < CANVAS_WIDTH - 200) {
      gameRef.current.pipes.push(generatePipe());
    }

    // Update score
    gameRef.current.pipes.forEach(pipe => {
      if (!pipe.passed && pipe.x + PIPE_WIDTH < gameRef.current.bird.x) {
        pipe.passed = true;
        gameRef.current.score++;
      }
    });

    // Check collision
    if (checkCollision(gameRef.current.bird, gameRef.current.pipes)) {
      gameRef.current.gameState = 'gameOver';
      setGameState('gameOver');
    }

    // Update state
    setBird({ ...gameRef.current.bird });
    setPipes([...gameRef.current.pipes]);
    setScore(gameRef.current.score);
  }, [checkCollision, generatePipe]);

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

    // Clear canvas
    ctx.fillStyle = '#87CEEB'; // Sky blue background
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Draw clouds
    ctx.fillStyle = 'white';
    ctx.globalAlpha = 0.8;
    for (let i = 0; i < 3; i++) {
      const x = (i * 150 + Date.now() * 0.01) % (CANVAS_WIDTH + 60) - 60;
      ctx.beginPath();
      ctx.arc(x, 60 + i * 40, 25, 0, Math.PI * 2);
      ctx.arc(x + 25, 60 + i * 40, 35, 0, Math.PI * 2);
      ctx.arc(x + 50, 60 + i * 40, 25, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    if (gameState === 'playing' || gameState === 'gameOver') {
      // Draw pipes
      ctx.fillStyle = '#228B22'; // Forest green
      pipes.forEach(pipe => {
        // Top pipe
        ctx.fillRect(pipe.x, 0, PIPE_WIDTH, pipe.topHeight);
        // Bottom pipe
        ctx.fillRect(pipe.x, CANVAS_HEIGHT - pipe.bottomHeight, PIPE_WIDTH, pipe.bottomHeight);
        
        // Pipe caps
        ctx.fillStyle = '#32CD32'; // Lime green
        ctx.fillRect(pipe.x - 5, pipe.topHeight - 20, PIPE_WIDTH + 10, 20);
        ctx.fillRect(pipe.x - 5, CANVAS_HEIGHT - pipe.bottomHeight, PIPE_WIDTH + 10, 20);
        ctx.fillStyle = '#228B22';
      });

      // Draw bird
      ctx.fillStyle = '#FFD700'; // Gold
      ctx.fillRect(bird.x, bird.y, BIRD_SIZE, BIRD_SIZE);
      
      // Bird eye
      ctx.fillStyle = 'black';
      ctx.fillRect(bird.x + BIRD_SIZE - 8, bird.y + 4, 4, 4);
      
      // Bird beak
      ctx.fillStyle = '#FF4500'; // Orange red
      ctx.fillRect(bird.x + BIRD_SIZE, bird.y + 8, 6, 4);

      // Draw score
      ctx.fillStyle = 'white';
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 2;
      ctx.font = 'bold 24px -apple-system, BlinkMacSystemFont, sans-serif';
      ctx.textAlign = 'center';
      ctx.strokeText(score.toString(), CANVAS_WIDTH / 2, 40);
      ctx.fillText(score.toString(), CANVAS_WIDTH / 2, 40);
    }
  }, [bird, pipes, gameState, score]);

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
    <div className="flex flex-col items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 min-h-full">
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          onClick={jump}
          className="border-2 border-gray-300 dark:border-gray-600 rounded-lg shadow-lg cursor-pointer bg-sky-200"
        />
        
        {gameState === 'menu' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 rounded-lg">
            <h1 className="text-4xl font-bold text-white mb-4 font-mono">Flappy Bird</h1>
            <p className="text-white text-lg mb-4">Click or press Space to start</p>
            <div className="text-white text-sm">
              <p>High Score: {highScore}</p>
            </div>
          </div>
        )}
        
        {gameState === 'gameOver' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-75 rounded-lg">
            <h2 className="text-3xl font-bold text-white mb-2">Game Over!</h2>
            <p className="text-white text-xl mb-2">Score: {score}</p>
            <p className="text-white text-lg mb-4">High Score: {highScore}</p>
            <p className="text-white text-sm">Click or press Space to restart</p>
          </div>
        )}
      </div>
      
      <div className="mt-4 text-center">
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          Click the game area or press Space to jump
        </p>
        <p className="text-gray-500 dark:text-gray-500 text-xs mt-1">
          Avoid the pipes and try to get the highest score!
        </p>
      </div>
    </div>
  );
};

export default FlappyBird;