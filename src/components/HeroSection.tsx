import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import marnerVegas from "@/assets/marner-vegas.jpg";
import marnerLeafs from "@/assets/marner-leafs.jpg";

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const scrollToContent = () => {
    document.getElementById("the-dream")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden cursor-none"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Vegas Image (Top layer - visible by default) */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${marnerVegas})` }}
      />

      {/* Toronto Image (Bottom layer - revealed by flashlight) */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-300"
        style={{
          backgroundImage: `url(${marnerLeafs})`,
          clipPath: isHovering
            ? `circle(150px at ${mousePosition.x}px ${mousePosition.y}px)`
            : `circle(0px at ${mousePosition.x}px ${mousePosition.y}px)`,
        }}
      />

      {/* Flashlight glow effect */}
      {isHovering && (
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(circle 180px at ${mousePosition.x}px ${mousePosition.y}px, 
              transparent 0%, 
              transparent 70%,
              hsl(220 100% 45% / 0.2) 100%)`,
          }}
        />
      )}

      {/* Dark overlay */}
      <div className="hero-overlay absolute inset-0" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-center"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mb-4 text-sm uppercase tracking-[0.3em] text-muted-foreground md:text-base"
          >
            From Toronto to Vegas
          </motion.p>
          
          <h1 className="font-display text-7xl tracking-wider text-foreground md:text-9xl lg:text-[12rem]">
            MITCH
          </h1>
          <h1 className="font-display -mt-4 text-7xl tracking-wider md:-mt-6 md:text-9xl lg:-mt-10 lg:text-[12rem]">
            <span className="text-gradient-gold">MARNER</span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-6 max-w-md mx-auto text-muted-foreground md:text-lg"
          >
            Move your cursor to reveal the legacy
          </motion.p>
        </motion.div>

        {/* Custom cursor indicator */}
        {isHovering && (
          <div
            className="pointer-events-none fixed z-50 flex items-center justify-center"
            style={{
              left: mousePosition.x - 75,
              top: mousePosition.y - 75,
              width: 150,
              height: 150,
            }}
          >
            <div className="h-full w-full rounded-full border-2 border-primary/50 animate-pulse-slow" />
          </div>
        )}

        {/* Scroll indicator */}
        <motion.button
          onClick={scrollToContent}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer text-muted-foreground hover:text-foreground transition-colors"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <ChevronDown className="h-6 w-6 animate-bounce" />
          </div>
        </motion.button>
      </div>

      {/* Jersey indicator badges */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="absolute left-6 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-4"
      >
        <div className="flex items-center gap-3 rounded-full bg-card/80 backdrop-blur-sm px-4 py-2 border border-border">
          <div className="h-3 w-3 rounded-full bg-vegas-gold" />
          <span className="text-xs uppercase tracking-wider">Vegas</span>
        </div>
        <div className="flex items-center gap-3 rounded-full bg-card/80 backdrop-blur-sm px-4 py-2 border border-primary/50">
          <div className="h-3 w-3 rounded-full bg-primary" />
          <span className="text-xs uppercase tracking-wider">Toronto</span>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
