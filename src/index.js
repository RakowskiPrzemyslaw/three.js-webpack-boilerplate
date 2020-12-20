import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { loadScene } from 'src/scene'
import { draw } from 'src/sketch'
import { handleResize } from 'src/lib'
import * as CANNON from 'cannon'

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
    camera.position.set(0, 40, 40);
    return camera
}

const getControls = (camera, renderer) => {
    return new OrbitControls(camera, renderer.domElement);
}


const initCannon = () => {
 
    const world = new CANNON.World();
    world.gravity.set(0, 0, 0);
    world.broadphase = new CANNON.NaiveBroadphase();
    world.solver.iterations = 10;

    const shape = new CANNON.Box(new CANNON.Vec3(1, 1, 1));
    const mass = 1;
    const body = new CANNON.Body({
        mass: 1
    });
    body.addShape(shape);
    body.angularVelocity.set(0, 100, 100);
    body.angularDamping = 0.5;
    world.addBody(body);

    return {
        world, 
        body
    }
}


function loop({ scene, camera, renderer, controls, uniforms, updateUniforms, updatePhysics }) {
    updateUniforms()
    updatePhysics(scene)
    draw({ scene, camera, renderer, controls, uniforms })
    renderer.render(scene, camera);
    requestAnimationFrame(() => loop({ scene, camera, renderer, controls, uniforms, updateUniforms, updatePhysics }));
} 

async function main() {
    const timeStep = 1 / 60;
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
    const { world, body } = initCannon()




    const updatePhysics = (scene) => {
        const mesh = scene.children[1]

        // Step the physics world
        world.step(timeStep);

        // Copy coordinates from Cannon.js to Three.js
        mesh.position.copy(body.position);
        mesh.quaternion.copy(body.quaternion);

    }


    
    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper)

    loop({scene, camera, renderer, controls, uniforms, clock, updateUniforms, updatePhysics})
    document.body.appendChild(renderer.domElement);
    window.addEventListener('resize', () => handleResize(camera, renderer));
}
main()