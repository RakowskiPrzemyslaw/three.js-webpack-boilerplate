import * as THREE from 'three';

export const getCamera = () => {
    const aspectRatio = window.innerWidth / window.innerHeight;
    const camera = new THREE.PerspectiveCamera(40, aspectRatio, 0.0001, 10000);

    camera.position.set(0, 0, 20);
    
    return camera
}