import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

type ThreeParams = {
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    orbitControl: OrbitControls;
}

const createCamera = (dom: HTMLDivElement) => {
    const camera = new THREE.PerspectiveCamera(
        75,
        dom.clientWidth / dom.clientHeight,
        0.1,
        100000,
    );
    return camera;
}

const createOrbitControls = (
    camera: THREE.Camera,
    renderer: THREE.Renderer,
) => {
    const orbitControl = new OrbitControls(camera, renderer.domElement);
    orbitControl.enableDamping = true;
    return orbitControl;
}

const addLight = (scene: THREE.Scene) => {
    const pointLight = new THREE.PointLight();
    pointLight.position.set(20, 20, 20);
    scene.add(pointLight);
}

const createScene = () => {
    return new THREE.Scene();
}

const createRenderer = (dom: HTMLDivElement) => {
    const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        logarithmicDepthBuffer: true,
    });
    renderer.setSize(dom.clientWidth, dom.clientHeight);
    dom.appendChild(renderer.domElement);
    return renderer;
}

const threeInit = (dom: HTMLDivElement) => {
    const camera = createCamera(dom);
    const renderer = createRenderer(dom);
    const orbitControl = createOrbitControls(camera, renderer);
    const scene = createScene();

    // add stuff
    addLight(scene);

    return {
        camera,
        renderer,
        scene,
        orbitControl,
    } as ThreeParams;
}

export type { ThreeParams };

export default threeInit;