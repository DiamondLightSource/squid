import { faker } from '@faker-js/faker';
import { ReadyRow } from '../utils/sampleHolderSize';
import { range } from './makeData';
import { allowedElements } from '../data/elements';

const newElement = (): ReadyRow => {
    const r: ReadyRow = {
        element: faker.helpers.shuffle(allowedElements)[0],
        edge: faker.helpers.shuffle<ReadyRow['edge']>(['K', 'L', 'M'])[0],
        detectionMode: faker.helpers.shuffle<ReadyRow['detectionMode']>(['T', 'F'])[0],
        sampleName: faker.person.firstName(),
        sampleComment: faker.word.adverb(),
        column_letter: faker.helpers.shuffle<ReadyRow['column_letter']>(['a', 'b', 'c'])[0],
        row: faker.number.int({ min: 1, max: 6 }),
        repetitions: faker.number.int({ min: 1, max: 5 })
    };
    return r
};


export function makeSampleData(...lens: number[]): ReadyRow[] {
    const makeDataLevel = (depth = 0): ReadyRow[] => {
        const len = lens[depth]!;
        return range(len).map((_) => {
            return {
                ...newElement(),
            };
        });
    };

    return makeDataLevel();
}
