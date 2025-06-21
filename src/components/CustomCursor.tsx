
import React, { useEffect, useRef, useState } from "react";

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<HTMLDivElement[]>([]);
  const mouse = useRef({ x: 0, y: 0 });
  const [trails, setTrails] = useState(
    Array.from({ length: 6 }, (_, id) => ({
      x: 0,
      y: 0,
      id,
    }))
  );

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    let running = true;
    let last = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    
    const animate = () => {
      last.x += (mouse.current.x - last.x) * 0.4; // Increased from 0.2 to 0.4
      last.y += (mouse.current.y - last.y) * 0.4; // Increased from 0.2 to 0.4

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${last.x - 10}px,${last.y - 10}px,0)`;
      }
      
      let prev = { ...last };
      setTrails((trails) =>
        trails.map((trail, i) => {
          const lag = 0.25 - i * 0.35; // Increased lag for faster response
          prev.x += ((mouse.current.x - prev.x) * lag);
          prev.y += ((mouse.current.y - prev.y) * lag);
          
          if (trailRefs.current[i]) {
            const scale = 1 - i * 0.15;
            const opacity = 0.8 - i * 0.12;
            trailRefs.current[i].style.transform = `translate3d(${prev.x - 4}px,${prev.y - 4}px,0) scale(${scale})`;
            trailRefs.current[i].style.opacity = String(opacity);
          }
          return { ...trail, x: prev.x, y: prev.y };
        })
      );
      
      if (running) requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleHover = () => setIsHovering(true);
    const handleUnhover = () => setIsHovering(false);

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    const interactive = document.querySelectorAll("button, a, [role=button], input, textarea, select");
    interactive.forEach((el) => {
      el.addEventListener("mouseenter", handleHover);
      el.addEventListener("mouseleave", handleUnhover);
    });

    animate();
    
    return () => {
      running = false;
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      interactive.forEach((el) => {
        el.removeEventListener("mouseenter", handleHover);
        el.removeEventListener("mouseleave", handleUnhover);
      });
    };
  }, [isMobile]);

  // Don't render cursor on mobile devices
  if (isMobile) {
    return null;
  }

  return (
    <>
      <div
        ref={cursorRef}
        className={`fixed pointer-events-none z-[9999] w-5 h-5 rounded-full transition-all duration-100 ${
          isHovering 
            ? 'bg-cyan-400 scale-150 shadow-xl shadow-cyan-400/60' 
            : isClicking
            ? 'bg-violet-700 scale-75 shadow-xl shadow-violet-500'
            : 'bg-green-100 shadow-lg shadow-green-400/50'
        }`}
        style={{
          left: 0,
          top: 0,
        }}
      >
        <div className={`absolute inset-0 rounded-full ${
          isHovering 
            ? 'bg-cyan-300/40' 
            : isClicking
            ? 'bg-pink-400/40'
            : 'bg-green-300/40'
        }`} />
      </div>
        {/* big circle behind */}
      {trails.map((trail, i) => (
        <div
          key={trail.id}
          ref={(el) => {
            if (el) trailRefs.current[i] = el;
          }}
          className="fixed pointer-events-none z-[9998] w-2 h-2 rounded-full transition-colors duration-200"
          style={{
            left: 0,
            top: 0,
            backgroundColor: isHovering 
              ? `rgba(34, 211, 238, ${0.7 - i * 0.1})` 
              : isClicking
              ? `rgba(236, 72, 153, ${0.7 - i * 0.1})`
              : `rgba(34, 197, 94, ${0.7 - i * 0.1})`,
            boxShadow: isHovering 
              ? `0 0 ${6 - i}px rgba(34, 211, 238, ${0.4 - i * 0.05})`
              : isClicking
              ? `0 0 ${6 - i}px rgba(236, 72, 153, ${0.4 - i * 0.05})`
              : `0 0 ${6 - i}px rgba(34, 197, 94, ${0.4 - i * 0.05})`
          }}
        />
      ))}
{/* ripple effect  */}
      {isClicking && (
        <div
          className="fixed pointer-events-none z-[9997] w-12 h-12 rounded-full border-2 border-pink-400/60 animate-ping"
          style={{
            left: mouse.current.x - 24,
            top: mouse.current.y - 24,
            boxShadow: '0 0 20px rgba(236, 72, 153, 0.6)',
          }}
        />
      )}
    </>
  );
};

export default CustomCursor;
