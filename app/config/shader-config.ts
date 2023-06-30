import psychedelix from '@/app/utils/shader-materials/psychedelix';
import shaderArtIntro from '@/app/utils/shader-materials/shader-art-intro';
import baseWarpFBM from '@/app/utils/shader-materials/base-warp-FBM';
import tileableWaterCaustic from '@/app/utils/shader-materials/tileable-water-caustic';

const SHADER_CONFIG = [
    {
        label: 'Psychedelix',
        sourceCodeUrl: 'https://www.shadertoy.com/view/MdsXDM',
        fc: psychedelix,
    },
    {
        label: 'Shader art intro',
        sourceCodeUrl: 'https://www.shadertoy.com/view/mtyGWy',
        fc: shaderArtIntro,
    },
    {
        label: 'Base warp FBM',
        sourceCodeUrl: 'https://www.shadertoy.com/view/tdG3Rd',
        fc: baseWarpFBM,
    },
    {
        label: 'Tileable water caustic',
        sourceCodeUrl: 'https://www.shadertoy.com/view/MdlXz8',
        fc: tileableWaterCaustic,
    },
];

export { SHADER_CONFIG };