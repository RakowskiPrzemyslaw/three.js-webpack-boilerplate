import * as THREE from 'three';
import { getShader } from '../shaders'

// create mesh
const createPlane = () => {
    const geometry = new THREE.PlaneGeometry(2, 2);
    const { vertexShader, fragmentShader } = getShader()

    const uniforms = {
        u_color: {
            value: new THREE.Color(0xFF0000)
        }
    }

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