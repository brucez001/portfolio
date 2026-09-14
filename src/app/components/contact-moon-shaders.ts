const rotate = `
uniform float uTilt;
uniform float uRoll;
vec3 rotateMoon(vec3 p, float spin) {
  float c = cos(spin), s = sin(spin);
  p = vec3(p.x * c + p.z * s, p.y, -p.x * s + p.z * c);
  float cz = cos(uRoll), sz = sin(uRoll);
  p = vec3(p.x * cz - p.y * sz, p.x * sz + p.y * cz, p.z);
  float cx = cos(uTilt), sx = sin(uTilt);
  return vec3(p.x, p.y * cx - p.z * sx, p.y * sx + p.z * cx);
}
vec4 projectMoon(vec3 p, vec2 res, vec2 center, float radius) {
  vec2 screen = center + vec2(p.x, -p.y) * radius;
  vec2 clip = screen / res * 2.0 - 1.0;
  return vec4(clip.x, -clip.y, -p.z * 0.5, 1.0);
}
`;

export const moonVertexShader = `
precision highp float;
attribute vec3 aPos;
attribute vec2 aUv;
uniform vec2 uRes;
uniform vec2 uCenter;
uniform float uRadius;
uniform float uSpin;
uniform float uTangentSign;
varying vec3 vN;
varying vec3 vT;
varying vec3 vB;
varying vec2 vUv;
${rotate}
void main() {
  vec3 tangent = normalize(vec3(-aPos.z, 0.0, aPos.x) + vec3(0.0, 0.0, 0.0001));
  vec3 p = rotateMoon(aPos, uSpin);
  vN = p;
  vT = rotateMoon(tangent, uSpin) * uTangentSign;
  vB = cross(vN, vT) * uTangentSign;
  vUv = aUv;
  gl_Position = projectMoon(p, uRes, uCenter, uRadius);
}
`;

export const moonFragmentShader = `
precision highp float;
uniform sampler2D uMap;
uniform vec2 uTexel;
uniform vec3 uLight;
uniform vec3 uTint;
uniform vec3 uAmbient;
uniform float uSun;
uniform float uBump;
uniform float uEntrance;
uniform float uSaturation;
uniform float uEarth;
varying vec3 vN;
varying vec3 vT;
varying vec3 vB;
varying vec2 vUv;
float height(vec2 uv) {
  vec3 c = texture2D(uMap, uv).rgb;
  return dot(c, vec3(0.2126, 0.7152, 0.0722));
}
vec3 aces(vec3 x) {
  return clamp((x * (2.51 * x + 0.03)) / (x * (2.43 * x + 0.59) + 0.14), 0.0, 1.0);
}
void main() {
  if (vN.z < 0.0) discard;
  vec3 surface = texture2D(uMap, vUv).rgb;
  vec3 albedo = pow(surface, vec3(2.2));
  float lum = dot(albedo, vec3(0.2126, 0.7152, 0.0722));
  albedo = mix(vec3(lum), albedo, uSaturation);
  float h0 = height(vUv);
  float hu = height(vUv + vec2(uTexel.x, 0.0));
  float hv = height(vUv + vec2(0.0, uTexel.y));
  vec3 n = normalize(normalize(vN) - (hu - h0) * uBump * normalize(vT) - (hv - h0) * uBump * normalize(vB));
  float lam = dot(n, uLight);
  vec3 col;
  if (uEarth > 0.5) {
    // Daylight: soft terminator, deep oceans, thin blue airlight and a glint on the water.
    float diffuse = max(lam, 0.0) * 0.8 + smoothstep(-0.12, 0.2, lam) * 0.2;
    float ocean = smoothstep(0.015, 0.12, surface.b - max(surface.r, surface.g));
    col = mix(albedo, vec3(0.045, 0.13, 0.24), ocean * 0.6) * uTint * (diffuse * uSun + uAmbient);
    float fres = pow(1.0 - clamp(dot(normalize(vN), vec3(0.0, 0.0, 1.0)), 0.0, 1.0), 3.0);
    col += vec3(0.006, 0.018, 0.035) * (0.4 + fres * 2.6) * mix(0.3, 1.0, diffuse);
    vec3 halfLight = normalize(uLight + vec3(0.0, 0.0, 1.0));
    float spec = pow(max(dot(n, halfLight), 0.0), 90.0);
    col += vec3(0.65, 0.82, 1.0) * spec * ocean * diffuse * 0.18;
    col /= 1.0 + max(max(col.r, col.g), col.b) * 0.18;
  } else {
    col = albedo * uTint * (max(lam, 0.0) * uSun + uAmbient);
  }
  col = pow(aces(col), vec3(1.0 / 2.2));
  gl_FragColor = vec4(col * uEntrance, uEntrance);
}
`;

