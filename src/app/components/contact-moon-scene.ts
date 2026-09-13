import {
  dustFragmentShader,
  dustVertexShader,
  haloFragmentShader,
  moonFragmentShader,
  moonVertexShader,
  quadVertexShader,
  rimFragmentShader,
  rimVertexShader,
} from './contact-moon-shaders';

export type ContactMoonScene = {
  dispose(): void;
  setVisible(visible: boolean): void;
};

type Program = {
  attributes: Record<string, number>;
  program: WebGLProgram;
  uniforms: Record<string, WebGLUniformLocation | null>;
};

const TEXTURE_SRC = '/assets/moon-2k.jpg';
const SPHERE_SEGMENTS = 96;
const SPHERE_RINGS = 64;
const DUST_COUNT = 1600;
const LIGHT = normalize([-0.42, 0.36, 0.84]);

function normalize([x, y, z]: number[]): [number, number, number] {
  const length = Math.hypot(x, y, z) || 1;
  return [x / length, y / length, z / length];
}

function hexToRgb(hex: string): [number, number, number] {
  const value = parseInt(hex.trim().replace('#', ''), 16);
  if (Number.isNaN(value)) return [0.42, 0.62, 1];
  return [((value >> 16) & 255) / 255, ((value >> 8) & 255) / 255, (value & 255) / 255];
}

function readAccent(): [number, number, number] {
  const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent');
  return accent ? hexToRgb(accent) : [0.42, 0.62, 1];
}

function buildSphere(): { indices: Uint16Array<ArrayBuffer>; positions: Float32Array<ArrayBuffer>; uvs: Float32Array<ArrayBuffer> } {
  const vertexCount = (SPHERE_SEGMENTS + 1) * (SPHERE_RINGS + 1);
  const positions = new Float32Array(vertexCount * 3);
  const uvs = new Float32Array(vertexCount * 2);
  const indices = new Uint16Array(SPHERE_SEGMENTS * SPHERE_RINGS * 6);
  let vertex = 0;
  for (let ring = 0; ring <= SPHERE_RINGS; ring++) {
    const v = ring / SPHERE_RINGS;
    const theta = v * Math.PI;
    for (let segment = 0; segment <= SPHERE_SEGMENTS; segment++) {
      const u = segment / SPHERE_SEGMENTS;
      const phi = u * Math.PI * 2;
      positions[vertex * 3] = Math.sin(theta) * Math.cos(phi);
      positions[vertex * 3 + 1] = Math.cos(theta);
      positions[vertex * 3 + 2] = Math.sin(theta) * Math.sin(phi);
      uvs[vertex * 2] = u;
      uvs[vertex * 2 + 1] = v;
      vertex++;
    }
  }
  let index = 0;
  for (let ring = 0; ring < SPHERE_RINGS; ring++) {
    for (let segment = 0; segment < SPHERE_SEGMENTS; segment++) {
      const a = ring * (SPHERE_SEGMENTS + 1) + segment;
      const b = a + SPHERE_SEGMENTS + 1;
      indices[index++] = a;
      indices[index++] = b;
      indices[index++] = a + 1;
      indices[index++] = b;
      indices[index++] = b + 1;
      indices[index++] = a + 1;
    }
  }
  return { indices, positions, uvs };
}

function buildDustSeeds(): Float32Array<ArrayBuffer> {
  const seeds = new Float32Array(DUST_COUNT);
  for (let i = 0; i < DUST_COUNT; i++) {
    const x = Math.sin((i * 2.13 + 500) * 12.9898 + 78.233) * 43758.5453;
    seeds[i] = (x - Math.floor(x)) * 1000;
  }
  return seeds;
}

