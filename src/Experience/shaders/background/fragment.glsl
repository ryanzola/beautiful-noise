// varying vec2 vUv;
varying vec3 vPosition;

uniform float uTime;

#pragma glslify: noise = require('../partials/genericNoise.glsl')
#pragma glslify: line = require('../partials/line.glsl')
#pragma glslify: rotate2d = require('../partials/rotate2d.glsl')

void main() {
  float n = noise(vPosition + uTime);

  vec3 baseFirst = vec3(0.5, 0.6, 0.4);
  vec3 accent = vec3(0.0);
  vec3 baseSecond = vec3(0.9, 0.6, 0.3);
  // vec3 baseThird = vec3(0.9, 0.8, 0.3);

  // vec3 color1 = vec3(1.0, 0.0, 0.0);
  // vec3 color2 = vec3(0.0, 1.0, 0.0);
  // vec3 color3 = vec3(0.0, 0.0, 1.0);

  vec2 baseUv = rotate2d(n) * vPosition.xy * 0.1;
  float basePattern = line(baseUv, 0.5);
  float secondPattern = line(baseUv, 0.1);

  vec3 baseColor = mix(baseSecond, baseFirst, basePattern);
  vec3 secondColor = mix(baseColor, accent, secondPattern);

  gl_FragColor = vec4(secondColor, 1.0);
}