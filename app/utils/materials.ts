import psychedelix from "./shader-materials/psychedelix";
import shaderArtIntro from './shader-materials/shader-art-intro';

const createMaterialByString: (t: string) => THREE.ShaderMaterial = (type: string) => {
    if (type === 'Psychedelix') return psychedelix;
    if (type === 'Shader art intro') return shaderArtIntro;
    return psychedelix;
}

export default createMaterialByString;
