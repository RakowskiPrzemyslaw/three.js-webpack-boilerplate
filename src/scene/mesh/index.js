import * as THREE from 'three';

// create mesh
const createGrid = () => {
    const geometry = new THREE.PlaneGeometry(10, 10, 10, 10);
    const material = new THREE.MeshLambertMaterial({
        color: 0xffffff,
    });

    const grid = new THREE.Mesh(geometry, material);
    grid.rotation.x = -20
    grid.material.side = THREE.DoubleSide
    return grid
}


// register mesh
export const getMesh = () => {
    return {
        grid: createGrid()
    }
}