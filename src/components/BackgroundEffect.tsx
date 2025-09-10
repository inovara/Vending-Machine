import React, { useEffect, useRef } from 'react';
import { ParticleConfig } from '../types';

const BackgroundEffect: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<ParticleConfig[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const colors = [
      'rgba(46, 0, 20, 0.1)',   // Deep burgundy - reduced opacity
      'rgba(107, 144, 128, 0.1)', // Muted green - reduced opacity
      'rgba(252, 208, 161, 0.1)', // Warm peach-gold - reduced opacity
      'rgba(225, 233, 230, 0.05)'  // Soft ivory - reduced opacity
    ];
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };
    
    const initParticles = () => {
      particles.current = [];
      const particleCount = Math.min(15, Math.floor(window.innerWidth / 40)); // Reduced particle count
      
      for (let i = 0; i < particleCount; i++) {
        particles.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5 + 0.5, // Smaller particles
          speedX: (Math.random() - 0.5) * 0.05, // Slower movement
          speedY: (Math.random() - 0.5) * 0.05, // Slower movement
          opacity: Math.random() * 0.2 + 0.05, // Lower opacity
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }
    };
    
    const draw = () => {
      if (!ctx || !canvas) return;
      
      // Create gradient background
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height)
      );
      gradient.addColorStop(0, 'rgba(46, 0, 20, 0.02)');
      gradient.addColorStop(0.5, 'rgba(107, 144, 128, 0.01)');
      gradient.addColorStop(1, 'rgba(252, 208, 161, 0.01)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw particles
      particles.current.forEach((particle) => {
        // Mouse interaction
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          const force = (100 - distance) / 100;
          particle.x -= dx * force * 0.01;
          particle.y -= dy * force * 0.01;
        }
        
        // Create glow effect
        const glowGradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 3
        );
        glowGradient.addColorStop(0, particle.color);
        glowGradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = glowGradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw particle
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
      });
      
      // Draw connecting lines
      particles.current.forEach((particle, i) => {
        particles.current.slice(i + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            const opacity = (100 - distance) / 100 * 0.1;
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        });
      });
      
      requestAnimationFrame(draw);
    };
    
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    handleResize();
    draw();
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  return (
    <>
      <canvas 
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full -z-10"
      />
      
      {/* Additional luxury background elements */}
      <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none">
        {/* Large gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-inovara-primary-10 to-inovara-secondary-10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-inovara-accent-10 to-inovara-primary-10 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-gradient-to-br from-inovara-secondary-10 to-inovara-accent-10 rounded-full blur-3xl animate-float" style={{ animationDelay: '6s' }}></div>
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)`,
            backgroundSize: '100px 100px'
          }}></div>
        </div>
        
        {/* Floating geometric shapes */}
        <div className="absolute top-20 right-20 w-4 h-4 bg-inovara-accent/20 rotate-45 animate-float"></div>
        <div className="absolute bottom-32 left-20 w-6 h-6 bg-inovara-secondary/20 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-3 h-3 bg-inovara-primary/20 rotate-45 animate-float" style={{ animationDelay: '4s' }}></div>
      </div>
    </>
  );
};

export default BackgroundEffect;