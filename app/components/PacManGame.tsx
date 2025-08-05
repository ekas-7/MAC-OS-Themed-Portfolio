"use client";

import React, { useState, useEffect, useCallback } from 'react';

interface GameState {
  score: number;
  lives: number;
  gameOver: boolean;
  paused: boolean;
  level: number;
  dotsEaten: number;
  totalDots: number;
  powerMode: boolean;
  powerModeTimer: number;
}

interface Position {
  x: number;
  y: number;
}

interface Ghost {
  id: number;
  position: Position;
  direction: Position;
  color: string;
  mode: 'chase' | 'scatter' | 'frightened';
  frightendTime: number;
  startPosition: Position;
}

// Game maze layout (1 = wall, 0 = dot, 2 = power pellet, 3 = empty)
const MAZE = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1],
  [1,2,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,2,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,1,1,0,1,0,1,1,1,1,1,0,1,0,1,1,0,1],
  [1,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,1],
  [1,1,1,1,0,1,1,1,3,1,3,1,1,1,0,1,1,1,1],
  [3,3,3,1,0,1,3,3,3,3,3,3,3,1,0,1,3,3,3],
  [1,1,1,1,0,1,3,1,1,3,1,1,3,1,0,1,1,1,1],
  [3,3,3,3,0,3,3,1,3,3,3,1,3,3,0,3,3,3,3],
  [1,1,1,1,0,1,3,1,1,1,1,1,3,1,0,1,1,1,1],
  [3,3,3,1,0,1,3,3,3,3,3,3,3,1,0,1,3,3,3],
  [1,1,1,1,0,1,1,1,3,1,3,1,1,1,0,1,1,1,1],
  [1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1],
  [1,0,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,0,1],
  [1,2,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,2,1],
  [1,1,0,1,0,1,0,1,1,1,1,1,0,1,0,1,0,1,1],
  [1,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,1],
  [1,0,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];

const CELL_SIZE = 20;
const GAME_WIDTH = MAZE[0].length * CELL_SIZE;
const GAME_HEIGHT = MAZE.length * CELL_SIZE;

