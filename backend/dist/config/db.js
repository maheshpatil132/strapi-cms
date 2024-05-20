"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prismaDB = new client_1.PrismaClient({
    log: ['query']
});
exports.default = prismaDB;
