import { getNoise3D, getClassicNoise3D, getPerlinNoise } from './noise' 


export const getShader = () => {

    return {
        vertexShader: `
            varying vec3 v_position;

            void main() {
                v_position = position;
                gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );            
            }
        `,
        fragmentShader: ` 
            ${getPerlinNoise()}

            uniform vec3 u_LightColor;
            uniform vec3 u_DarkColor;
            uniform float u_Frequency;
            uniform float u_NoiseScale;
            uniform float u_RingScale;
            uniform float u_Contrast;
            uniform float u_time;
            uniform vec2 u_mouse;
            
            varying vec3 v_position;

            void main(){
                float n = perlin(v_position.x * u_time * 20.0, v_position.y * u_time * 20.0) - u_mouse.y; 
                float ring = u_Contrast - fract(u_NoiseScale * n / 10.0);
                float lerp = pow(ring, u_RingScale) + n;
                vec3 color = mix(u_DarkColor, u_LightColor + u_mouse.x, lerp);

                gl_FragColor = vec4(color, 1.0);
            }

            
        `,
    }
}

const first = `
void main(){
    float n = snoise(v_position - sin(u_time / 5.0)); 
    float ring = u_Contrast - fract(u_NoiseScale * n);
    float lerp = pow(ring, u_RingScale * u_time) + n + sin(u_time);
    vec3 color = mix(u_DarkColor, u_LightColor, lerp);

    gl_FragColor = vec4(color, 1.0);
}`