import React, { useEffect, useRef } from "react";
import { Features } from "@/components/ui/feature-event";
import SectionWithMockup from "@/components/ui/section-with-mockup";
import gsap from "gsap";
import FlipLink from "@/components/ui/text-effect-flipper";
import { motion } from "motion/react";
import {  Highlight } from "@/components/ui/hero-highlight";

const exampleData1 = {
  title: (
    <>
      Welcome to
      <br />
    
  
           <motion.p
             initial={{
               opacity: 0,
               y: 20,
             }}
             animate={{
               opacity: 1,
               y: [20, -5, 0],
             }}
             transition={{
               duration: 0.5,
               ease: [0.4, 0.0, 0.2, 1],
             }}
          > 
          
             <Highlight className="text-black dark:text-white">
             SIGA Garment Fair 2025!
             </Highlight>
           </motion.p>
       
    </>
  ),
  description: (
    <>
      Join South India's premier garment industry event hosted by
      <br />
      South India Garment Association (SIGA). For over a decade,
      <br />
      we've united manufacturers, distributors, agents, and retailers
      <br />
      across the region. Discover new business opportunities,
      <br />
      network with industry leaders, and explore the latest trends.
    </>
  ),
  primaryImageSrc:
    "https://southindiagarmentsassociation.com/assets/images/banner/about.jpg",
  secondaryImageSrc:
    "https://southindiagarmentsassociation.com/assets/images/banner/about.jpg",
};

const Event = () => {
  const canvasRef = useRef(null);
  const fireworks = useRef([]);
  let rayRotation = 0;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Firework creation
    const createFirework = () => {
      const particles = [];
      const x = Math.random() * canvas.width;
      const y = Math.random() * (canvas.height * 0.5);
      const colorPalette = ["#FFD700", "#C0C0C0", "#FF6B6B", "#FFFFFF"];

      for (let i = 0; i < 30; i++) {
        const angle = (Math.PI * 2 * i) / 30;
        particles.push({
          x,
          y,
          radius: 2,
          color:
            colorPalette[Math.floor(Math.random() * colorPalette.length)],
          speed: 2 + Math.random() * 3,
          angle,
          alpha: 1,
        });
      }
      fireworks.current.push(particles);
    };

    const drawRays = () => {
      const rayCount = 24;
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(rayRotation);

      for (let i = 0; i < rayCount; i++) {
        ctx.rotate((Math.PI * 2) / rayCount);

        // Layer 1: Soft blurred rays
        const gradientSoft = ctx.createLinearGradient(0, 0, canvas.width, 0);
        gradientSoft.addColorStop(0, "rgba(255, 215, 0, 0.12)"); // Soft gold
        gradientSoft.addColorStop(0.5, "rgba(192, 192, 192, 0.06)"); // Silver
        gradientSoft.addColorStop(1, "rgba(255, 255, 255, 0)");
        ctx.fillStyle = gradientSoft;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(canvas.width, 200);
        ctx.lineTo(canvas.width, -200);
        ctx.closePath();
        ctx.filter = "blur(40px)";
        ctx.fill();

        // Layer 2: Sharp front rays
        const gradientSharp = ctx.createLinearGradient(0, 0, canvas.width, 0);
        gradientSharp.addColorStop(0, "rgba(255, 215, 0, 0.35)"); // Gold
        gradientSharp.addColorStop(0.5, "rgba(255, 107, 107, 0.25)"); // Coral
        gradientSharp.addColorStop(1, "rgba(255, 255, 255, 0)");
        ctx.fillStyle = gradientSharp;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(canvas.width, 80);
        ctx.lineTo(canvas.width, -80);
        ctx.closePath();
        ctx.filter = "none";
        ctx.fill();
      }

      ctx.restore();
      rayRotation += 0.002; // rotation speed
    };

    const drawFireworks = () => {
      fireworks.current.forEach((particles, index) => {
        particles.forEach((p) => {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${parseInt(
            p.color.slice(1, 3),
            16
          )}, ${parseInt(p.color.slice(3, 5), 16)}, ${parseInt(
            p.color.slice(5, 7),
            16)}, ${p.alpha})`;
          ctx.fill();

          p.x += Math.cos(p.angle) * p.speed;
          p.y += Math.sin(p.angle) * p.speed;
          p.alpha -= 0.02;
        });

        // Remove finished fireworks
        if (particles.every((p) => p.alpha <= 0)) {
          fireworks.current.splice(index, 1);
        }
      });
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawRays();
      drawFireworks();
      requestAnimationFrame(animate);
    };

    // Trigger fireworks every few seconds
    const fireworkInterval = setInterval(createFirework, 2500);

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      clearInterval(fireworkInterval);
    };
  }, []);

  return (
    <div className="relative w-full py-24 bg-white overflow-hidden">
      {/* Background Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 opacity-50 pointer-events-none"
      />

      {/* Foreground Content */}
      <div className="relative z-10 max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
        <SectionWithMockup
          title={exampleData1.title}
          description={exampleData1.description}
          primaryImageSrc={exampleData1.primaryImageSrc}
          secondaryImageSrc={exampleData1.secondaryImageSrc}
        />
        <Features />
      </div>
    </div>
  );
};

export default Event;
