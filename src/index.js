import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { loadScene } from 'src/scene'
import { draw } from 'src/sketch'
import { handleResize } from 'src/lib'

const getRenderer = () => {
    const renderer = new THREE.WebGLRenderer({ 
        antialias: true, 
        alpha: true, 
        // preserveDrawingBuffer: true, 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.autoClear = false
    return renderer
}

const getCamera = () => {
    const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.0001, 10000);
    camera.position.set(0, 0, 20);
    return camera
}

const getControls = (camera, renderer) => {
    return new OrbitControls(camera, renderer.domElement);
}

function loop({ scene, camera, renderer, controls, uniforms, updateUniforms }) {
    updateUniforms()
    draw({ scene, camera, renderer, controls, uniforms })
    renderer.render(scene, camera);
    requestAnimationFrame(() => loop({ scene, camera, renderer, controls, uniforms, updateUniforms }));
} 

async function main() {
    const renderer = getRenderer()
    const camera = getCamera()
    const controls = getControls(camera, renderer)
    const clock = new THREE.Clock()
    const uniforms = {
        u_time: {
            value: 0
        }
    }

    const updateUniforms = () => {
        uniforms.u_time.value = clock.getElapsedTime()
    }

    const scene = await loadScene(uniforms);

    loop({scene, camera, renderer, controls, uniforms, clock, updateUniforms})
    document.body.appendChild(renderer.domElement);
    window.addEventListener('resize', () => handleResize(camera, renderer));
}
main()