export function createContactMoonScene(canvas: HTMLCanvasElement, stage: HTMLElement): ContactMoonScene | null {
  const gl = canvas.getContext('webgl', { alpha: true, antialias: true, powerPreference: 'low-power', premultipliedAlpha: true });
  if (!gl) return null;

  const shaders: WebGLShader[] = [];
  const programs: WebGLProgram[] = [];
  const buffers: WebGLBuffer[] = [];
  let texture: WebGLTexture | null = null;

  const compile = (type: number, source: string): WebGLShader | null => {
    const shader = gl.createShader(type);
    if (!shader) return null;
    shaders.push(shader);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    return gl.getShaderParameter(shader, gl.COMPILE_STATUS) ? shader : null;
  };
  const link = (vertexSource: string, fragmentSource: string, attributeNames: string[]): Program | null => {
    const vertex = compile(gl.VERTEX_SHADER, vertexSource);
    const fragment = compile(gl.FRAGMENT_SHADER, fragmentSource);
    const program = gl.createProgram();
    if (program) programs.push(program);
    if (!vertex || !fragment || !program) return null;
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return null;
    const uniforms: Record<string, WebGLUniformLocation | null> = {};
    const count = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS) as number;
    for (let i = 0; i < count; i++) {
      const info = gl.getActiveUniform(program, i);
      if (info) uniforms[info.name] = gl.getUniformLocation(program, info.name);
    }
    const attributes: Record<string, number> = {};
    attributeNames.forEach((name) => { attributes[name] = gl.getAttribLocation(program, name); });
    return { attributes, program, uniforms };
  };
  const createBuffer = (target: number, data: ArrayBufferView<ArrayBuffer>): WebGLBuffer | null => {
    const buffer = gl.createBuffer();
    if (!buffer) return null;
    buffers.push(buffer);
    gl.bindBuffer(target, buffer);
    gl.bufferData(target, data, gl.STATIC_DRAW);
    return buffer;
  };

  const release = () => {
    if (texture) gl.deleteTexture(texture);
    buffers.forEach((buffer) => gl.deleteBuffer(buffer));
    shaders.forEach((shader) => gl.deleteShader(shader));
    programs.forEach((program) => gl.deleteProgram(program));
  };

  const moonProgram = link(moonVertexShader, moonFragmentShader, ['aPos', 'aUv']);
  const rimProgram = link(rimVertexShader, rimFragmentShader, ['aPos']);
  const haloProgram = link(quadVertexShader, haloFragmentShader, ['aQuad']);
  const dustProgram = link(dustVertexShader, dustFragmentShader, ['aSeed']);
  const sphere = buildSphere();
  const positionBuffer = createBuffer(gl.ARRAY_BUFFER, sphere.positions);
  const uvBuffer = createBuffer(gl.ARRAY_BUFFER, sphere.uvs);
  const indexBuffer = createBuffer(gl.ELEMENT_ARRAY_BUFFER, sphere.indices);
  const quadBuffer = createBuffer(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]));
  const dustBuffer = createBuffer(gl.ARRAY_BUFFER, buildDustSeeds());
  if (!moonProgram || !rimProgram || !haloProgram || !dustProgram || !positionBuffer || !uvBuffer || !indexBuffer || !quadBuffer || !dustBuffer) {
    release();
    return null;
  }

  let textureReady = false;
  let textureSize: [number, number] = [2048, 1024];
  const image = new Image();
  image.decoding = 'async';
  image.onload = () => {
    if (disposed) return;
    texture = gl.createTexture();
    if (!texture) return;
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    textureSize = [image.naturalWidth, image.naturalHeight];
    textureReady = true;
    entranceStart = 0;
    requestFrame();
  };
  image.src = TEXTURE_SRC;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let disposed = false;
  let visible = false;
  let frame = 0;
  let width = 1;
  let height = 1;
  let dpr = 1;
  let entranceStart = 0;
  let light = document.documentElement.dataset.theme === 'light';
  let accent = readAccent();
  const clock = { last: 0, time: 0 };

  const resize = () => {
    const rect = stage.getBoundingClientRect();
    width = Math.max(1, rect.width);
    height = Math.max(1, rect.height);
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    gl.viewport(0, 0, canvas.width, canvas.height);
    requestFrame();
  };

  const draw = (now: number) => {
    if (!textureReady || !texture || (!visible && !reducedMotion)) return;
    if (!reducedMotion) {
      if (!entranceStart) entranceStart = now;
      if (clock.last) clock.time += Math.min(0.1, (now - clock.last) / 1000);
      clock.last = now;
    }
    const time = reducedMotion ? 3.7 : clock.time;
    let entrance = reducedMotion ? 1 : Math.min(1, (now - entranceStart) / 1800);
    entrance = 1 - Math.pow(1 - entrance, 3);

    const narrow = width < 720;
    const radius = narrow ? width * 0.55 : Math.min(height * 0.62, width * 0.45);
    const cx = width * dpr;
    const cy = (height + (1 - entrance) * radius * 0.3) * dpr;
    const r = radius * dpr;
    const spin = (reducedMotion ? 0.6 : time * 0.02) + 2.4;
    const lightTheme = light ? 1 : 0;

    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.enable(gl.BLEND);
    // Shaders output premultiplied colour, so the canvas composites over the page correctly.
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    // Soft halo hugging the lit limb, in screen space behind the moon.
    gl.useProgram(haloProgram.program);
    gl.uniform2f(haloProgram.uniforms.uRes, canvas.width, canvas.height);
    gl.uniform2f(haloProgram.uniforms.uCenter, cx, cy);
    gl.uniform1f(haloProgram.uniforms.uRadius, r);
    gl.uniform3f(haloProgram.uniforms.uLight, LIGHT[0], LIGHT[1], LIGHT[2]);
    gl.uniform3f(haloProgram.uniforms.uAccent, accent[0], accent[1], accent[2]);
    gl.uniform1f(haloProgram.uniforms.uLightTheme, lightTheme);
    gl.uniform1f(haloProgram.uniforms.uEntrance, entrance);
    gl.uniform1f(haloProgram.uniforms.uGain, 0.9);
    gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
    gl.enableVertexAttribArray(haloProgram.attributes.aQuad);
    gl.vertexAttribPointer(haloProgram.attributes.aQuad, 2, gl.FLOAT, false, 0, 0);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    gl.disableVertexAttribArray(haloProgram.attributes.aQuad);

    // Textured moon.
    gl.useProgram(moonProgram.program);
    gl.uniform2f(moonProgram.uniforms.uRes, canvas.width, canvas.height);
    gl.uniform2f(moonProgram.uniforms.uCenter, cx, cy);
    gl.uniform1f(moonProgram.uniforms.uRadius, r);
    gl.uniform1f(moonProgram.uniforms.uSpin, spin);
    gl.uniform2f(moonProgram.uniforms.uTexel, 1 / textureSize[0], 1 / textureSize[1]);
    gl.uniform3f(moonProgram.uniforms.uLight, LIGHT[0], LIGHT[1], LIGHT[2]);
    if (light) {
      gl.uniform3f(moonProgram.uniforms.uTint, 0.7, 0.68, 0.64);
      gl.uniform3f(moonProgram.uniforms.uAmbient, 0.2, 0.2, 0.19);
    } else {
      gl.uniform3f(moonProgram.uniforms.uTint, 0.34, 0.36, 0.41);
      gl.uniform3f(moonProgram.uniforms.uAmbient, 0, 0, 0);
    }
    gl.uniform1f(moonProgram.uniforms.uSun, 0.42);
    gl.uniform1f(moonProgram.uniforms.uBump, 6);
    gl.uniform1f(moonProgram.uniforms.uEntrance, entrance);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.uniform1i(moonProgram.uniforms.uMap, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.enableVertexAttribArray(moonProgram.attributes.aPos);
    gl.vertexAttribPointer(moonProgram.attributes.aPos, 3, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
    gl.enableVertexAttribArray(moonProgram.attributes.aUv);
    gl.vertexAttribPointer(moonProgram.attributes.aUv, 2, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.drawElements(gl.TRIANGLES, sphere.indices.length, gl.UNSIGNED_SHORT, 0);
    gl.disableVertexAttribArray(moonProgram.attributes.aPos);
    gl.disableVertexAttribArray(moonProgram.attributes.aUv);

    // Hairline accent rim, additive so it never paints over the page.
    gl.blendFunc(gl.ONE, gl.ONE);
    gl.useProgram(rimProgram.program);
    gl.uniform2f(rimProgram.uniforms.uRes, canvas.width, canvas.height);
    gl.uniform2f(rimProgram.uniforms.uCenter, cx, cy);
    gl.uniform1f(rimProgram.uniforms.uRadius, r);
    gl.uniform1f(rimProgram.uniforms.uSpin, spin);
    gl.uniform3f(rimProgram.uniforms.uAccent, accent[0], accent[1], accent[2]);
    gl.uniform3f(rimProgram.uniforms.uLight, LIGHT[0], LIGHT[1], LIGHT[2]);
    gl.uniform1f(rimProgram.uniforms.uGain, 1.1 * entrance);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.enableVertexAttribArray(rimProgram.attributes.aPos);
    gl.vertexAttribPointer(rimProgram.attributes.aPos, 3, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.drawElements(gl.TRIANGLES, sphere.indices.length, gl.UNSIGNED_SHORT, 0);
    gl.disableVertexAttribArray(rimProgram.attributes.aPos);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    // Dust lifting off the page-facing limb.
    if (!reducedMotion) {
      gl.useProgram(dustProgram.program);
      gl.uniform2f(dustProgram.uniforms.uRes, canvas.width, canvas.height);
      gl.uniform2f(dustProgram.uniforms.uCenter, cx, cy);
      gl.uniform1f(dustProgram.uniforms.uRadius, r);
      gl.uniform1f(dustProgram.uniforms.uTime, time);
      gl.uniform1f(dustProgram.uniforms.uDpr, dpr);
      gl.uniform1f(dustProgram.uniforms.uLightTheme, lightTheme);
      gl.uniform3f(dustProgram.uniforms.uAccent, accent[0], accent[1], accent[2]);
      gl.uniform1f(dustProgram.uniforms.uEntrance, entrance);
      gl.bindBuffer(gl.ARRAY_BUFFER, dustBuffer);
      gl.enableVertexAttribArray(dustProgram.attributes.aSeed);
      gl.vertexAttribPointer(dustProgram.attributes.aSeed, 1, gl.FLOAT, false, 0, 0);
      gl.drawArrays(gl.POINTS, 0, DUST_COUNT);
      gl.disableVertexAttribArray(dustProgram.attributes.aSeed);
    }
  };

  const loop = (now: number) => {
    frame = 0;
    if (disposed) return;
    draw(now);
    if (!reducedMotion && visible && !document.hidden) frame = requestAnimationFrame(loop);
  };
  const requestFrame = () => {
    if (disposed || frame) return;
    frame = requestAnimationFrame(loop);
  };

  const onVisibilityChange = () => { if (!document.hidden) requestFrame(); };
  const themeObserver = new MutationObserver(() => {
    light = document.documentElement.dataset.theme === 'light';
    accent = readAccent();
    requestFrame();
  });
  const resizeObserver = new ResizeObserver(resize);

  document.addEventListener('visibilitychange', onVisibilityChange);
  themeObserver.observe(document.documentElement, { attributeFilter: ['data-theme'], attributes: true });
  resizeObserver.observe(stage);
  resize();

  return {
    dispose() {
      disposed = true;
      if (frame) cancelAnimationFrame(frame);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      themeObserver.disconnect();
      resizeObserver.disconnect();
      image.onload = null;
      release();
    },
    setVisible(nextVisible: boolean) {
      visible = nextVisible;
      if (visible) {
        clock.last = 0;
        requestFrame();
      }
    },
  };
}
