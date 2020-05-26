import * as THREE from 'three';


export const getScene = (mesh, lights) => {
    const scene = new THREE.Scene();
    const meshArray = Object.values(mesh)
    const lightsArray = Object.values(lights)

    scene.add(...meshArray, ...lightsArray)
    
    return scene
}