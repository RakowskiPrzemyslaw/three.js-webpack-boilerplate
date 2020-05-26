import { getCamera } from './camera'
import { getLights } from './scene/lights'
import { getMesh } from './scene/mesh'
import { getControls } from './controls'
import { getRenderer } from './renderer'
import { getScene } from './scene'
import { Animation } from './animations';

class Loader {
    constructor() {
        this.camera = getCamera()
        this.renderer = getRenderer();
        this.controls = getControls(this.camera, this.renderer)
        this.lights = getLights()
        this.mesh = getMesh()
        this.scene = getScene(this.mesh, this.lights)
        this.animation = new Animation(this);

        this.loop();
        document.body.appendChild(this.renderer.domElement);
        window.addEventListener('resize', this.handleResize);
    }

    handleResize = () => {
        const { innerWidth, innerHeight } = window;
        this.renderer.setSize(innerWidth, innerHeight);
        this.camera.aspect = innerWidth / innerHeight;
        this.camera.updateProjectionMatrix();
    }

    loop = () => {
        if (this.animation.update) {
            this.animation.update();
        }
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.loop);
    }
}

new Loader();