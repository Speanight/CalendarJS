// import * as tests from "./datepickerTests.js";
// import * as fc from "./datepickerFunctions.js"

function main() {
    testIsLeap();
    console.log("");
    testGetNbDays();
    console.log("");
    testGetDayInWeek();
    var calendar = document.getElementById('grid');
    buildCalendar(calendar, 2022, 4, 5);
    // hover();
}

main();