"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = require("../server");
describe("server", () => {
    it("status check returns 200", async () => {
        await (0, supertest_1.default)((0, server_1.createServer)())
            .get("/status")
            .expect(200)
            .then((res) => {
            expect(res.body.ok).toBe(true);
        });
    });
    it("message endpoint says hello", async () => {
        await (0, supertest_1.default)((0, server_1.createServer)())
            .get("/message/jared")
            .expect(200)
            .then((res) => {
            expect(res.body.message).toBe("hello jared");
        });
    });
});
