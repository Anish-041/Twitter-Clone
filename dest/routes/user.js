"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const express = require("express");
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const router = express_1.default.Router();
router.use(express_1.default.json());
router.post("/add", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // add a check if a user is already registered!!
    const { firstName, LastName, email, password } = req.body;
    const user = yield prisma.user.create({
        data: {
            firstName,
            LastName,
            email,
            password,
        },
    });
    console.log(user);
    res.send("User Added Successfully");
}));
router.get("/all", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma.user.findMany();
    console.log(user);
    res.send(user);
}));
router.delete("/delete/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma.user.delete({
        where: { id: parseInt(req.params.id) },
    });
    console.log(user);
    res.send("User Deleted Successfully");
}));
router.put("/update/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, LastName, email, password } = req.body;
    const user = yield prisma.user.update({
        where: {
            id: parseInt(req.params.id)
        },
        data: {
            firstName,
            LastName,
            email,
            password,
        },
    });
    console.log(user);
    res.send("User Updated Successfully");
}));
exports.default = router;
