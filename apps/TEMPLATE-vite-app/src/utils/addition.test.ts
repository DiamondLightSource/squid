
import { expect, test} from "vitest";
import { addition } from "./addition";


test('should get 4 from 2+2', () => { 
    expect(addition(2,2)).toBe(4);
})