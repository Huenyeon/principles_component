"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var dotenv_1 = __importDefault(require("dotenv"));
var getRoutes_1 = __importDefault(require("./routes/getRoutes"));
var postRoutes_1 = __importDefault(require("./routes/postRoutes"));
var putRoutes_1 = __importDefault(require("./routes/putRoutes"));
dotenv_1.default.config();
var app = (0, express_1.default)();
var PORT = process.env.PORT || 5000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/", function (req, res) {
    res.send("Server is running!");
});
app.use("/api/post", postRoutes_1.default);
app.use("/api/get", getRoutes_1.default);
app.use("/api/put", putRoutes_1.default);
app.listen(PORT, function () {
    console.log("\uD83D\uDE80 Server is running on port ".concat(PORT));
});
