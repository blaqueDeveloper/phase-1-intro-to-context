// Your code here

function createEmployeeRecord(array){
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
   
}

function createEmployeeRecords(arrayOfArrays){
    return arrayOfArrays.map(createEmployeeRecord)
}

function createTimeInEvent(eventObject, date){
    eventObject.timeInEvents.push({
        type: "TimeIn",
        hour: Number(date.slice(-4)),
        date: date.slice(0, date.length - 5)
    })
    return eventObject
}

function createTimeOutEvent(eventObject, date){
    eventObject.timeOutEvents.push({
        type: "TimeOut",
        hour: Number(date.slice(-4)),
        date: date.slice(0, date.length - 5)
    })
    return eventObject
}

function hoursWorkedOnDate(object, date){
    let timeInEvent = object.timeInEvents.find(key => key.date === date)
    let timeOutEvent = object.timeOutEvents.find(key => key.date === date)
    return (timeOutEvent.hour - timeInEvent.hour)/100;
}

function wagesEarnedOnDate(object, date){
    return hoursWorkedOnDate(object, date) * object.payPerHour
}

function allWagesFor(object){ 
    let dates = [];
    let wages = [];

    function addDates(obj) {
      dates.push(obj.date)
    }

    function addWages(date) {
      wages.push(wagesEarnedOnDate(object, date))
    }

    object.timeInEvents.forEach(addDates)
    dates.forEach(addWages)

    return wages.reduce((accumulator, currentValue) => accumulator + currentValue)
}

function calculatePayroll(arrayOfRecords){
    let totalWages = []
    totalWages.push(arrayOfRecords.map(allWagesFor))
    return totalWages[0].reduce((accumulator, currentValue) => accumulator + currentValue)
}