"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const env_1 = require("./env");
const mongoFiles_1 = require("./mongoFiles");
const cors_1 = __importDefault(require("cors"));
const sha256_1 = require("./sha256");
const port = process.env.PORT || 3000;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
(0, mongoFiles_1.mongoConnect)(env_1.mongoLink);
app.post('/checkHash', async (req, res) => {
    const shaHash = (0, sha256_1.sha256)(req.body.hashVal);
    const dbResult = await (0, mongoFiles_1.mongoCheckStudentStatus)(shaHash);
    console.log(shaHash);
    try {
        if (dbResult === "Not A Slot")
            res.status(401).json({ error: "Not a slot" });
        else if (dbResult === "Token not found in database")
            res.status(401).json({ error: "Token not found in database" });
        else if (dbResult === "Token Has Already Been Used")
            res.status(401).json({ error: "Token Has Already Been Used" });
        else
            res.status(200).json({ EntryNo: dbResult });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed To Connect To Database" });
    }
});
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map