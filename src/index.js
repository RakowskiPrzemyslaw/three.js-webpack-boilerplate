import { getCamera } from './camera'
import { getLights } from './scene/lights'
import { getMesh } from './scene/mesh'
import { getControls } from './controls'
import { getRenderer } from './renderer'
import { getScene } from './scene'
import { Animation } from './animations';
import { getComposer } from './postprocessing'
import { getAnalyser, analyseAudio } from './audio'
import * as THREE from 'three';

(function(module) {

    module.setup =  () => {
        module.camera = getCamera()
        module.audio = getAnalyser(module.camera)
        module.renderer = getRenderer(); 
        module.controls = getControls(module.camera, module.renderer)
        module.mesh = getMesh()
        module.lights = getLights()
        module.scene = getScene(module.mesh, module.lights)
        module.clock = new THREE.Clock();
        module.loop();
        document.body.appendChild(module.renderer.domElement);
        window.addEventListener('resize', module.handleResize);
        window.addEventListener('mousemove', module.handleMouseMove);

    }

    module.handleMouseMove = (e) => {
        // module.mesh.plane.material.uniforms.u_mouse.value.x = e.pageX / window.innerWidth;
        // module.mesh.plane.material.uniforms.u_mouse.value.y = e.pageY / window.innerHeight;
    }

    module.handleResize = () => {
        const { innerWidth, innerHeight } = window;
        module.renderer.setSize(innerWidth, innerHeight);
        const { freq } = analyseAudio(module.audio)
        console.log(freq)
        console.log(module.audio)
    }

    module.loop = () => {
        module.renderer.render(module.scene, module.camera);
        const delta = module.clock.getDelta();
        // module.mesh.plane.material.uniforms.u_time.value += delta;
        module.mesh.sphere.material.uniforms.u_time.value += delta;
        const { freq } = analyseAudio(module.audio)
        module.mesh.sphere.material.uniforms.u_audio_freq.value = freq / 2;
        requestAnimationFrame(module.loop);
    }

    module.setup()
    return module
})({})