import * as THREE from 'three';

export const getRenderer = () => {
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    
    return renderer
}