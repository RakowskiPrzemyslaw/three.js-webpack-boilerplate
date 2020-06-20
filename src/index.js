import { getCamera } from './camera'
import { getLights } from './scene/lights'
import { getMesh } from './scene/mesh'
import { getControls } from './controls'
import { getRenderer } from './renderer'
import { getScene } from './scene'
import { Animation } from './animations';
import { getComposer } from './postprocessing'

(async function(module) {

    module.asyncSetup = async () => {
        module.camera = getCamera()
        module.renderer = getRenderer();
        module.controls = getControls(module.camera, module.renderer)
        module.lights = getLights()
        module.mesh = await getMesh()
        module.scene = getScene(module.mesh, module.lights)
        module.animation = new Animation(module);
        module.composer = getComposer(module.renderer, module.scene, module.camera)

        module.loop();
        document.body.appendChild(module.renderer.domElement);
        window.addEventListener('resize', module.handleResize);
    }

    module.handleResize = () => {
        const { innerWidth, innerHeight } = window;
        module.renderer.setSize(innerWidth, innerHeight);
        module.camera.aspect = innerWidth / innerHeight;
        module.camera.updateProjectionMatrix();
    }

    module.loop = () => {
        if (module.animation.update) {
            module.animation.update();
        }
        module.renderer.render(module.scene, module.camera);
        requestAnimationFrame(module.loop);
    }
    console.log(module)
    await module.asyncSetup()
    console.log('loaded')
    return module
})({})