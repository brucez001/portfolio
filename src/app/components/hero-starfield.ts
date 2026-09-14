type Particle = {
  bright: boolean;
  phase: number;
  radius: number;
  vx: number;
  vy: number;
  x: number;
  y: number;
};

type Pointer = { x: number; y: number };

export type HeroStarfield = {
  render(delta: number, pointer: Pointer | null): void;
  resize(width: number, height: number): void;
};

const CONNECTION_DISTANCE = 130;
const ATTRACTION_DISTANCE = 180;
const ACCENT_RGB = '107,158,255';
const MUTED_RGB = '77,85,102';

function createParticle(width: number, height: number): Particle {
  return {
    bright: Math.random() > 0.74,
    phase: Math.random() * Math.PI * 2,
    radius: Math.random() * 1.6 + 0.7,
    vx: (Math.random() - 0.5) * 0.18,
    vy: (Math.random() - 0.5) * 0.18,
    x: Math.random() * width,
    y: Math.random() * height,
  };
}

export function createHeroStarfield(canvas: HTMLCanvasElement): HeroStarfield | null {
  const context = canvas.getContext('2d');
  if (!context) return null;

  let width = 0;
  let height = 0;
  let time = 0;
  let particles: Particle[] = [];

  const resize = (nextWidth: number, nextHeight: number): void => {
    width = Math.max(0, nextWidth);
    height = Math.max(0, nextHeight);
    const devicePixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.max(1, Math.round(width * devicePixelRatio));
    canvas.height = Math.max(1, Math.round(height * devicePixelRatio));
    context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    const count = Math.max(8, Math.min(72, Math.floor((width * height) / 7500)));
    particles = Array.from({ length: count }, () => createParticle(width, height));
  };

  const render = (delta: number, pointer: Pointer | null): void => {
    context.clearRect(0, 0, width, height);
    if (width <= 0 || height <= 0 || particles.length === 0) return;

    const frameScale = Math.max(0, Math.min(delta, 0.1)) * 60;
    const damping = Math.pow(0.997, frameScale);
    time += 0.001 * frameScale;

    for (let index = 0; index < particles.length; index += 1) {
      const particle = particles[index];

      if (frameScale > 0) {
        particle.vx += Math.sin(time + particle.phase) * 0.001 * frameScale;
        particle.vy += Math.cos(time * 0.8 + particle.phase) * 0.001 * frameScale;
        particle.x += particle.vx * frameScale;
        particle.y += particle.vy * frameScale;

        if (particle.x < 0 || particle.x > width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > height) particle.vy *= -1;

        particle.x = Math.max(0, Math.min(width, particle.x));
        particle.y = Math.max(0, Math.min(height, particle.y));

        if (pointer) {
          const dx = pointer.x - particle.x;
          const dy = pointer.y - particle.y;
          const distance = Math.hypot(dx, dy);
          if (distance < ATTRACTION_DISTANCE && distance > 1) {
            particle.vx += (dx / distance) * 0.007 * frameScale;
            particle.vy += (dy / distance) * 0.007 * frameScale;
          }
        }

        particle.vx *= damping;
        particle.vy *= damping;
      }

      context.beginPath();
      context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      context.fillStyle = particle.bright ? `rgba(${ACCENT_RGB},0.8)` : `rgba(${MUTED_RGB},0.35)`;
      context.fill();

      for (let other = index + 1; other < particles.length; other += 1) {
        const target = particles[other];
        const distance = Math.hypot(particle.x - target.x, particle.y - target.y);
        if (distance < CONNECTION_DISTANCE) {
          context.beginPath();
          context.moveTo(particle.x, particle.y);
          context.lineTo(target.x, target.y);
          context.strokeStyle = `rgba(${ACCENT_RGB},${(1 - distance / CONNECTION_DISTANCE) * 0.12})`;
          context.lineWidth = 0.6;
          context.stroke();
        }
      }
    }
  };

  return { render, resize };
}
