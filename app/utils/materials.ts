import psychedelix from "./shader-materials/psychedelix";

const createMaterialByString: (t: string) => THREE.ShaderMaterial = (type: string) => {
    if (type === 'Psychedelix') return psychedelix;
    return psychedelix;
}

export default createMaterialByString;
