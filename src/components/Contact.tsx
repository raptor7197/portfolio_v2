

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Mail, Phone, MapPin, Send, Terminal, Twitter ,Linkedin} from 'lucide-react';
import ContactGlobe from './ContactGlobe';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const DinosaurGame = () => {
    const canvasRef = useRef(null);
    const gameStateRef = useRef({
      dino: { x: 50, y: 150, width: 40, height: 40, jumping: false, velocity: 0 },
      obstacles: [],
      score: 0,
      gameSpeed: 2,
      isRunning: false,
      gameOver: false
    });

    const [gameState, setGameState] = useState({
      score: 0,
      isRunning: false,
      gameOver: false
    });

    const CANVAS_WIDTH = 400;
    const CANVAS_HEIGHT = 470;
    const GROUND_Y = 190;
    const GRAVITY = 0.4;
    const JUMP_FORCE = -11;

    const resetGame = useCallback(() => {
      gameStateRef.current = {
        dino: { x: 45, y: 120, width: 40, height: 40, jumping: false, velocity: 0 },
        obstacles: [],
        score: 0,
        gameSpeed: 2,
        isRunning: true,
        gameOver: false
      };
      setGameState({ score: 0, isRunning: true, gameOver: false });
    }, []);

    const jump = useCallback(() => {
      const { dino } = gameStateRef.current;
      if (!dino.jumping && !gameStateRef.current.gameOver) {
        dino.jumping = true;
        dino.velocity = JUMP_FORCE;
      }
    }, []);

    const checkCollision = (rect1, rect2) => {
      return rect1.x < rect2.x + rect2.width &&
             rect1.x + rect1.width > rect2.x &&
             rect1.y < rect2.y + rect2.height &&
             rect1.y + rect1.height > rect2.y;
    };

    const gameLoop = useCallback(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const game = gameStateRef.current;
      
      if (!game.isRunning) return;

      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      ctx.fillStyle = '#00ff41';
      ctx.fillRect(0, GROUND_Y, CANVAS_WIDTH, 2);

      if (game.dino.jumping) {
        game.dino.velocity += GRAVITY;
        game.dino.y += game.dino.velocity;
        
        if (game.dino.y >= 150) {
          game.dino.y = 150;
          game.dino.jumping = false;
          game.dino.velocity = 0;
        }
      }

      ctx.fillStyle = '#00ff41';
      ctx.fillRect(game.dino.x, game.dino.y, game.dino.width, game.dino.height);
      
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(game.dino.x + 25, game.dino.y + 8, 4, 4);
      ctx.fillRect(game.dino.x + 32, game.dino.y + 8, 4, 4);

      if (Math.random() < 0.008) {
        game.obstacles.push({
          x: CANVAS_WIDTH,
          y: 150,
          width: 20,
          height: 40
        });
      }

      for (let i = game.obstacles.length - 1; i >= 0; i--) {
        const obstacle = game.obstacles[i];
        obstacle.x -= game.gameSpeed;

        ctx.fillStyle = '#ff4444';
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);

        if (checkCollision(game.dino, obstacle)) {
          game.isRunning = false;
          game.gameOver = true;
          setGameState(prev => ({ ...prev, isRunning: false, gameOver: true }));
        }

        if (obstacle.x + obstacle.width < 0) {
          game.obstacles.splice(i, 1);
          game.score += 10;
        }
      }

      game.score += 1;
      game.gameSpeed += 0.001;

      ctx.fillStyle = '#00ff41';
      ctx.font = '16px monospace';
      ctx.fillText(`Score: ${Math.floor(game.score / 10)}`, CANVAS_WIDTH - 120, 30);

      setGameState(prev => ({ 
        ...prev, 
        score: Math.floor(game.score / 10) 
      }));

    }, []);

    useEffect(() => {
      const gameInterval = setInterval(gameLoop, 16); 
      return () => clearInterval(gameInterval);
    }, [gameLoop]);

    useEffect(() => {
      const handleKeyPress = (e) => {
        if (e.code === 'Space' || e.code === 'ArrowUp') {
          e.preventDefault();
          if (gameStateRef.current.gameOver) {
            resetGame();
          } else {
            jump();
          }
        }
      };

      window.addEventListener('keydown', handleKeyPress);
      return () => window.removeEventListener('keydown', handleKeyPress);
    }, [jump, resetGame]);

    return (
      <div className="bg-gray-900/50 border border-green-500/30 rounded-lg p-4 mb-6">
        <div className="flex items-center space-x-2 mb-3">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-green-400 font-mono text-sm ml-4">~/games/dino-runner.exe</span>
        </div>
        
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          className="border border-green-500/20 rounded bg-black w-full"
          onClick={() => {
            if (gameStateRef.current.gameOver) {
              resetGame();
            } else {
              jump();
            }
          }}
        />
        
        <div className="mt-3 flex justify-between items-center">
          <div className="text-green-400 font-mono text-sm">
            Score: {gameState.score}
          </div>
          
          {!gameState.isRunning && !gameState.gameOver && (
            <button
              onClick={resetGame}
              className="px-3 py-1 bg-green-500/20 border border-green-500/30 rounded text-green-400 font-mono text-sm hover:bg-green-500/30 transition-colors"
            >
              Start Game
            </button>
          )}
          
          {gameState.gameOver && (
            <div className="text-centerw">
              <div className="text-red-400 font-mono text-sm mb-2">Crashed! better luck next time</div>
              <button
                onClick={resetGame}
                className="px-3 py-1 bg-green-500/20 border border-green-500/30 rounded text-green-400 font-mono text-sm hover:bg-green-500/30 transition-colors"
              >
                Restart
              </button>
            </div>
          )}
        </div>
        
        <div className="mt-2 text-gray-400 font-mono text-xs text-center">
          Press SPACE or click to jump • Avoid the red obstacles.
        </div>
        <div className='mt-2 text-gray-400 font-mono text-xs text-center'>
          Can you beat my Highscore??? It's
        </div>
        <div className='mt-2 text-gray-200 font-mono text-xs text-center'>
            {1432}
        </div>
      </div>
    );
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section className="relative py-24 px-4 sm:px-6 z-2 overflow-hidden">
      <ContactGlobe />
      
      <div className="absolute inset-0 bg-black/40 z-2"></div>
      
      <div className="container mx-auto max-w-6xl relative z-2">
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-3 mb-6">
            <Terminal className="w-8 h-8 text-green-400" />
            <h2 className="text-4xl md:text-6xl font-black font-mono text-green-400 terminal-glow">
              $ ./contact.sh
            </h2>
          </div>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto font-mono">
            <span className="text-green-400"># </span>
            Ready to collaborate?
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="p-6 rounded-lg bg-gray-900/80 border border-green-500/30 hover:border-green-500/50 transition-all duration-500">
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex space-x-1">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <span className="text-green-400 font-mono text-sm">~/contact/email</span>
              </div>
              <div className="font-mono">
                <Mail className="w-6 h-6 text-green-400 mb-3" />
                <p className="text-green-400 text-sm mb-1">$ echo $EMAIL</p>
                <a href='mailto:vamsikrishna.p.me@gmail.com?subject=Me&body=Hello!'>vamsikrishna.p.me@gmail.com</a>
              </div>
            </div>

            <div className="p-6 rounded-lg bg-gray-900/80 border border-blue-500/30 hover:border-blue-500/50 transition-all duration-500">
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex space-x-1">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                </div>
                <span className="text-blue-400 font-mono text-sm">~/contact/X</span>
              </div>
              <div className="font-mono">
                <Twitter className="w-6 h-6 text-blue-400 mb-3" />
                <p className="text-blue-400 text-sm mb-1">$ cat twitter.txt</p>
                <a className="text-white" href='https://x.com/justvamsi7'>@justvamsi7</a>
              </div>
              
              
            </div>
            <div className="p-6 rounded-lg bg-gray-900/80 border border-blue-500/30 hover:border-blue-500/50 transition-all duration-500">
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex space-x-1">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                </div>
                <span className="text-blue-400 font-mono text-sm">~/contact/X</span>
              </div>
              <div className="font-mono">
                <Linkedin className="w-6 h-6 text-blue-400 mb-3" />
                <p className="text-blue-400 text-sm mb-1">$ vim linked.xml</p>
                <a className="text-white" href='https://linkedin.com/in/pvamsikrishna'>Vamsi Krishna</a>
              </div>
              
              
            </div>

            <div className="p-6 rounded-lg bg-gray-900/80 border border-pink-500/30 hover:border-pink-500/50 transition-all duration-500">
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex space-x-1">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
                </div>
                <span className="text-pink-400 font-mono text-sm">~/contact/location</span>
              </div>
              <div className="font-mono">
                <MapPin className="w-6 h-6 text-pink-400 mb-3" />
                <p className="text-pink-400 text-sm mb-1">$ pwd</p>
                <a className="text-white" href="https://maps.app.goo.gl/hpeD9dqT17eDVgUGA">/India / Visakhapatnam</a>
              </div>
            </div>
          </div>

          <div>
            <DinosaurGame />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;