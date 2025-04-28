

export type VillageDefinition = {
    name: string,
    short: string,
    beamlines: string[],
    techniques: TechniqueDescription[]
}

export type TechniqueDescription = {
    name: string,
}

const s10y: VillageDefinition = {
    name: "spectroscopy",
    short: "s10y",
    beamlines: ['i18', 'i20', 'b18', 'k14'],
    techniques: [{ name: 'xas' }, { name: 'qexafs' }]
};

const i5g: VillageDefinition = {
    name: "imaging",
    short:"i5g",
    beamlines: ['i10', 'i14'],
    techniques: [{ name: "scattering" }, { name: "absorption" }]
};

export const villages: VillageDefinition[] = [s10y, i5g];