import { cn } from '@/lib/utils';
import * as React from 'react';

const rand = (min, max) => Math.random() * (max - min) + min;
const randInt = (min, max) => Math.floor(Math.random() * (max - min) + min);
const randColor = () => `hsl(${randInt(0, 360)}, 100%, 50%)`;

function createParticle(x, y, color, speed, direction, gravity, friction, size) {
  const vx = Math.cos(direction) * speed;
  const vy = Math.sin(direction) * speed;
  const alpha = 1;
  const decay = rand(0.005, 0.02);
 
  return {
    x,
    y,
    color,
    speed,
    direction,
    vx,
    vy,
    gravity,
    friction,
    alpha,
    decay,
    size,
    update() {
      this.vx *= this.friction;
      this.vy *= this.friction;
      this.vy += this.gravity;
      this.x += this.vx;
      this.y += this.vy;
      this.alpha -= this.decay;
    },
    draw(ctx) {
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.restore();
    },
    isAlive() {
      return this.alpha > 0;
    },
  };
}

function createFirework(x, y, targetY, color, speed, size, particleSpeed, particleSize, onExplode) {
  const angle = -Math.PI / 2 + rand(-0.3, 0.3);
  const vx = Math.cos(angle) * speed;
  const vy = Math.sin(angle) * speed;
  const trail = [];
  const trailLength = randInt(10, 25);
 
  return {
    x,
    y,
    targetY,
    color,
    speed,
    size,
    angle,
    vx,
    vy,
    trail,
    trailLength,
    exploded: false,
    update() {
      this.trail.push({ x: this.x, y: this.y });
      if (this.trail.length > this.trailLength) {
        this.trail.shift();
      }
      this.x += this.vx;
      this.y += this.vy;
      this.vy += 0.01; 
      if (this.vy >= 0 || this.y <= this.targetY) {
        this.explode();
        return false;
      }
      return true;
    },
    explode() {
      const numParticles = randInt(50, 150);
      const particles = [];
      for (let i = 0; i < numParticles; i++) {
        const particleAngle = rand(0, Math.PI * 2);
        const localParticleSpeed = getValueByRange(particleSpeed);
        const localParticleSize = getValueByRange(particleSize);
        particles.push(createParticle(
          this.x,
          this.y,
          this.color,
          localParticleSpeed,
          particleAngle,
          0.03, 
          0.99, 
          localParticleSize
        ));
      }
      onExplode(particles);
    },
    draw(ctx) {
      ctx.save();
      ctx.beginPath();
      if (this.trail.length > 1) {
        ctx.moveTo(this.trail[0]?.x ?? this.x, this.trail[0]?.y ?? this.y);
        for (const point of this.trail) {
          ctx.lineTo(point.x, point.y);
        }
      } else {
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x, this.y);
      }
      ctx.strokeStyle = this.color;
      ctx.lineWidth = this.size;
      ctx.lineCap = 'round';
      ctx.stroke();
      ctx.restore();
    },
  };
}

function getValueByRange(range) {
  if (typeof range === 'number') {
    return range;
  }
  return rand(range.min, range.max);
}

function getColor(color) {
  if (Array.isArray(color)) {
    return color[randInt(0, color.length)] ?? randColor();
  }
  return color ?? randColor();
}

function FireworksBackground({
  children,
  className,
  canvasProps,
  population = 1,
  color,
  fireworkSpeed = { min: 2, max: 4 }, 
  fireworkSize = { min: 1, max: 3 }, 
  particleSpeed = { min: 1, max: 4 }, 
  particleSize = { min: 0.5, max: 1.5 }, 
  ...props
}) {
  const canvasRef = React.useRef(null);
  const containerRef = React.useRef(null);
 
  React.useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
  
    let maxX = container.offsetWidth;
    let maxY = container.offsetHeight;
    canvas.width = maxX;
    canvas.height = maxY;
  
    const setCanvasSize = () => {
      maxX = container.offsetWidth;
      maxY = container.offsetHeight;
      canvas.width = maxX;
      canvas.height = maxY;
    };
  
    const resizeObserver = new ResizeObserver(setCanvasSize);
    resizeObserver.observe(container);
  
    const explosions = [];
    const fireworks = [];
  
    const handleExplosion = (particles) => {
      explosions.push(...particles);
    };
  
    let launchTimeoutId;
  
    const launchFirework = () => {
      const x = rand(maxX * 0.1, maxX * 0.9);
      const y = maxY;
      const targetY = rand(maxY * 0.1, maxY * 0.4);
      const fireworkColor = getColor(color);
      const speed = getValueByRange(fireworkSpeed);
      const size = getValueByRange(fireworkSize);
      fireworks.push(
        createFirework(
          x,
          y,
          targetY,
          fireworkColor,
          speed,
          size,
          particleSpeed,
          particleSize,
          handleExplosion
        )
      );
      const timeout = rand(500, 1200) / population;
  
      // only schedule next firework if page is visible
      if (document.visibilityState === "visible") {
        launchTimeoutId = setTimeout(launchFirework, timeout);
      }
    };
  
    launchFirework();
  
    let animationFrameId;
    const animate = () => {
      ctx.clearRect(0, 0, maxX, maxY);
  
      for (let i = fireworks.length - 1; i >= 0; i--) {
        const firework = fireworks[i];
        if (!firework?.update()) {
          fireworks.splice(i, 1);
        } else {
          firework.draw(ctx);
        }
      }
  
      for (let i = explosions.length - 1; i >= 0; i--) {
        const particle = explosions[i];
        particle?.update();
        if (particle?.isAlive()) {
          particle.draw(ctx);
        } else {
          explosions.splice(i, 1);
        }
      }
  
      animationFrameId = requestAnimationFrame(animate);
    };
  
    animate();
  
    const handleClick = (event) => {
      const rect = container.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = maxY;
      const targetY = event.clientY - rect.top;
      const fireworkColor = getColor(color);
      const speed = getValueByRange(fireworkSpeed);
      const size = getValueByRange(fireworkSize);
      fireworks.push(
        createFirework(
          x,
          y,
          targetY,
          fireworkColor,
          speed,
          size,
          particleSpeed,
          particleSize,
          handleExplosion
        )
      );
    };
  
    container.addEventListener("click", handleClick);
  
    // Pause/Resume on tab visibility change
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        launchFirework(); // resume launching
      } else {
        clearTimeout(launchTimeoutId); // stop launching
      }
    };
  
    document.addEventListener("visibilitychange", handleVisibilityChange);
  
    return () => {
      resizeObserver.disconnect();
      container.removeEventListener("click", handleClick);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      cancelAnimationFrame(animationFrameId);
      clearTimeout(launchTimeoutId);
    };
  }, [population, color, fireworkSpeed, fireworkSize, particleSpeed, particleSize]);
  
 
  return (
    <div
      ref={containerRef}
      data-slot="fireworks-background"
      className={cn('relative w-full h-full', className)}
      {...props}>
      <canvas
        {...canvasProps}
        ref={canvasRef}
        className={cn('absolute inset-0 size-full  max-w-[85rem] mx-auto ', canvasProps?.className)} />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

export { FireworksBackground };