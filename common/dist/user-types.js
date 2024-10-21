"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = __importDefault(require("zod"));
const signupInput = zod_1.default.object({
    username: zod_1.default.string(),
    password: zod_1.default.string(),
    email: zod_1.default.string().email({ message: 'Invalid email address' }),
    firstName: zod_1.default.string(),
    lastName: zod_1.default.string(),
});
const signinInput = zod_1.default.object({
    username: zod_1.default.string(),
    password: zod_1.default.string(),
});
const updateUserInput = zod_1.default.object({
    username: zod_1.default.string().nullable(),
    firstName: zod_1.default.string().nullable(),
    lastName: zod_1.default.string().nullable(),
});
