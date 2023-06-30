import psychedelix from "./shader-materials/psychedelix";
import shaderArtIntro from './shader-materials/shader-art-intro';
import baseWarpFBM from './shader-materials/base-warp-FBM';
import tileableWaterCaustic from './shader-materials/tileable-water-caustic';

const createMaterialByString: (t: string) => THREE.ShaderMaterial = (type: string) => {
    if (type === 'Psychedelix') return psychedelix;
    if (type === 'Shader art intro') return shaderArtIntro;
    if (type === 'Base warp FBM') return baseWarpFBM;
    if (type === 'Tileable water caustic') return tileableWaterCaustic;
    return psychedelix;
}

export default createMaterialByString;
