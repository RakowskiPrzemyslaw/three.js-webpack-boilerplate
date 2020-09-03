varying vec3 v_position;
varying float v_noise;

uniform float u_time;

void main (void) {
  vec3 color;
  vec3 color2 = vec3(floor(v_noise * 2.0) / 15.0);
  if (mod(v_position.z, 0.001) == 0.0) {
    color = vec3(0.0);
  } else {
    color = vec3(mod(v_position.z, 0.5));
  }
  

  gl_FragColor = vec4(color, 1.0);
}