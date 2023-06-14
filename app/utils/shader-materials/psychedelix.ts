// https://www.shadertoy.com/view/MdsXDM

import * as THREE from 'three';

const vertexShader = `
    varying vec2 vUv;

    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }
`;

const fragmentShader = `
    varying vec2 vUv;
    uniform vec3 iResolution;
    uniform float iTime;

    void mainImage( out vec4 fragColor, in vec2 fragCoord )
    {
        vec2 uv = fragCoord.xy / iResolution.xy;
        vec2 pos = (uv.xy-0.5);
        vec2 cir = ((pos.xy*pos.xy+sin(uv.x*18.0+iTime)/25.0*sin(uv.y*7.0+iTime*1.5)/1.0)+uv.x*sin(iTime)/16.0+uv.y*sin(iTime*1.2)/16.0);
        float circles = (sqrt(abs(cir.x+cir.y*0.5)*25.0)*5.0);
        fragColor = vec4(sin(circles*1.25+2.0),abs(sin(circles*1.0-1.0)-sin(circles)),abs(sin(circles)*1.0),1.0);
    }

    void main(){
        mainImage(gl_FragColor, vUv * iResolution.xy);
    }
`;

const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
        iTime: { value: 1 },
        iResolution: { value: new THREE.Vector3(0, 0, 0) },
    },
    side: THREE.DoubleSide,
});

export default material;
