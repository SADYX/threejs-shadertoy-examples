import * as THREE from 'three';

const createBox = () => {
    return new THREE.BoxGeometry(10, 10, 10);
};

const createSphere = () => {
    return new THREE.SphereGeometry(5);
};

const createPlane = () => {
    return new THREE.PlaneGeometry(10, 10);
}

const createGeometryByString: (t: string) => THREE.BufferGeometry = (type: string) => {
    if (type === 'Box') return createBox();
    if (type === 'Sphere') return createSphere();
    if (type === 'Plane') return createPlane();
    return createBox();
}

export default createGeometryByString;