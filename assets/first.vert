varying vec3 v_position;
varying float v_noise;

uniform float u_time;


void main() {	
  v_noise = cnoise(position + u_time / 10.0) * 5.0;

  v_position = vec3(position.x + sin(u_time + v_noise), position.y + cos(u_time + v_noise), position.z + v_noise);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(v_position, 1.0 );
}