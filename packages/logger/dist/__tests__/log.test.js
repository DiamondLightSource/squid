"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
jest.spyOn(global.console, "log");
describe("@repo/logger", () => {
    it("prints a message", () => {
        (0, __1.log)("hello");
        expect(console.log).toHaveBeenCalled();
    });
});
