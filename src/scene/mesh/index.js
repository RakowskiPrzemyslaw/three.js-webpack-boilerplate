import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { getTestShader } from '../shaders'

// create mesh
const createGrid = () => {
    const geometry = new THREE.PlaneGeometry(10, 10, 10, 10);
    const material = new THREE.MeshLambertMaterial({
        color: 0xffffff,
        wireframe: true
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
            console.log(gltf.scene.children[2])
            gltf.scene.children[2].material = new THREE.MeshPhongMaterial({
                color: 0xffffff,
            })
            resolve(gltf.scene.children[2])
        }, undefined, (err) => {
            console.log(err)
            reject(err)
        })
    })
}

const createCube = () => {
    const geometry = new THREE.BoxBufferGeometry(100, 100, 100, 10, 10, 10);
    const { vertexShader, fragmentShader } = getTestShader()
    const material = new THREE.ShaderMaterial({
        uniforms: {
            u_time: { type: "f", value: 1.0 },
            u_resolution: { type: "v2", value: new THREE.Vector2() },
            u_mouse: { type: "v2", value: new THREE.Vector2() }
        },
        // vertexShader,
        fragmentShader,
    });
    const vertexDisplacement = new Float32Array(geometry.attributes.position.count);
    for (let i = 1; i < vertexDisplacement.length; i++) {
        vertexDisplacement[i] = Math.sin(i)
    }
    geometry.addAttribute('vertexDisplacement', new THREE.BufferAttribute(vertexDisplacement, 1))

    const cube = new THREE.Mesh(geometry, material);
    cube.material.side = THREE.DoubleSide
    cube.uniformsNeedUpdate = true


    return cube
}



// register mesh
export const getMesh = async () => {
    return {
        grid: createGrid(),
        // donut: await loadDonut()
        cube: createCube()
    }
}