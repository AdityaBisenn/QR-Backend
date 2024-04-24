"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoDisconnet = exports.mongoConnect = exports.mongoCheckStudentStatus = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const studentSchema = new mongoose_1.default.Schema({
    EntryNo: String,
    hash: String,
    lastSlot: String,
    useHistory: [String],
    used: Boolean,
});
const Student = mongoose_1.default.model('ShivaStudentTesting', studentSchema);
async function findStudentWithHash(shaHash) {
    const student = await Student.findOne({ hash: shaHash });
    if (!student)
        return null;
    return student;
}
async function mongoCheckStudentStatus(shaHash) {
    const student = await findStudentWithHash(shaHash);
    if (student === null)
        return "Token not found in database";
    if (student.used === true)
        return "Token Has Already Been Used";
    student.used = true;
    await student.save();
    return student.EntryNo;
}
exports.mongoCheckStudentStatus = mongoCheckStudentStatus;
async function mongoConnect(mongoLink) {
    return mongoose_1.default.connect(mongoLink)
        .then(() => console.log("connected to DB"))
        .catch((err) => console.log(err));
}
exports.mongoConnect = mongoConnect;
async function mongoDisconnet() {
    return mongoose_1.default.connection.close();
}
exports.mongoDisconnet = mongoDisconnet;
//# sourceMappingURL=mongoFiles.js.map