import * as THREE from 'three';

// create lights
const createPointLight = () => {
    const light = new THREE.PointLight()

    light.position.set(10, 0, 20)

    return light
}

const createHemisphereLight = () => {
    return new THREE.HemisphereLight(0xff0000, 0x0000ff, .7);
}

// register lights 
export const getLights = () => {
    return {
        pointLight1: createPointLight(),
        hemi: createHemisphereLight()
    }
}