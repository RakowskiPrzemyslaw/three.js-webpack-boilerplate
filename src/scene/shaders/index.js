

export const getColorShader = () => {

    return {
        vertexShader: `
            attribute float vertexDisplacement;
            uniform float delta;
            varying float vOpacity;
            varying vec3 vUv;

            void main() {
                vUv = position;
                vOpacity = vertexDisplacement;

                vec3 p = position;

                p.x += sin(vertexDisplacement) * 50.0;
                p.y += cos(vertexDisplacement) * 50.0;
                
                vec4 modelViewPosition = modelViewMatrix * vec4(p, 1.0);
                gl_Position = projectionMatrix * modelViewPosition;
            }
        `,
        fragmentShader: `
            uniform float delta;
            varying float vOpacity;
            varying vec3 vUv;

            void main() {

                float r = 1.0 + cos(vUv.x * delta);
                float g = 0.5 + sin(delta * 0.5);
                float b = 0.0;

                gl_FragColor = vec4(r, g, b, vOpacity);
            }
        `,
    }
}


export const getTestShader = () => {

    return {
        vertexShader: `
            void main() {
                
            }
        `,
        fragmentShader: `
            #ifdef GL_ES
                precision mediump float;
            #endif

            uniform float u_time;

            void main() {
                gl_FragColor = vec4(abs(sin(u_time)), 0.0, 0.0, 1.0);
            }
        `,
    }
}