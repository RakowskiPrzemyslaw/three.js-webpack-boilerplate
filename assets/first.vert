varying vec3 v_position;
varying float v_noise;

uniform float u_time;


void main() {	
  v_noise = cnoise(position + u_time / 2.0) * 2.0;

  v_position = vec3(position.x, position.y, position.z + v_noise);
  gl_PointSize = 2.0 + v_noise * 0.7;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(normalize(v_position), 1.0 );

  // gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.);
}