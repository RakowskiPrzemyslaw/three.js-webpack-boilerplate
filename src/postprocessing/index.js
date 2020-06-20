import * as THREE from 'three';

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';

import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass.js';
import { AfterimagePass } from 'three/examples/jsm/postprocessing/AfterimagePass.js';



export const getComposer = (renderer, scene, camera) => {
    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    const glitchPass = new GlitchPass(100);
    glitchPass.goWild = false
    composer.addPass(glitchPass);
    console.log(glitchPass)

    const afterimagePass = new AfterimagePass();
    composer.addPass(afterimagePass);

    return composer
}