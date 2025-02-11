"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
const logger_1 = require("@repo/logger");
const port = process.env.PORT || 3001;
const server = (0, server_1.createServer)();
server.listen(port, () => {
    (0, logger_1.log)(`api running on ${port}`);
});
