/* Problem statement 
    As input we have the already booked meeting hours of two persons 
    p1Schedule = list of meeting hours already booked for person1 - Sorted
    p2Schedule = list of meeting hours already booked for person2 - Sorted
    duration = duration meeting in meeting
    As output we need to find all the available time slot ranges
*/

/* Input */
const p1Schedule = [['9:00', '10:30'], ['12:00', '13:00'], ['16:00', '18:00']];
const p2Schedule = [['10:00', '11:30'], ['12:30', '14:30'], ['14:30', '15:00'], ['16:00', '17:00']];
const duration = 30;
const p1ScheduleLimit = ['9:00', '20:00'];
const p2ScheduleLimit = ['10:00', '18:30'];


function getAvailTimeSlots(p1Schedule, p2Schedule, duration, p1ScheduleLimit, p2ScheduleLimit){
    let result = [];
    const p1AvailSchedule = getAvailTimeList(p1Schedule, p1ScheduleLimit);
    const p2AvailSchedule = getAvailTimeList(p2Schedule, p2ScheduleLimit);
    let p1 = 0;
    let p2 = 0;
    while(p1 < p1AvailSchedule.length && p2 < p2AvailSchedule.length) {
        const [s1, e1] = p1AvailSchedule[p1];
        const [s2, e2] = p2AvailSchedule[p2];
        if(compareTime(s1, s2) === -1) {
            if(compareTime(e1, s2) === 1) {
                if(compareTime(e1, e2) === -1) {
                    if(differenceInTime(s2, e1) >= duration){
                        result.push([s2, e1]);
                    }
                    p1++;
                }
                else {
                    if(differenceInTime(s2, e2) >= duration){
                        result.push([s2, e2]);
                    }
                    p2++;
                }
            }
            else{
                p1++;
            }
        }
        else if(compareTime(s1, s2) === 1) {
            if(compareTime(e2, s1) === 1) {
                if(compareTime(e2, e1) === -1) {
                    if(differenceInTime(s1, e2) >= duration){
                        result.push([s1, e2]);
                    }                    
                    p2++;
                }
                else {
                    if(differenceInTime(s1, e1) >= duration){
                        result.push([s1, e1]);
                    }
                    p1++;
                }
            }
            else{
                p2++;
            }
        }
        else {
            if(compareTime(e1, e2) === -1){
                if(differenceInTime(s1, e1) >= duration){
                    result.push([s1, e1]);
                }
                p1++;
            }
            else if(compareTime(e1, e2) === 1){
                if(differenceInTime(s2, e2) >= duration){
                    result.push([s2, e2]);
                }
                p2++;
            }
            else{
                if(differenceInTime(s2, e2) >= duration){
                    result.push([s2, e2]);
                }
                p1++;
                p2++;
            }
        }
    }
    return result;
}
function getAvailTimeList(pSchedule, pScheduleLimit){
    let result = [];
    let i = 0;
    if(compareTime(pScheduleLimit[0], pSchedule[0][0]) === -1) {
        result.push([pScheduleLimit[0], pSchedule[0][0]]);
    }
    while(i < pSchedule.length -1){
        if(compareTime(pSchedule[i+1][0], pSchedule[i][1]) === 1){
            result.push([pSchedule[i][1], pSchedule[i+1][0]])
        }
        i++;
    }
    if(compareTime(pScheduleLimit[1], pSchedule[pSchedule.length-1][1]) === 1) {
        result.push([pSchedule[pSchedule.length-1][1], pScheduleLimit[1]]);
    }
    return result;
}
function differenceInTime(t1, t2){
    return getMinutes(t2) - getMinutes(t1);
}
function compareTime(i1, i2) {
    const t1 = getMinutes(i1);
    const t2 = getMinutes(i2);
    return t1 > t2 ? 1: t1 < t2 ? -1: 0;
}
function getMinutes(t){
    const [h, m] = t.split(":");
    return (Number(h) * 60) + Number(m);
}
const result = getAvailTimeSlots(p1Schedule, p2Schedule, duration, p1ScheduleLimit, p2ScheduleLimit);