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
const auth_1 = require("../utils/auth");
const prisma = new client_1.PrismaClient();
const router = express_1.default.Router();
router.use(express_1.default.json());
router.post("/:tweetid", auth_1.verifyToken, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { tweetid } = req.params;
    const userId = req.user.id;
    let retweeted = yield prisma.retweet.findFirst({
        where: {
            tweetId: Number(tweetid),
            retweetby: userId,
        },
    });
    if (retweeted != null) {
        res.send({ alreadyRetweeted: true });
    }
    let result = yield prisma.retweet.create({
        data: {
            tweetId: Number(tweetid),
            retweetby: userId,
        },
    });
    yield prisma.tweet.update({
        where: {
            id: Number(tweetid),
        },
        data: {
            retweetCount: { increment: 1 }
        }
    });
    res.send({ result });
}));
router.delete("/:tweetid", auth_1.verifyToken, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { tweetid } = req.params;
    const userid = req.user.id;
    let rewtweet = yield prisma.retweet.findFirst({
        where: {
            tweetId: Number(tweetid),
            retweetby: userid,
        }
    });
    if (rewtweet != null) {
        let response = yield prisma.retweet.delete({
            where: {
                id: Number(tweetid),
                retweetby: userid
            }
        });
        yield prisma.tweet.update({
            where: {
                id: response.tweetId
            },
            data: {
                retweetCount: { decrement: 1 }
            }
        });
    }
    res.send("retweet does not exist");
}));
exports.default = router;
