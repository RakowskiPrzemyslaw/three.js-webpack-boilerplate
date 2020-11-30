import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { PLYLoader } from 'three/examples/jsm/loaders/PLYLoader';
import { loadFile } from 'src/lib'
import { noise } from 'src/MyShaderChunk.js'

const createGrid = async (uniforms) => {
    const geometry = new THREE.PlaneGeometry(20, 20, 500, 500);


    const vertexShader = await loadFile({ path: 'assets/first.vert' })
    const fragmentShader = await loadFile({ path: 'assets/first.frag' })

    const material = new THREE.ShaderMaterial({
        vertexShader: `
            ${noise}
            ${vertexShader}
        `,
        fragmentShader: `
            ${noise}
            ${fragmentShader}
        `,
        uniforms
    });

    console.log(material)

    const grid = new THREE.Mesh(geometry, material);
    // grid.rotation.x = -20
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

const loadPlant = (uniforms) => {
    // instantiate a loader
    const loader = new PLYLoader();

    return new Promise((resolve, reject) => {
        loader.load('assets/mesh.ply', async (geometry) => {
            console.log(geometry)
            


            geometry.computeVertexNormals();
            const vertexShader = await loadFile({ path: 'assets/first.vert' })
            const fragmentShader = await loadFile({ path: 'assets/first.frag' })

            const material = new THREE.ShaderMaterial({
                vertexShader: `
            ${noise}
            ${vertexShader}
        `,
                fragmentShader: `
            ${noise}
            ${fragmentShader}
        `,
                uniforms
            });
            // const material = new THREE.PointsMaterial({ color: 0x888888, size: 0.01 });
            // material.blending = THREE.AdditiveBlending
            geometry.rotateZ(1.4)

            const mesh = new THREE.Points(geometry, material);
    
            resolve(mesh)
        })
       
    });

}

// register mesh
export const getMesh = async (uniforms) => {
    return {
        // grid: await createGrid(uniforms),
        // donut: await loadDonut(),
        plant: await loadPlant(uniforms)
    }
}