"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = __importDefault(require("zod"));
const createBlogInputs = zod_1.default.object({
    title: zod_1.default.string(),
    content: zod_1.default.string(),
    published: zod_1.default.boolean(),
});
const updateBlogInputs = zod_1.default.object({
    title: zod_1.default.string().nullable(),
    content: zod_1.default.string().nullable(),
    published: zod_1.default.boolean().nullable(),
});
