import { getCamera } from './camera'
import { getLights } from './scene/lights'
import { getMesh } from './scene/mesh'
import { getControls } from './controls'
import { getRenderer } from './renderer'
import { getScene } from './scene'
import { Animation } from './animations';
import { getComposer } from './postprocessing'

(function(module) {

    module.setup =  () => {
        module.camera = getCamera()
        module.renderer = getRenderer(); 
        module.mesh = getMesh()
        module.lights = getLights()
        module.scene = getScene(module.mesh, module.lights)
        module.loop();
        document.body.appendChild(module.renderer.domElement);
        console.log('eewe')
        window.addEventListener('resize', module.handleResize);
    }

    module.handleResize = () => {
        const { innerWidth, innerHeight } = window;
        module.renderer.setSize(innerWidth, innerHeight);
    }

    module.loop = () => {
        module.renderer.render(module.scene, module.camera);
        requestAnimationFrame(module.loop);
    }

    module.setup()
    return module
})({})