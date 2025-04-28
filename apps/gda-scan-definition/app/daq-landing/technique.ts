

export type VillageDefinition = {
    name: string,
    beamlines: string[],
    techniques: TechniqueDescription[]
}

export type TechniqueDescription = {
    name: string,
}

const s10y: VillageDefinition = {
    name: "spectroscopy",
    beamlines: ['i18', 'i20', 'b18', 'k14'],
    techniques: [{ name: 'xas' }, { name: 'qexafs' }]
};

const i5g: VillageDefinition = {
    name: "imaging",
    beamlines: ['i10', 'i14'],
    techniques: []
};

export const villages: VillageDefinition[] = [s10y, i5g];