'use client';

import { useEffect, useRef } from 'react';
import { heroAtmosphereShader, heroFlowShader, heroVertexShader } from './hero-shaders';
import { createHeroStarfield } from './hero-starfield';

type FlowTarget = { texture: WebGLTexture; framebuffer: WebGLFramebuffer };

export function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const hero = canvas?.closest<HTMLElement>('.hero');
    const gl = canvas?.getContext('webgl', { alpha: true, premultipliedAlpha: false, antialias: false, powerPreference: 'low-power' });
    if (!canvas || !hero || !gl) return;
    const stars = starsRef.current ? createHeroStarfield(starsRef.current) : null;

    const shaders: WebGLShader[] = [];
    const programs: WebGLProgram[] = [];
    const flowTargets: FlowTarget[] = [];
    const buffer = gl.createBuffer();
    const release = () => {
      flowTargets.forEach(({ texture, framebuffer }) => {
        gl.deleteTexture(texture);
        gl.deleteFramebuffer(framebuffer);
      });
      gl.deleteBuffer(buffer);
      shaders.forEach((shader) => gl.deleteShader(shader));
      programs.forEach((program) => gl.deleteProgram(program));
    };
    const compile = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      shaders.push(shader);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return gl.getShaderParameter(shader, gl.COMPILE_STATUS) ? shader : null;
    };
    const vertex = compile(gl.VERTEX_SHADER, heroVertexShader);
    const link = (source: string) => {
      const fragment = compile(gl.FRAGMENT_SHADER, source);
      const program = gl.createProgram();
      if (program) programs.push(program);
      if (!vertex || !fragment || !program) return null;
      gl.attachShader(program, vertex);
      gl.attachShader(program, fragment);
      gl.bindAttribLocation(program, 0, 'position');
      gl.linkProgram(program);
      return gl.getProgramParameter(program, gl.LINK_STATUS) ? program : null;
    };
    const atmosphereProgram = link(heroAtmosphereShader);
    const flowProgram = link(heroFlowShader);
    if (!buffer || !atmosphereProgram || !flowProgram) { release(); return; }

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    const atmosphere = {
      resolution: gl.getUniformLocation(atmosphereProgram, 'resolution'),
      time: gl.getUniformLocation(atmosphereProgram, 'time'),
      entrance: gl.getUniformLocation(atmosphereProgram, 'entrance'),
      ripple: gl.getUniformLocation(atmosphereProgram, 'ripple'),
      rippleGain: gl.getUniformLocation(atmosphereProgram, 'rippleGain'),
      lightTheme: gl.getUniformLocation(atmosphereProgram, 'lightTheme'),
      flowmap: gl.getUniformLocation(atmosphereProgram, 'flowmap'),
      center: gl.getUniformLocation(atmosphereProgram, 'center'),
      ringSize: gl.getUniformLocation(atmosphereProgram, 'ringSize'),
      readingPlane: gl.getUniformLocation(atmosphereProgram, 'readingPlane'),
      neutral: gl.getUniformLocation(atmosphereProgram, 'neutral'),
      background: gl.getUniformLocation(atmosphereProgram, 'background'),
    };
    const flow = {
      previous: gl.getUniformLocation(flowProgram, 'previous'),
      pointer: gl.getUniformLocation(flowProgram, 'pointer'),
      lastPointer: gl.getUniformLocation(flowProgram, 'lastPointer'),
      velocity: gl.getUniformLocation(flowProgram, 'velocity'),
      aspect: gl.getUniformLocation(flowProgram, 'aspect'),
      delta: gl.getUniformLocation(flowProgram, 'delta'),
      active: gl.getUniformLocation(flowProgram, 'active'),
      neutral: gl.getUniformLocation(flowProgram, 'neutral'),
    };
    const halfFloat = gl.getExtension('OES_texture_half_float');
    const halfFloatLinear = gl.getExtension('OES_texture_half_float_linear');
    const halfFloatColor = gl.getExtension('EXT_color_buffer_half_float');
    let flowType: number = halfFloat && halfFloatLinear && halfFloatColor
      ? halfFloat.HALF_FLOAT_OES : gl.UNSIGNED_BYTE;
    const flowNeutral = () => flowType === gl.UNSIGNED_BYTE ? 128 / 255 : .5;
    const viewportLimit: Int32Array = gl.getParameter(gl.MAX_VIEWPORT_DIMS);
    const dimensionLimit = Math.min(
      gl.getParameter(gl.MAX_TEXTURE_SIZE),
      gl.getParameter(gl.MAX_RENDERBUFFER_SIZE),
      viewportLimit[0], viewportLimit[1],
    );
    for (let i = 0; i < 2; i++) {
      const texture = gl.createTexture();
      const framebuffer = gl.createFramebuffer();
      if (!texture || !framebuffer) {
        if (texture) gl.deleteTexture(texture);
        if (framebuffer) gl.deleteFramebuffer(framebuffer);
        release();
        return;
      }
      flowTargets.push({ texture, framebuffer });
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    }

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    let pixelRatio = window.devicePixelRatio || 1;
    let density = window.matchMedia(`(resolution: ${pixelRatio}dppx)`);
    const target = { x: .5, y: .5, active: false, initialized: false };
    const pointer = { x: .5, y: .5, vx: 0, vy: 0 };
    let frame = 0;
    let lastTime = 0;
    let lastInput = -Infinity;
    let elapsed = 0;
    const entranceDuration = 2.4;
    const scrollRippleDuration = 1.2;
    const scrollRippleGain = .55;
    let rippleDuration = entranceDuration;
    let rippleGain = 1;
    let entranceElapsed = motion.matches ? entranceDuration : 0;
    let rippleElapsed = motion.matches ? rippleDuration : 0;
    let scrolledAway = window.scrollY > 120;
    let visible = true;
    let lost = false;
    let ready = false;
    let readIndex = 0;
    let flowWidth = 1;
    let flowHeight = 1;
    let bounds = hero.getBoundingClientRect();
    let light = document.documentElement.dataset.theme === 'light';
    const readBackground = () => {
      const hex = window.getComputedStyle(document.documentElement).getPropertyValue('--bg').trim();
      return /^#[\da-f]{6}$/i.test(hex)
        ? [1, 3, 5].map((offset) => parseInt(hex.slice(offset, offset + 2), 16) / 255)
        : light ? [248 / 255, 247 / 255, 244 / 255] : [12 / 255, 14 / 255, 18 / 255];
    };
    let background = readBackground();
    const canAnimate = () => !motion.matches && visible && !document.hidden && !lost;
    const resetInput = () => {
      target.active = false;
      target.initialized = false;
      pointer.vx = 0;
      pointer.vy = 0;
      lastInput = -Infinity;
    };
    const clearFlow = () => {
      gl.clearColor(0, flowNeutral(), flowNeutral(), 1);
      for (const { framebuffer } of flowTargets) {
        gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
        gl.clear(gl.COLOR_BUFFER_BIT);
      }
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    };
    const render = (delta = 0) => {
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.useProgram(atmosphereProgram);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, flowTargets[readIndex].texture);
      gl.uniform1i(atmosphere.flowmap, 0);
      gl.uniform1f(atmosphere.neutral, flowNeutral());
      gl.uniform3f(atmosphere.background, background[0], background[1], background[2]);
      gl.uniform2f(atmosphere.resolution, canvas.width, canvas.height);
      gl.uniform1f(atmosphere.time, elapsed);
      const progress = Math.min(1, entranceElapsed / entranceDuration);
      const expansion = 1 - Math.pow(1 - progress, 3);
      gl.uniform1f(atmosphere.entrance, progress);
      gl.uniform1f(atmosphere.ripple, Math.min(1, rippleElapsed / rippleDuration));
      gl.uniform1f(atmosphere.rippleGain, rippleGain);
      gl.uniform1f(atmosphere.lightTheme, light ? 1 : 0);
      gl.uniform2f(atmosphere.center, .5, .53);
      const ringRadius = Math.min(350, bounds.height * .28) / bounds.height;
      const radius = .004 + (ringRadius - .004) * expansion;
      gl.uniform2f(atmosphere.ringSize, radius, radius);
      gl.uniform2f(atmosphere.readingPlane, Math.min(350, bounds.width * .36) / bounds.height, .23);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      stars?.render(delta, light, target.active ? {
        x: pointer.x * bounds.width,
        y: (1 - pointer.y) * bounds.height,
      } : null);
      if (!ready) {
        ready = true;
        canvas.dataset.ready = 'true';
        hero.dataset.atmosphereReady = 'true';
      }
    };
    const updateFlow = (delta: number) => {
      const previousX = pointer.x;
      const previousY = pointer.y;
      const positionEase = 1 - Math.pow(.9, delta * 30);
      const velocityEase = 1 - Math.pow(.8, delta * 30);
      pointer.x += (target.x - pointer.x) * positionEase;
      pointer.y += (target.y - pointer.y) * positionEase;
      pointer.vx += ((target.x - pointer.x) * .5 - pointer.vx) * velocityEase;
      pointer.vy += ((target.y - pointer.y) * .5 - pointer.vy) * velocityEase;
      const writeIndex = 1 - readIndex;
      gl.bindFramebuffer(gl.FRAMEBUFFER, flowTargets[writeIndex].framebuffer);
      gl.viewport(0, 0, flowWidth, flowHeight);
      gl.useProgram(flowProgram);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, flowTargets[readIndex].texture);
      gl.uniform1i(flow.previous, 0);
      gl.uniform1f(flow.neutral, flowNeutral());
      gl.uniform2f(flow.pointer, pointer.x, pointer.y);
      gl.uniform2f(flow.lastPointer, previousX, previousY);
      gl.uniform2f(flow.velocity, pointer.vx, pointer.vy);
      gl.uniform1f(flow.aspect, bounds.width / bounds.height);
      gl.uniform1f(flow.delta, delta);
      const idle = Math.min(1, Math.max(0, (performance.now() - lastInput - 80) / 160));
      const activity = 1 - idle * idle * (3 - 2 * idle);
      gl.uniform1f(flow.active, target.active && finePointer.matches ? activity : 0);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      readIndex = writeIndex;
    };
    const tick = (now: number) => {
      frame = 0;
      if (!canAnimate()) return;
      if ((window.devicePixelRatio || 1) !== pixelRatio) { densityChanged(); return; }
      const interval = entranceElapsed < entranceDuration || rippleElapsed < rippleDuration || now - lastInput < 1200
        ? 1000 / 60 : 1000 / 30;
      if (now - lastTime >= interval - .5) {
        const delta = Math.min((now - lastTime) / 1000, .08);
        elapsed += delta;
        entranceElapsed = Math.min(entranceDuration, entranceElapsed + delta);
        rippleElapsed = Math.min(rippleDuration, rippleElapsed + delta);
        lastTime = now;
        updateFlow(delta);
        render(delta);
      }
      frame = requestAnimationFrame(tick);
    };
    const wake = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      lastTime = performance.now();
      if (lost) return;
      if ((window.devicePixelRatio || 1) !== pixelRatio) { densityChanged(); return; }
      if (!canAnimate()) resetInput();
      if (motion.matches) {
        entranceElapsed = entranceDuration;
        rippleElapsed = rippleDuration;
        clearFlow();
      }
      render();
      if (canAnimate()) frame = requestAnimationFrame(tick);
    };
    const allocateFlow = () => {
      for (const { texture, framebuffer } of flowTargets) {
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, flowWidth, flowHeight, 0, gl.RGBA, flowType, null);
        gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
        if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) !== gl.FRAMEBUFFER_COMPLETE) return false;
      }
      return true;
    };
    const resize = () => {
      if (lost) return;
      bounds = hero.getBoundingClientRect();
      if (bounds.width <= 0 || bounds.height <= 0) return;
      stars?.resize(bounds.width, bounds.height);
      const scale = Math.min(window.devicePixelRatio || 1, finePointer.matches ? 2 : 1.5,
        Math.sqrt(2_000_000 / (bounds.width * bounds.height)),
        dimensionLimit / bounds.width, dimensionLimit / bounds.height);
      canvas.width = Math.max(1, Math.floor(bounds.width * scale));
      canvas.height = Math.max(1, Math.floor(bounds.height * scale));
      const flowScale = Math.min(1, 640 / bounds.width, 384 / bounds.height,
        dimensionLimit / bounds.width, dimensionLimit / bounds.height);
      flowWidth = Math.max(1, Math.floor(bounds.width * flowScale));
      flowHeight = Math.max(1, Math.floor(bounds.height * flowScale));
      let allocated = allocateFlow();
      if (!allocated && flowType !== gl.UNSIGNED_BYTE) {
        flowType = gl.UNSIGNED_BYTE;
        allocated = allocateFlow();
      }
      if (!allocated) {
        lost = true;
        delete canvas.dataset.ready;
        delete hero.dataset.atmosphereReady;
        cancelAnimationFrame(frame);
        return;
      }
      resetInput();
      clearFlow();
      wake();
    };
    const densityChanged = () => {
      density.removeEventListener('change', densityChanged);
      pixelRatio = window.devicePixelRatio || 1;
      density = window.matchMedia(`(resolution: ${pixelRatio}dppx)`);
      density.addEventListener('change', densityChanged);
      resize();
    };
    const move = (event: PointerEvent) => {
      if (!finePointer.matches || event.pointerType === 'touch' || !canAnimate()) return;
      const x = Math.max(0, Math.min(1, (event.clientX - bounds.left) / bounds.width));
      const y = Math.max(0, Math.min(1, 1 - (event.clientY - bounds.top) / bounds.height));
      if (!target.initialized) {
        pointer.x = x;
        pointer.y = y;
        target.initialized = true;
      }
      target.x = x;
      target.y = y;
      target.active = true;
      lastInput = performance.now();
    };
    const updateBounds = () => {
      bounds = hero.getBoundingClientRect();
      resetInput();
      const offset = window.scrollY;
      if (offset > 120) scrolledAway = true;
      else if (offset <= 2 && scrolledAway) {
        scrolledAway = false;
        if (!motion.matches) {
          rippleDuration = scrollRippleDuration;
          rippleGain = scrollRippleGain;
          rippleElapsed = 0;
          wake();
        }
      }
    };
    const contextLost = () => {
      lost = true;
      delete canvas.dataset.ready;
      delete hero.dataset.atmosphereReady;
      cancelAnimationFrame(frame);
    };
    const sizeObserver = new ResizeObserver(resize);
    sizeObserver.observe(canvas);
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      wake();
    });
    intersection.observe(hero);
    const themeObserver = new MutationObserver(() => {
      light = document.documentElement.dataset.theme === 'light';
      background = readBackground();
      wake();
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    hero.addEventListener('pointermove', move, { passive: true });
    hero.addEventListener('pointerleave', resetInput);
    canvas.addEventListener('webglcontextlost', contextLost);
    document.addEventListener('visibilitychange', wake);
    window.addEventListener('scroll', updateBounds, { passive: true });
    window.addEventListener('blur', resetInput);
    window.addEventListener('focus', wake);
    motion.addEventListener('change', wake);
    finePointer.addEventListener('change', resize);
    density.addEventListener('change', densityChanged);
    resize();

    return () => {
      delete canvas.dataset.ready;
      delete hero.dataset.atmosphereReady;
      cancelAnimationFrame(frame);
      sizeObserver.disconnect();
      intersection.disconnect();
      themeObserver.disconnect();
      hero.removeEventListener('pointermove', move);
      hero.removeEventListener('pointerleave', resetInput);
      canvas.removeEventListener('webglcontextlost', contextLost);
      document.removeEventListener('visibilitychange', wake);
      window.removeEventListener('scroll', updateBounds);
      window.removeEventListener('blur', resetInput);
      window.removeEventListener('focus', wake);
      motion.removeEventListener('change', wake);
      finePointer.removeEventListener('change', resize);
      density.removeEventListener('change', densityChanged);
      release();
    };
  }, []);

  return (
    <div aria-hidden="true" className="hero-atmosphere">
      <div className="hero-orbit-fallback" />
      <canvas className="hero-canvas" ref={canvasRef} />
      <canvas className="hero-stars" ref={starsRef} />
    </div>
  );
}
