"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.currentSlot = void 0;
const Slot1Start = '07:10:00';
const Slot1End = '09:35:00';
const Slot2Start = '11:55:00';
const Slot2End = '14:05:00';
const Slot3Start = '16:25:00';
const Slot3End = '17:35:00';
const Slot4Start = '18:00:00';
const Slot4End = '23:05:00';
const IndiaTimeZoneOffset = 5 * 60 + 30;
function parseTime(timeString) {
    const [hours, minutes, seconds] = timeString.split(':').map(Number);
    return { hours, minutes, seconds };
}
function isTimeInRange(startTime, endTime, currentTime) {
    const start = parseTime(startTime);
    const end = parseTime(endTime);
    const current = parseTime(currentTime);
    if (current.hours > start.hours && current.hours < end.hours)
        return true;
    if ((current.hours === start.hours) && (current.minutes >= start.minutes))
        return true;
    if ((current.hours === end.hours) && (current.minutes < end.minutes))
        return true;
    return false;
}
function currentSlot() {
    const date = new Date();
    const adjustedDate = new Date(date.getTime() + IndiaTimeZoneOffset * 60 * 1000);
    const [currentDate, currentTime] = adjustedDate.toISOString().slice(0, 19).split("T");
    if (isTimeInRange(Slot1Start, Slot1End, currentTime))
        return `${currentDate} Slot1`;
    if (isTimeInRange(Slot2Start, Slot2End, currentTime))
        return `${currentDate} Slot2`;
    if (isTimeInRange(Slot3Start, Slot3End, currentTime))
        return `${currentDate} Slot3`;
    if (isTimeInRange(Slot4Start, Slot4End, currentTime))
        return `${currentDate} Slot4`;
    return `Not A Slot`;
}
exports.currentSlot = currentSlot;
//# sourceMappingURL=currentSlot.js.map