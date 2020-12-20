import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import vertexShader from './first.vert'
import fragmentShader from './first.frag'

const createGrid = async (uniforms) => {
    const geometry = new THREE.PlaneGeometry(30, 30, 30, 30);

    const material = new THREE.MeshPhongMaterial({
        color: 0x111111
    });

    const grid = new THREE.Mesh(geometry, material);
    grid.rotation.x = Math.PI / 2;
    grid.material.side = THREE.DoubleSide
    return grid
}


// register mesh
export const getMesh = async (uniforms) => {
    return {
        grid: await createGrid(uniforms),
    }
}