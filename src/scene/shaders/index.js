export const getShader = () => {

    return {
        vertexShader: `
            void main() {
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position * 0.5, 1.0);
            }
        `,
        fragmentShader: `
            uniform vec3 u_color;
            
            void main() {
                gl_FragColor = vec4(u_color, 1.0).rgba;
            }
        `,
    }
}