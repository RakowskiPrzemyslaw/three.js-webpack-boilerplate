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
    grid.position.y = -10;
    grid.material.side = THREE.DoubleSide
    return grid
}

const createBox = () => {
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });

    const mesh = new THREE.Mesh(geometry, material);
    return mesh
}

// register mesh
export const getMesh = async (uniforms) => {
    return {
        grid: await createGrid(uniforms),
        box: await createBox()
    }
}