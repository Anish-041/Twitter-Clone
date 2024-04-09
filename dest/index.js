"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("./routes/user"));
const tweet_1 = __importDefault(require("./routes/tweet"));
const login_1 = __importDefault(require("./routes/login"));
const like_1 = __importDefault(require("./routes/like"));
const retweet_1 = __importDefault(require("./routes/retweet"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const PORT = 9011;
const app = (0, express_1.default)();
const path = require("path");
app.set("view engine", "hbs");
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Routes
app.use((0, cors_1.default)());
app.use("/user", user_1.default);
app.use("/tweet", tweet_1.default);
app.use("/login", login_1.default);
app.use("/likes", like_1.default);
app.use("/retweet", retweet_1.default);
app.get("/", (req, res) => {
    res.render("home");
});
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
