import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export const getControls = (camera, renderer) => {
    return  new OrbitControls(camera, renderer.domElement);
}