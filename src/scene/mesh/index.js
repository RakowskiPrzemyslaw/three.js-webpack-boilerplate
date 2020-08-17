import * as THREE from 'three';
import { getShader } from '../shaders'

// create mesh
const createPlane = () => {
    const geometry = new THREE.PlaneGeometry(2, 2);
    const { vertexShader, fragmentShader } = getShader()

    

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
        u_mouse: {
            value: {
                x: 0.0,
                y: 0.0
            }
        }
    };
    uniforms.u_time = { value: 0.0 };
    uniforms.u_resolution = { value: new THREE.Vector2() };
    uniforms.u_LightColor = { value: new THREE.Color(0x7B287D) };
    uniforms.u_DarkColor = { value: new THREE.Color(0x000000) };
    uniforms.u_Frequency = { value: 2.0 };
    uniforms.u_NoiseScale = { value: 10.0 };
    uniforms.u_RingScale = { value: 0.2 };
    uniforms.u_Contrast = { value: 0.6 };

    const material = new THREE.ShaderMaterial({
        uniforms,
        vertexShader,
        fragmentShader
    });
    const plane = new THREE.Mesh(geometry, material)
    return plane
}


// register mesh
export const getMesh = () => {
    return {
        plane: createPlane(),
    }
}