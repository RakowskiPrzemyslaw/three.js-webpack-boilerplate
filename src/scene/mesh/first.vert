#pragma glslify: noise = require(glsl-noise/simplex/2d)

varying vec3 v_position;
varying float v_noise;

uniform float u_time;


void main() {	
  v_noise = noise(position.xy * sin(u_time / 5.0)) * 3.0;

  v_position = vec3(position.x, position.y, position.z + atan(u_time * v_noise));
  gl_Position = projectionMatrix * modelViewMatrix * vec4(v_position, 1.0 );
}