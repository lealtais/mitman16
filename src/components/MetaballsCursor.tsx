import { useEffect, useRef } from "react";

interface Blob {
  x: number;
  y: number;
  radius: number;
  phase: number;
  speed: number;
  orbitRadius: number;
}

interface MetaballsCursorProps {
  containerRef: React.RefObject<HTMLDivElement>;
  isHovering: boolean;
}

const MetaballsCursor = ({ containerRef, isHovering }: MetaballsCursorProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const targetRef = useRef({ x: -200, y: -200 });
  const mainBlobRef = useRef({ x: -200, y: -200, radius: 100 });
  const orbitingBlobsRef = useRef<Blob[]>([]);
  const animationFrameRef = useRef<number>();
  const timeRef = useRef(0);

  // Initialize orbiting blobs
  useEffect(() => {
    const blobs: Blob[] = [];
    for (let i = 0; i < 5; i++) {
      blobs.push({
        x: -200,
        y: -200,
        radius: 30 + Math.random() * 25,
        phase: (Math.PI * 2 * i) / 5,
        speed: 0.4 + Math.random() * 0.4,
        orbitRadius: 80 + Math.random() * 40,
      });
    }
    orbitingBlobsRef.current = blobs;
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      targetRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, [containerRef]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const drawMetaballs = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (!isHovering) return;

      // Create a temporary canvas for the metaball calculation
      const tempCanvas = document.createElement("canvas");
      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;
      const tempCtx = tempCanvas.getContext("2d");
      if (!tempCtx) return;

      // Draw all blobs with radial gradients
      const allBlobs = [
        { x: mainBlobRef.current.x, y: mainBlobRef.current.y, radius: mainBlobRef.current.radius },
        ...orbitingBlobsRef.current,
      ];

      allBlobs.forEach((blob) => {
        const gradient = tempCtx.createRadialGradient(
          blob.x, blob.y, 0,
          blob.x, blob.y, blob.radius * 1.5
        );
        gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
        gradient.addColorStop(0.5, "rgba(255, 255, 255, 0.5)");
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
        
        tempCtx.fillStyle = gradient;
        tempCtx.beginPath();
        tempCtx.arc(blob.x, blob.y, blob.radius * 1.5, 0, Math.PI * 2);
        tempCtx.fill();
      });

      // Apply threshold to create metaball effect
      const imageData = tempCtx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      const threshold = 180;

      for (let i = 0; i < data.length; i += 4) {
        const alpha = data[i + 3];
        if (alpha > threshold) {
          data[i] = 255;     // R
          data[i + 1] = 255; // G
          data[i + 2] = 255; // B
          data[i + 3] = 255; // A
        } else {
          data[i + 3] = 0;   // Fully transparent
        }
      }

      ctx.putImageData(imageData, 0, 0);
    };

    const animate = () => {
      timeRef.current += 0.016;
      const time = timeRef.current;

      // Smooth follow for main blob
      mainBlobRef.current.x = lerp(mainBlobRef.current.x, targetRef.current.x, 0.1);
      mainBlobRef.current.y = lerp(mainBlobRef.current.y, targetRef.current.y, 0.1);

      // Organic pulsation of main blob
      mainBlobRef.current.radius = 100 + Math.sin(time * 2) * 15 + Math.sin(time * 3.7) * 10;

      // Update orbiting blobs
      orbitingBlobsRef.current.forEach((blob, i) => {
        const angle = blob.phase + time * blob.speed;
        
        // Dynamic orbit radius with pulsation
        const dynamicOrbitRadius = blob.orbitRadius + Math.sin(time * 1.5 + i * 0.8) * 20;
        
        // Orbiting motion
        const targetX = mainBlobRef.current.x + Math.cos(angle) * dynamicOrbitRadius;
        const targetY = mainBlobRef.current.y + Math.sin(angle) * dynamicOrbitRadius;
        
        // Add organic wobble
        const wobbleX = Math.sin(time * 2.5 + i * 1.2) * 15;
        const wobbleY = Math.cos(time * 2.1 + i * 0.9) * 15;
        
        blob.x = lerp(blob.x, targetX + wobbleX, 0.08);
        blob.y = lerp(blob.y, targetY + wobbleY, 0.08);
        
        // Pulsating radius
        blob.radius = (30 + i * 5) + Math.sin(time * 3 + i * 0.7) * 12;
      });

      drawMetaballs();

      // Apply mask to the Toronto layer
      const torontoLayer = document.getElementById("toronto-reveal-layer");
      if (torontoLayer && canvasRef.current) {
        const dataUrl = canvasRef.current.toDataURL();
        torontoLayer.style.maskImage = `url(${dataUrl})`;
        torontoLayer.style.webkitMaskImage = `url(${dataUrl})`;
        torontoLayer.style.maskSize = "100% 100%";
        torontoLayer.style.webkitMaskSize = "100% 100%";
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [containerRef, isHovering]);

  // Clear mask when not hovering
  useEffect(() => {
    if (!isHovering) {
      const torontoLayer = document.getElementById("toronto-reveal-layer");
      if (torontoLayer) {
        torontoLayer.style.maskImage = "none";
        torontoLayer.style.webkitMaskImage = "none";
      }
    }
  }, [isHovering]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-20 opacity-0"
    />
  );
};

export default MetaballsCursor;