export default function PacManGame() {
  const [gameState, setGameState] = useState<GameState>({
    score: 0,
    lives: 3,
    gameOver: false,
    paused: false,
    level: 1,
    dotsEaten: 0,
    totalDots: 0,
    powerMode: false,
    powerModeTimer: 0
  });

  const [pacmanPos, setPacmanPos] = useState<Position>({ x: 9, y: 15 });
  const [pacmanDirection, setPacmanDirection] = useState<Position>({ x: 0, y: 0 });
  const [nextDirection, setNextDirection] = useState<Position>({ x: 0, y: 0 });
  const [ghosts, setGhosts] = useState<Ghost[]>([]);
  const [maze, setMaze] = useState(MAZE.map(row => [...row]));

  // Initialize game
  useEffect(() => {
    const totalDots = MAZE.flat().filter(cell => cell === 0 || cell === 2).length;
    setGameState(prev => ({ ...prev, totalDots }));
    
    // Initialize ghosts
    const initialGhosts: Ghost[] = [
      { id: 1, position: { x: 9, y: 9 }, direction: { x: 0, y: -1 }, color: '#FF0000', mode: 'scatter', frightendTime: 0, startPosition: { x: 9, y: 9 } },
      { id: 2, position: { x: 8, y: 9 }, direction: { x: 0, y: -1 }, color: '#FFB8FF', mode: 'scatter', frightendTime: 0, startPosition: { x: 8, y: 9 } },
      { id: 3, position: { x: 10, y: 9 }, direction: { x: 0, y: -1 }, color: '#00FFFF', mode: 'scatter', frightendTime: 0, startPosition: { x: 10, y: 9 } },
      { id: 4, position: { x: 9, y: 8 }, direction: { x: 0, y: -1 }, color: '#FFB852', mode: 'scatter', frightendTime: 0, startPosition: { x: 9, y: 8 } }
    ];
    setGhosts(initialGhosts);
  }, []);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.code) {
        case 'ArrowUp':
        case 'KeyW':
          setNextDirection({ x: 0, y: -1 });
          event.preventDefault();
          break;
        case 'ArrowDown':
        case 'KeyS':
          setNextDirection({ x: 0, y: 1 });
          event.preventDefault();
          break;
        case 'ArrowLeft':
        case 'KeyA':
          setNextDirection({ x: -1, y: 0 });
          event.preventDefault();
          break;
        case 'ArrowRight':
        case 'KeyD':
          setNextDirection({ x: 1, y: 0 });
          event.preventDefault();
          break;
        case 'KeyP':
          setGameState(prev => ({ ...prev, paused: !prev.paused }));
          break;
      }
    };

    const handleKeyUp = () => {
      // Key up handling if needed
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Check if movement is valid
  const isValidMove = useCallback((x: number, y: number): boolean => {
    if (x < 0 || x >= MAZE[0].length || y < 0 || y >= MAZE.length) {
      return false;
    }
    return MAZE[y][x] !== 1;
  }, []);

  // Game loop
  useEffect(() => {
    if (gameState.gameOver || gameState.paused) return;

    const gameInterval = setInterval(() => {
      // Update Pac-Man position
      setPacmanPos(prevPos => {
        const newPos = { ...prevPos };
        
        // Try to change direction if next direction is different and valid
        if (nextDirection.x !== pacmanDirection.x || nextDirection.y !== pacmanDirection.y) {
          const testX = prevPos.x + nextDirection.x;
          const testY = prevPos.y + nextDirection.y;
          if (isValidMove(testX, testY)) {
            setPacmanDirection(nextDirection);
            newPos.x = testX;
            newPos.y = testY;
          } else {
            // Continue in current direction if possible
            const currentX = prevPos.x + pacmanDirection.x;
            const currentY = prevPos.y + pacmanDirection.y;
            if (isValidMove(currentX, currentY)) {
              newPos.x = currentX;
              newPos.y = currentY;
            }
          }
        } else {
          // Continue in current direction
          const newX = prevPos.x + pacmanDirection.x;
          const newY = prevPos.y + pacmanDirection.y;
          if (isValidMove(newX, newY)) {
            newPos.x = newX;
            newPos.y = newY;
          }
        }

        // Tunnel effect (wrap around)
        if (newPos.x < 0) newPos.x = MAZE[0].length - 1;
        if (newPos.x >= MAZE[0].length) newPos.x = 0;

        return newPos;
      });

      // Update power mode timer
      if (gameState.powerMode && gameState.powerModeTimer > 0) {
        setGameState(prev => ({
          ...prev,
          powerModeTimer: prev.powerModeTimer - 1,
          powerMode: prev.powerModeTimer > 1
        }));
      }

      // Update ghosts
      setGhosts(prevGhosts => 
        prevGhosts.map(ghost => {
          const directions = [
            { x: 0, y: -1 }, // up
            { x: 0, y: 1 },  // down
            { x: -1, y: 0 }, // left
            { x: 1, y: 0 }   // right
          ];

          // Simple AI: choose random valid direction, prefer moving toward Pac-Man
          const validDirections = directions.filter(dir => 
            isValidMove(ghost.position.x + dir.x, ghost.position.y + dir.y)
          );

          let newDirection = ghost.direction;
          if (validDirections.length > 0) {
            if (gameState.powerMode) {
              // Run away from Pac-Man when frightened
              const awayDirections = validDirections.filter(dir => {
                const newX = ghost.position.x + dir.x;
                const newY = ghost.position.y + dir.y;
                const distToPacman = Math.abs(newX - pacmanPos.x) + Math.abs(newY - pacmanPos.y);
                const currentDist = Math.abs(ghost.position.x - pacmanPos.x) + Math.abs(ghost.position.y - pacmanPos.y);
                return distToPacman > currentDist;
              });
              newDirection = awayDirections.length > 0 
                ? awayDirections[Math.floor(Math.random() * awayDirections.length)]
                : validDirections[Math.floor(Math.random() * validDirections.length)];
            } else {
              // Chase Pac-Man
              const chaseDirections = validDirections.filter(dir => {
                const newX = ghost.position.x + dir.x;
                const newY = ghost.position.y + dir.y;
                const distToPacman = Math.abs(newX - pacmanPos.x) + Math.abs(newY - pacmanPos.y);
                const currentDist = Math.abs(ghost.position.x - pacmanPos.x) + Math.abs(ghost.position.y - pacmanPos.y);
                return distToPacman < currentDist;
              });
              newDirection = chaseDirections.length > 0 
                ? chaseDirections[Math.floor(Math.random() * chaseDirections.length)]
                : validDirections[Math.floor(Math.random() * validDirections.length)];
            }
          }

          const newX = ghost.position.x + newDirection.x;
          const newY = ghost.position.y + newDirection.y;

          return {
            ...ghost,
            position: { x: newX, y: newY },
            direction: newDirection,
            mode: gameState.powerMode ? 'frightened' : 'chase'
          };
        })
      );

    }, 200); // Game speed

    return () => clearInterval(gameInterval);
  }, [gameState.gameOver, gameState.paused, gameState.powerMode, gameState.powerModeTimer, pacmanDirection, nextDirection, pacmanPos, isValidMove]);

  // Check for collisions and eating dots
  useEffect(() => {
    const currentCell = maze[pacmanPos.y]?.[pacmanPos.x];
    
    if (currentCell === 0) {
      // Eat normal dot
      setMaze(prev => {
        const newMaze = prev.map(row => [...row]);
        newMaze[pacmanPos.y][pacmanPos.x] = 3;
        return newMaze;
      });
      setGameState(prev => ({
        ...prev,
        score: prev.score + 10,
        dotsEaten: prev.dotsEaten + 1
      }));
    } else if (currentCell === 2) {
      // Eat power pellet
      setMaze(prev => {
        const newMaze = prev.map(row => [...row]);
        newMaze[pacmanPos.y][pacmanPos.x] = 3;
        return newMaze;
      });
      setGameState(prev => ({
        ...prev,
        score: prev.score + 50,
        dotsEaten: prev.dotsEaten + 1,
        powerMode: true,
        powerModeTimer: 30 // 6 seconds at 200ms intervals
      }));
    }

    // Check ghost collisions
    ghosts.forEach(ghost => {
      if (ghost.position.x === pacmanPos.x && ghost.position.y === pacmanPos.y) {
        if (gameState.powerMode) {
          // Eat ghost
          setGameState(prev => ({ ...prev, score: prev.score + 200 }));
          // Reset ghost to start position (simplified)
          setGhosts(prevGhosts => 
            prevGhosts.map(g => 
              g.id === ghost.id 
                ? { ...g, position: { ...g.startPosition } }
                : g
            )
          );
        } else {
          // Pac-Man dies
          setGameState(prev => {
            const newLives = prev.lives - 1;
            return {
              ...prev,
              lives: newLives,
              gameOver: newLives <= 0
            };
          });
          if (gameState.lives > 1) {
            setPacmanPos({ x: 9, y: 15 });
            setPacmanDirection({ x: 0, y: 0 });
            setNextDirection({ x: 0, y: 0 });
          }
        }
      }
    });

    // Check win condition
    if (gameState.dotsEaten >= gameState.totalDots) {
      setGameState(prev => ({
        ...prev,
        level: prev.level + 1,
        dotsEaten: 0
      }));
      // Reset maze and positions for next level
      setMaze(MAZE.map(row => [...row]));
      setPacmanPos({ x: 9, y: 15 });
      setPacmanDirection({ x: 0, y: 0 });
      setNextDirection({ x: 0, y: 0 });
    }
  }, [pacmanPos, ghosts, gameState.powerMode, gameState.lives, gameState.dotsEaten, gameState.totalDots, maze]);

  const resetGame = () => {
    setGameState({
      score: 0,
      lives: 3,
      gameOver: false,
      paused: false,
      level: 1,
      dotsEaten: 0,
      totalDots: MAZE.flat().filter(cell => cell === 0 || cell === 2).length,
      powerMode: false,
      powerModeTimer: 0
    });
    setMaze(MAZE.map(row => [...row]));
    setPacmanPos({ x: 9, y: 15 });
    setPacmanDirection({ x: 0, y: 0 });
    setNextDirection({ x: 0, y: 0 });
    setGhosts([
      { id: 1, position: { x: 9, y: 9 }, direction: { x: 0, y: -1 }, color: '#FF0000', mode: 'scatter', frightendTime: 0, startPosition: { x: 9, y: 9 } },
      { id: 2, position: { x: 8, y: 9 }, direction: { x: 0, y: -1 }, color: '#FFB8FF', mode: 'scatter', frightendTime: 0, startPosition: { x: 8, y: 9 } },
      { id: 3, position: { x: 10, y: 9 }, direction: { x: 0, y: -1 }, color: '#00FFFF', mode: 'scatter', frightendTime: 0, startPosition: { x: 10, y: 9 } },
      { id: 4, position: { x: 9, y: 8 }, direction: { x: 0, y: -1 }, color: '#FFB852', mode: 'scatter', frightendTime: 0, startPosition: { x: 9, y: 8 } }
    ]);
  };

  return (
    <div className="w-full h-full bg-black flex flex-col items-center justify-center p-4">
      {/* Game Board */}
      <div 
        className="relative border-2 border-blue-500"
        style={{ 
          width: GAME_WIDTH, 
          height: GAME_HEIGHT,
          backgroundColor: '#000080'
        }}
      >
        {/* Render Maze */}
        {maze.map((row, y) =>
          row.map((cell, x) => (
            <div
              key={`${x}-${y}`}
              className="absolute"
              style={{
                left: x * CELL_SIZE,
                top: y * CELL_SIZE,
                width: CELL_SIZE,
                height: CELL_SIZE,
              }}
            >
              {cell === 1 && (
                <div className="w-full h-full bg-blue-600 border border-blue-400" />
              )}
              {cell === 0 && (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-1 h-1 bg-yellow-300 rounded-full" />
                </div>
              )}
              {cell === 2 && (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-yellow-300 rounded-full animate-pulse" />
                </div>
              )}
            </div>
          ))
        )}

        {/* Pac-Man */}
        <div
          className="absolute transition-all duration-200 flex items-center justify-center"
          style={{
            left: pacmanPos.x * CELL_SIZE,
            top: pacmanPos.y * CELL_SIZE,
            width: CELL_SIZE,
            height: CELL_SIZE,
            transform: `rotate(${
              pacmanDirection.x === 1 ? '0deg' :
              pacmanDirection.x === -1 ? '180deg' :
              pacmanDirection.y === 1 ? '90deg' :
              pacmanDirection.y === -1 ? '-90deg' : '0deg'
            })`
          }}
        >
          <div className="w-4 h-4 bg-yellow-400 rounded-full relative">
            <div 
              className="absolute w-0 h-0 border-l-2 border-r-2 border-b-2 border-transparent border-l-black"
              style={{
                right: '2px',
                top: '50%',
                transform: 'translateY(-50%)'
              }}
            />
          </div>
        </div>

        {/* Ghosts */}
        {ghosts.map(ghost => (
          <div
            key={ghost.id}
            className="absolute transition-all duration-200 flex items-center justify-center"
            style={{
              left: ghost.position.x * CELL_SIZE,
              top: ghost.position.y * CELL_SIZE,
              width: CELL_SIZE,
              height: CELL_SIZE,
            }}
          >
            <div 
              className="w-4 h-4 rounded-t-full relative"
              style={{
                backgroundColor: gameState.powerMode ? '#0000FF' : ghost.color
              }}
            >
              <div className="absolute bottom-0 left-0 w-full h-1 flex">
                <div className="w-1 h-1 bg-current rounded-b-full" />
                <div className="w-1 h-1 bg-transparent" />
                <div className="w-1 h-1 bg-current rounded-b-full" />
                <div className="w-1 h-1 bg-transparent" />
              </div>
              {/* Ghost eyes */}
              <div className="absolute top-1 left-1 w-1 h-1 bg-white rounded-full" />
              <div className="absolute top-1 right-1 w-1 h-1 bg-white rounded-full" />
            </div>
          </div>
        ))}

        {/* Game Over Overlay */}
        {gameState.gameOver && (
          <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center">
            <div className="text-center">
              <div className="text-yellow-400 text-2xl font-bold mb-2">GAME OVER</div>
              <div className="text-white text-lg mb-2">Final Score: {gameState.score}</div>
              <button
                onClick={resetGame}
                className="bg-yellow-400 text-black px-4 py-2 rounded font-bold hover:bg-yellow-300"
              >
                Play Again
              </button>
            </div>
          </div>
        )}

        {/* Paused Overlay */}
        {gameState.paused && (
          <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center">
            <div className="text-yellow-400 text-2xl font-bold">PAUSED</div>
          </div>
        )}
      </div>

      {/* Game Info */}
      <div className="mt-4 text-white text-center">
        <div className="flex gap-6 mb-2">
          <span>Score: {gameState.score}</span>
          <span>Lives: {gameState.lives}</span>
          <span>Level: {gameState.level}</span>
          {gameState.powerMode && (
            <span className="text-yellow-400 animate-pulse">POWER MODE!</span>
          )}
        </div>
        <div className="text-sm text-gray-300">
          Use WASD or Arrow Keys to move • P to pause
        </div>
      </div>
    </div>
  );
}
