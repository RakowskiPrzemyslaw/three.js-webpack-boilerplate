import * as THREE from 'three';
import { getLights } from './lights'
import { getMesh } from './mesh'

export const loadScene = async (uniforms) => {
    const scene = new THREE.Scene()

    const mesh = await getMesh(uniforms)
    const lights = getLights()

    const meshArray = Object.values(mesh)
    const lightsArray = Object.values(lights)

    scene.add(...meshArray, ...lightsArray)
    
    return scene
}