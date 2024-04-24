import mongoose from "mongoose";
import { currentSlot as getCurrentSlot } from "./currentSlot";


const studentSchema = new mongoose.Schema({
    EntryNo : String,
    hash : String,
    lastSlot : String,
    useHistory : [String],
    used: Boolean,
});

const Student = mongoose.model('ShivaStudentTesting', studentSchema);


async function findStudentWithHash(shaHash : string){ // TODO Create retrys in case the mongo fails and also a 5__ error message in case the mongo fails to connect.
    const student = await Student.findOne({ hash: shaHash })
    if (!student) return null
    return student
}

export async function mongoCheckStudentStatus(shaHash : string, ) {
    // const currentSlot = getCurrentSlot();
    // if (currentSlot === "Not A Slot") return "Not A Slot"
    
    const student = await findStudentWithHash(shaHash);
    if (student === null) return "Token not found in database"

    if(student.used===true) return "Token Has Already Been Used"

    // if (student.lastSlot === currentSlot) return "Token Has Already Been Used"

    // student.lastSlot = currentSlot;
    // student.useHistory.push(currentSlot);
    student.used = true;
    await student.save()

    return student.EntryNo

}

export async function mongoConnect(mongoLink: string){
    return mongoose.connect(mongoLink)
        .then(() => console.log("connected to DB"))
        .catch( (err) => console.log(err))
}

export async function mongoDisconnet(){
    return mongoose.connection.close();
}