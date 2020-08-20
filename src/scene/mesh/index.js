import * as THREE from 'three';
import { getShader, getSphereShader } from '../shaders'

// create mesh
const createPlane = () => {
    const geometry = new THREE.PlaneGeometry(50, 50, 10, 10);
    const { fragmentShader, vertexShader } = getShader()

    

    // const uniforms = {
    //     u_time: {
    //         value: 0   
    //     },
    //     u_mouse: {
    //         value: {
    //             x: 0.0,
    //             y: 0.0
    //         }
    //     }, 
    //     u_resolution: {
    //         value: {
    //             x: 0.0,
    //             y: 0.0
    //         }
    //     },
    //     u_color: {
    //         value: new THREE.Color(0xFF0000)
    //     }
    // }

    const uniforms = {
        u_mouse: { value: {
                x: 0.0,
                y: 0.0
        }},
        u_time: { value: 0.0 },
        u_resolution: { value: new THREE.Vector2() },
        u_LightColor: { value: new THREE.Color(0x7B287D) },
        u_DarkColor: { value: new THREE.Color(0x000000) },
        u_Frequency: { value: 2.0 },
        u_NoiseScale: { value: 10.0 },
        u_RingScale: { value: 0.2 },
        u_Contrast: { value: 0.6 }
    };

    const material = new THREE.ShaderMaterial({
        uniforms,
        vertexShader,
        fragmentShader,
        side: THREE.DoubleSide
    });
    const plane = new THREE.Mesh(geometry, material)
    return plane
}

const createSphere = () => {
    const { vertexShader, fragmentShader } = getSphereShader()

    const geometry = new THREE.IcosahedronGeometry(20, 4);
    const uniforms = {
        u_time: { value: 0.0 },
        u_mouse: { value: { x: 0.0, y: 0.0 } },
        u_resolution: { value: { x: 0, y: 0 } },
        u_color: { value: new THREE.Color(0xb7ff00) },
        u_LightColor: { value: new THREE.Color(0x7B287D) },
        u_DarkColor: { value: new THREE.Color(0x000000) },
        u_Frequency: { value: 2.0 },
        u_NoiseScale: { value: 10.0 },
        u_RingScale: { value: 0.2 },
        u_Contrast: { value: 0.6 }
    }

    const material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader,
        fragmentShader,
        wireframe: false
    });

    const ball = new THREE.Mesh(geometry, material);
    return ball
}

// register mesh
export const getMesh = () => {
    return {
        plane: createPlane(),
        sphere: createSphere()
    }
}