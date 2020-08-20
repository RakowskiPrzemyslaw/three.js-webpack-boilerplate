import { getNoise3D, getClassicNoise3D, getPerlinNoise, getTurbulence } from './noise' 


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
                float n = perlin(v_position.x * u_time * 10.0, v_position.y * u_time * 10.0) * sin(u_time/ 10.0) * 5.0; 
                float ring = u_Contrast - fract(u_NoiseScale * n);
                float lerp = pow(ring * u_time, u_RingScale) + n;
                vec3 color = mix(u_DarkColor, u_LightColor, lerp);

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


export const getSphereShader = () => {
    return {
        vertexShader: `
            ${getPerlinNoise()}
            ${getClassicNoise3D()}
            ${getTurbulence()}
            varying vec2 vUv;
            varying float v_noise;
            varying vec3 v_position;

            uniform float u_time;

            void main() {	
                v_position = position;
                v_noise = 10.0 * -0.1 * turbulence(0.5 * normal * sin(u_time / 7.0) * 7.0);
                float b = perlin(v_position.x, v_position.y) * sin(u_time);
                float displacement = b - 10.0 * v_noise;
                vec3 pos = v_position + normal * displacement;
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4( pos, 1.0 );
            }
        `,
        fragmentShader: `
            #define PI 3.141592653589
            #define PI2 6.28318530718

            uniform vec2 u_mouse;
            uniform vec2 u_resolution;
            uniform float u_time;
            uniform vec3 u_color;
            uniform vec3 u_LightColor;
            uniform vec3 u_DarkColor;
            uniform float u_Frequency;
            uniform float u_NoiseScale;
            uniform float u_RingScale;
            uniform float u_Contrast;

            varying vec2 vUv;
            varying float v_noise;

            //https://www.clicktorelease.com/blog/vertex-displacement-noise-3d-webgl-glsl-three-js/

            void main (void) {
                float ring = u_Contrast - fract(u_NoiseScale * v_noise);
                float lerp = pow(ring * u_time, u_RingScale) * v_noise;
                vec3 color = mix(u_DarkColor, u_LightColor, lerp);

                gl_FragColor = vec4(color, 1.0);
            }`
    }
}