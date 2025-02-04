"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vitest_1 = require("vitest");
var addition_1 = require("./addition");
(0, vitest_1.test)('should get 4 from 2+2', function () {
    (0, vitest_1.expect)((0, addition_1.addition)(2, 2)).toBe(4);
});
