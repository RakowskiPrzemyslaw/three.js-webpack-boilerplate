import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { loadFile } from 'src/lib'

const createGrid = async () => {
    const geometry = new THREE.PlaneGeometry(10, 10, 10, 10);

    const vertexShader = await loadFile({ path: 'assets/first.vert' })
    const fragmentShader = await loadFile({ path: 'assets/first.frag' })

    const material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader
    });

    const grid = new THREE.Mesh(geometry, material);
    grid.rotation.x = -20
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
export const getMesh = async () => {
    return {
        grid: await createGrid(),
        donut: await loadDonut()
    }
}