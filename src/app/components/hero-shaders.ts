const precision = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
precision highp sampler2D;
#else
precision mediump float;
precision mediump sampler2D;
#endif
`;

export const heroVertexShader = `
attribute vec2 position;
varying vec2 uv;
void main() {
  uv = position * .5 + .5;
  gl_Position = vec4(position, 0., 1.);
}
`;

export const heroFlowShader = `${precision}
varying vec2 uv;
uniform sampler2D previous;
uniform vec2 pointer;
uniform vec2 lastPointer;
uniform vec2 velocity;
uniform float aspect;
uniform float delta;
uniform float active;
uniform float neutral;

void main() {
  vec4 history = texture2D(previous, uv);
  float retention = pow(mix(.88, .925, active), delta * 30.);
  float strength = max(0., history.r * retention - delta * mix(.18, .09, active));
  vec2 direction = (history.gb - neutral) * 2. * retention;

  vec2 p = uv * vec2(aspect, 1.);
  vec2 a = lastPointer * vec2(aspect, 1.);
  vec2 b = pointer * vec2(aspect, 1.);
  vec2 segment = b - a;
  float along = clamp(dot(p - a, segment) / max(dot(segment, segment), .00001), 0., 1.);
  vec2 distanceToStroke = p - mix(a, b, along);
  float radius = .105;
  float brush = exp(-dot(distanceToStroke, distanceToStroke) / (radius * radius * .5)) * active;
  float speed = length(velocity);
  float ink = brush * (.22 + min(speed * 9., .78));
  strength = max(strength, ink);
  float blend = 1. - exp(-brush * delta * 24.);
  direction = mix(direction, clamp(velocity * 5., -.8, .8), blend);
  if (strength < .015) { strength = 0.; direction = vec2(0.); }
  gl_FragColor = vec4(strength, clamp(neutral + direction * .5, 0., 1.), 1.);
}
`;

export const heroAtmosphereShader = `${precision}
varying vec2 uv;
uniform vec2 resolution;
uniform sampler2D flowmap;
uniform float time;
uniform float entrance;
uniform float lightTheme;
uniform vec2 center;
uniform vec2 ringSize;
uniform vec2 readingPlane;
uniform float neutral;
uniform vec3 background;

float hash(vec2 p) {
  vec3 q = fract(vec3(p.xyx) * .1031);
  q += dot(q, q.yzx + 33.33);
  return fract((q.x + q.y) * q.z);
}
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3. - 2. * f);
  return mix(mix(hash(i), hash(i + vec2(1., 0.)), f.x),
    mix(hash(i + vec2(0., 1.)), hash(i + vec2(1., 1.)), f.x), f.y);
}
float fbm(vec2 p) {
  float value = 0., weight = .5;
  for (int i = 0; i < 3; i++) {
    value += weight * noise(p);
    p = mat2(1.6, 1.2, -1.2, 1.6) * p;
    weight *= .5;
  }
  return value;
}

vec3 cloudMaterial(vec2 point, vec2 direction, float influence, float time, float light) {
  vec2 q = point * 11. - direction * influence * 3.;
  vec2 fold = vec2(noise(q * .55 + vec2(time * .09, 0.)),
    noise(q * .55 + vec2(5.7, -time * .07)));
  q += (fold - .5) * 1.3;
  float body = noise(q + vec2(0., time * .06)) * .7
    + noise(q * 1.9 + vec2(3.1, -time * .04)) * .3;
  float density = clamp((body - .18) / .64, 0., 1.);

  vec3 shadow = mix(vec3(.018, .035, .070), vec3(.91, .93, .95), light);
  vec3 bodyColor = mix(vec3(.095, .245, .440), vec3(.42, .59, .73), light);
  vec3 crest = mix(vec3(.30, .49, .68), vec3(.13, .30, .49), light);
  vec3 material = mix(shadow, bodyColor, smoothstep(.14, .64, density));
  return mix(material, crest, smoothstep(.70, .94, density) * .35);
}