export const rimVertexShader = `
precision highp float;
attribute vec3 aPos;
uniform vec2 uRes;
uniform vec2 uCenter;
uniform float uRadius;
uniform float uSpin;
varying vec3 vN;
${rotate}
void main() {
  vec3 p = rotateMoon(aPos, uSpin);
  vN = p;
  gl_Position = projectMoon(p, uRes, uCenter, uRadius * 1.004);
}
`;

export const rimFragmentShader = `
precision highp float;
uniform vec3 uAccent;
uniform vec3 uLight;
uniform float uGain;
varying vec3 vN;
void main() {
  if (vN.z < 0.0) discard;
  vec3 n = normalize(vN);
  float fres = pow(1.0 - clamp(n.z, 0.0, 1.0), 16.0);
  float facing = pow(max(dot(n.xy / max(length(n.xy), 0.001), normalize(uLight.xy)), 0.0), 2.0);
  vec3 glow = mix(uAccent, vec3(1.0), 0.35) * fres * facing * 0.9 * uGain;
  gl_FragColor = vec4(glow, max(glow.r, max(glow.g, glow.b)));
}
`;

export const quadVertexShader = `
attribute vec2 aQuad;
void main() {
  gl_Position = vec4(aQuad, 0.0, 1.0);
}
`;

export const haloFragmentShader = `
precision highp float;
uniform vec2 uRes;
uniform vec2 uCenter;
uniform float uRadius;
uniform vec3 uLight;
uniform vec3 uAccent;
uniform float uEarth;
uniform float uEntrance;
uniform float uGain;
void main() {
  vec2 c = vec2(uCenter.x, uRes.y - uCenter.y);
  vec2 rel = gl_FragCoord.xy - c;
  float d = length(rel) - uRadius;
  vec2 dir = rel / max(length(rel), 1.0);
  float facing = pow(max(dot(dir, normalize(uLight.xy)), 0.0), 1.8);
  float outer = exp(-max(d, 0.0) / (uRadius * 0.09)) * facing;
  float rimGlow = exp(-max(d, 0.0) / (uRadius * 0.008)) * facing;
  float outside = smoothstep(-uRadius * 0.004, uRadius * 0.004, d);
  vec3 col = mix(uAccent, vec3(0.86, 0.9, 0.98), 0.4);
  float a = (outer * 0.14 + rimGlow * 0.6) * outside * uEntrance * uGain;
  if (uEarth > 0.5) { col = uAccent; a *= 0.3; }
  a = clamp(a, 0.0, 0.85);
  gl_FragColor = vec4(col * a, a);
}
`;

export const dustVertexShader = `
precision highp float;
attribute float aSeed;
uniform vec2 uRes;
uniform vec2 uCenter;
uniform float uRadius;
uniform float uTime;
uniform float uDpr;
uniform vec3 uAccent;
uniform float uEntrance;
varying vec4 vColor;
float hash(float n) { return fract(sin(n * 127.1) * 43758.5453); }
void main() {
  float s = aSeed;
  vec3 col = hash(s + 6.0) > 0.8 ? uAccent : vec3(0.88, 0.9, 0.96);
  float life = 6.0 + hash(s) * 7.0;
  float t = fract(uTime / life + hash(s + 1.0));
  float ang = mix(1.5, 3.2, hash(s + 2.0));
  vec2 n = vec2(cos(ang), -sin(ang));
  float lit = max(dot(vec2(cos(ang), sin(ang)), vec2(-0.76, 0.65)), 0.0);
  vec2 start = uCenter + n * uRadius * (0.985 + 0.03 * hash(s + 3.0));
  float reach = (0.08 + 0.6 * pow(hash(s + 4.0), 1.7)) * uRadius;
  float e = 1.0 - pow(1.0 - t, 2.4);
  vec2 pos = start + n * reach * e;
  pos.y -= t * t * 0.18 * uRadius;
  pos.x += sin(uTime * 0.6 + s * 12.0) * 0.02 * uRadius * t;
  float a = sin(3.14159 * t);
  float alpha = a * a * (0.6 + 0.4 * hash(s + 5.0)) * (0.3 + 0.7 * lit) * uEntrance;
  vec2 clip = pos / uRes * 2.0 - 1.0;
  gl_Position = vec4(clip.x, -clip.y, 0.0, 1.0);
  gl_PointSize = (2.2 + 3.2 * hash(s + 7.0) * (1.0 - t)) * uDpr;
  vColor = vec4(col, alpha);
}
`;

export const dustFragmentShader = `
precision mediump float;
varying vec4 vColor;
void main() {
  vec2 d = gl_PointCoord - 0.5;
  float r = dot(d, d);
  if (r > 0.25 || vColor.a <= 0.001) discard;
  float alpha = vColor.a * smoothstep(0.25, 0.08, r);
  gl_FragColor = vec4(vColor.rgb * alpha, alpha);
}
`;
