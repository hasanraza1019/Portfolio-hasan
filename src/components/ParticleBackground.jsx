import { useEffect, useRef } from "react";

export default function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let width, height, particles, stars, animId;

    const mouse = {
      x: null,
      y: null,
      prevX: null,
      prevY: null,
      radius: 220, // ماؤس کا ڈوٹس کو پکڑنے کا دائرہ
    };

    const colors = ["#00e5ff", "#7b2ff7", "#00ffae", "#38bdf8", "#c084fc"];

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const init = () => {
      resize();
      const particleCount = Math.min(130, Math.max(75, Math.floor((width * height) / 11000)));
      particles = Array.from({ length: particleCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 2.2 + 1.2,
        baseR: Math.random() * 2.2 + 1.2,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.4 + 0.45,
      }));

      const starCount = Math.min(90, Math.floor((width * height) / 16000));
      stars = Array.from({ length: starCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.1 + 0.2,
        tw: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.02 + 0.01,
      }));
    };

    const onMouseMove = (e) => {
      if (mouse.x !== null) {
        mouse.prevX = mouse.x;
        mouse.prevY = mouse.y;
      } else {
        mouse.prevX = e.clientX;
        mouse.prevY = e.clientY;
      }
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const onMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
      mouse.prevX = null;
      mouse.prevY = null;
    };

    const onTouchMove = (e) => {
      if (e.touches && e.touches.length > 0) {
        const touch = e.touches[0];
        if (mouse.x !== null) {
          mouse.prevX = mouse.x;
          mouse.prevY = mouse.y;
        } else {
          mouse.prevX = touch.clientX;
          mouse.prevY = touch.clientY;
        }
        mouse.x = touch.clientX;
        mouse.y = touch.clientY;
      }
    };

    const onTouchEnd = () => {
      mouse.x = null;
      mouse.y = null;
      mouse.prevX = null;
      mouse.prevY = null;
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. تارے (Stars)
      stars.forEach((s) => {
        s.tw += s.speed;
        const a = (Math.sin(s.tw) + 1) / 2;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${0.1 + a * 0.4})`;
        ctx.fill();
      });

      // 2. ماؤس کی اسپیڈ
      const hasMouse = mouse.x !== null && mouse.y !== null;
      let mouseDeltaX = 0;
      let mouseDeltaY = 0;
      if (hasMouse && mouse.prevX !== null && mouse.prevY !== null) {
        mouseDeltaX = (mouse.x - mouse.prevX) * 0.35;
        mouseDeltaY = (mouse.y - mouse.prevY) * 0.35;
      }

      // 3. ڈوٹس اور ماؤس کے درمیان مقناطیسی گرفت (Magnetic Attraction)
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) { p.x = 0; p.vx *= -1; }
        if (p.x > width) { p.x = width; p.vx *= -1; }
        if (p.y < 0) { p.y = 0; p.vy *= -1; }
        if (p.y > height) { p.y = height; p.vy *= -1; }

        let isCaught = false;
        let distToMouse = 9999;

        if (hasMouse) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          distToMouse = Math.sqrt(dx * dx + dy * dy);

          if (distToMouse < mouse.radius && distToMouse > 0) {
            isCaught = true;
            const force = (mouse.radius - distToMouse) / mouse.radius;
            const forceX = (dx / distToMouse) * force;
            const forceY = (dy / distToMouse) * force;

            // طاقتور مقناطیس: ڈوٹس ماؤس کی طرف بھاگتے ہیں
            if (distToMouse > 40) {
              p.x += forceX * 6.0;
              p.y += forceY * 6.0;
            } else {
              p.x -= (dx / distToMouse) * 1.5;
              p.y -= (dy / distToMouse) * 1.5;
            }

            // ماؤس جس طرف جائے ڈوٹس بھی اسی سمت کھنچتے ہیں
            p.x += mouseDeltaX * force * 0.7;
            p.y += mouseDeltaY * force * 0.7;

            // روشن نیین لیزر لائن
            const lineAlpha = Math.pow(1 - distToMouse / mouse.radius, 1.1) * 0.85;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(0, 229, 255, ${lineAlpha})`;
            ctx.lineWidth = (1 - distToMouse / mouse.radius) * 2.2 + 0.6;
            ctx.shadowBlur = 10;
            ctx.shadowColor = "#00e5ff";
            ctx.stroke();
            ctx.shadowBlur = 0;
          }
        }

        // ڈاٹ بنانا اور پکڑے جانے پر زمردی چمک دینا
        ctx.beginPath();
        const currentRadius = isCaught ? p.baseR * 1.8 : p.baseR;
        ctx.arc(p.x, p.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = isCaught ? "#00ffae" : p.color;
        ctx.globalAlpha = isCaught ? 1 : p.alpha;
        ctx.shadowBlur = isCaught ? 18 : 8;
        ctx.shadowColor = isCaught ? "#00ffae" : p.color;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;

        // آپس میں قریب ڈوٹس کا جال بنانا
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const cdx = p.x - q.x;
          const cdy = p.y - q.y;
          const dist = Math.sqrt(cdx * cdx + cdy * cdy);
          if (dist < 125) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            const interAlpha = (1 - dist / 125) * 0.22;
            ctx.strokeStyle = `rgba(0, 229, 255, ${interAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      });

      // ماؤس کے مرکز پر نیین چمک
      if (hasMouse) {
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 8, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 229, 255, 0.75)";
        ctx.shadowBlur = 22;
        ctx.shadowColor = "#00e5ff";
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 18, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(0, 255, 174, 0.4)";
        ctx.lineWidth = 1.2;
        ctx.shadowBlur = 12;
        ctx.shadowColor = "#00ffae";
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      animId = requestAnimationFrame(draw);
    };

    init();
    draw();

    window.addEventListener("resize", init);
    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);

    return () => {
      window.removeEventListener("resize", init);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[20] pointer-events-none"
      aria-hidden="true"
    />
  );
}