void main() {
  float aspect = resolution.x / resolution.y;
  vec2 screen = (uv - center) * vec2(aspect, 1.);
  vec4 wake = texture2D(flowmap, uv);
  float influence = wake.r;
  vec2 direction = (wake.gb - neutral) * 2.;
  float t = time * .12;

  vec2 warped = screen - direction * influence * 1.65;
  float turn = influence * .45;
  mat2 rotation = mat2(cos(turn), -sin(turn), sin(turn), cos(turn));
  warped += (rotation * screen - screen) * influence * .2;
  vec2 p = warped / ringSize;
  float radius = length(screen / ringSize);
  vec2 marbled = p;
  float swirl = .06 + influence * .14;
  for (int i = 1; i <= 5; i++) {
    float fi = float(i);
    marbled.x += swirl / fi * cos(t * 1.6 + fi * 1.5 * marbled.y);
    marbled.y += swirl / fi * cos(t * 1.3 + fi * 1. * marbled.x);
  }
  float phase = entrance * 18.;
  float energy = smoothstep(0., .10, entrance) * (1. - smoothstep(.35, 1., entrance));
  float angle = atan(screen.y, screen.x + .000001);
  float surfaceWave = .065 * sin(angle * 3. - phase)
    + .028 * sin(angle * 5. + phase * 1.3)
    + .012 * sin(angle * 8. - phase * 1.7);
  float recoil = .025 * sin(phase * 1.4);
  vec2 drift = vec2(fbm(marbled * 1.8 + vec2(t, -t * .6)), fbm(marbled * 1.8 + vec2(-t * .5, t) + 8.));
  float turbulence = fbm(marbled * 2.8 + drift * 2. - t * .6);
  float displacement = .035 * clamp(length(p) - radius, -1., 1.);
  float band = radius - 1. + displacement - energy * (surfaceWave + recoil);
  float filaments = fbm(vec2(band * 18. + turbulence * 3., marbled.x * 3. + marbled.y * 2. - t));
  float veil = exp(-abs(band) * 5.2);
  float silk = smoothstep(.30, .85, filaments) * veil * 1.25;
  float rim = exp(-abs(band) * (26. + energy * 6. * sin(angle * 4. + phase)));
  float capillary = pow(.5 + .5 * sin(band * 85. - phase * 2. + angle * 2.), 4.)
    * exp(-abs(band) * 18.) * energy;
  float reach = 1. - smoothstep(.40, 1., abs(band));
  float halo = exp(-abs(band) * 3.2) * .11 * reach;
  float bloom = exp(-abs(band) * 1.3) * .09 * reach;
  float side = .65 + .35 * smoothstep(-1., 1., marbled.x - marbled.y);
  float intensity = (silk * .62 + rim * .30 + capillary * .18) * side;
  vec3 blue = vec3(.15, .36, .80);
  vec3 silver = vec3(.64, .82, 1.);
  vec3 warm = vec3(1., .93, .78);
  vec3 tint = mix(blue, silver, smoothstep(.05, .48, intensity));
  tint = mix(tint, warm, smoothstep(.55, 1.1, intensity) * .3);
  vec3 color = (blue * (halo + bloom + veil * .07) + tint * intensity) * 1.12;

  color = pow(max(color, 0.), vec3(.88));

  vec2 textDistance = screen / readingPlane;
  float reading = 1. - exp(-dot(textDistance * textDistance, textDistance * textDistance));
  color *= mix(.16, 1., reading);
  color += silver * exp(-dot(screen, screen) / .00004) * (1. - entrance) * .6;
  float vignette = mix(.58, 1., 1. - smoothstep(.40, .92, length(uv - .5) * 1.25));
  color *= vignette;
  float edge = smoothstep(0., .10, uv.y) * (1. - smoothstep(.95, 1., uv.y));
  color *= edge;
  float peak = max(color.r, max(color.g, color.b));
  float shoulder = .55 + .30 * (1. - exp(-max(peak - .55, 0.) / .30));
  color *= min(1., shoulder / max(peak, .55));
  vec2 grainPixel = mod(gl_FragCoord.xy, 64.);
  float grain = hash(grainPixel) - hash(grainPixel + 19.19);
  color += grain * (2. / 255.) * smoothstep(0., .06, max(color.r, max(color.g, color.b)));
  float alpha = clamp(max(color.r, max(color.g, color.b)), 0., .9);
  vec3 darkRing = background + color * (1. - background);
  vec3 lightRing = background * mix(vec3(1.), vec3(.18, .34, .62), alpha * .55);
  vec3 composed = mix(darkRing, lightRing, lightTheme);
  float coverage = smoothstep(.015, .35, influence) * .34
    * mix(.16, 1., reading) * vignette * edge;
  if (coverage > 0.) {
    vec3 material = cloudMaterial(screen, direction, influence, t, lightTheme);
    material += grain / 255.;
    composed = mix(composed, material, coverage);
  }
  gl_FragColor = vec4(composed, 1.);
}
`;
