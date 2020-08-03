import * as THREE from 'three';

export const getCamera = () => {
    const aspectRatio = window.innerWidth / window.innerHeight;
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);

    camera.position.set(0, 0, 1);
    
    return camera
}