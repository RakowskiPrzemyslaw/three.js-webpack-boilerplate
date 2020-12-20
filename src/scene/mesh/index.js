import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import vertexShader from './first.vert'
import fragmentShader from './first.frag'

const createGrid = async (uniforms) => {
    const geometry = new THREE.PlaneGeometry(30, 5, 550, 550);

    const material = new THREE.ShaderMaterial({
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        uniforms
    });

    const grid = new THREE.Mesh(geometry, material);
    // grid.rotation.x = -20
    grid.material.side = THREE.DoubleSide
    return grid
}

const loadDonut = () => {
    const loader = new GLTFLoader();
    return new Promise((resolve, reject) => {
    
        loader.load('assets/donut.glb', (gltf) => {
            // console.log(gltf.scene.children[2])
            gltf.scene.children[2].material = new THREE.MeshPhongMaterial({
                color: 0xffffff,
            })
            resolve(gltf.scene.children[2])
        }, undefined, (err) => {
            // console.log(err)
            reject(err)
        })
    })
}

// register mesh
export const getMesh = async (uniforms) => {
    return {
        grid: await createGrid(uniforms),
        donut: await loadDonut()
    }
}