import * as THREE from 'three';

export const loadFile = ({ path }) => {
    return new Promise((resolve, reject) => {
        const loader = new THREE.FileLoader();
        loader.load(
            path,
            // onLoad callback
            resolve,
            // onProgress callback
            ({ loaded, total }) => {
                console.log(`${path}: ${(loaded / total * 100)}% loaded`);
            },
            // onError callback
            reject
        );
    })

}

export const handleResize = (camera, renderer) => {
    const { innerWidth, innerHeight } = window;
    renderer.setSize(innerWidth, innerHeight);
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
}