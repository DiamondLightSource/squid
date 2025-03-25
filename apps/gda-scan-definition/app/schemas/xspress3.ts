import {z} from 'zod';

export const Xspress3DetectorElementRegion = z.object({
    roiName: z.string(),
    roiStart: z.number(), 
    roiEnd: z.number(), 
});



export const Xspress3DetectorElement = z.object({
    name: z.string(),
    number:  z.number(), 
    windowStart:  z.number(), 
    windowEnd:  z.number(), 
    excluded: z.boolean(),
    Region: Xspress3DetectorElementRegion
});

export type Xspress3DetectorElement = z.infer<typeof Xspress3DetectorElement>;

export const Xspress3ConfigSchema = z.object({
    detectorName: z.string(), 
    resGrade: z.string(), 
    regionType: z.string(), 
    readoutMode: z.string(), 
    editIndividualElements: z.boolean(), 
    deadtimeCorrectionEnergy: z.number(), 

    onlyShowFF: z.boolean(), 
    showDTRawValues: z.boolean(), 
    saveRawSpectrum: z.boolean(), 
    selectedRegionNumber: z.number(), 
    DetectorElements: z.array(Xspress3DetectorElement)
});

export type Xspress3ConfigSchema = z.infer<typeof Xspress3ConfigSchema>;
