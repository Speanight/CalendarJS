// import * as fc from "./datepickerFunctions.js"


function testIsLeap() {
    console.log(isLeap(2016));  // => true
    console.log(isLeap(2022));  // => false
    console.log(isLeap(2100));  // => false
}

function testGetNbDays() {
    console.log( getNbDays(2022, 1) );    // => 31
    console.log( getNbDays(2022, 2) );    // => 28
    console.log( getNbDays(2022, 3) );    // => 31
    console.log( getNbDays(2022, 4) );    // => 30

    // années bissextiles
    console.log( getNbDays(2016, 2) );    // => 29
    console.log( getNbDays(2020, 2) );    // => 29
}

function testGetDayInWeek() {
    // facilement vérifiable !
    console.log(getDayInWeek(2022, 4, 25));   // => 1 (lundi)
    // quelques événements historiques
    console.log(getDayInWeek(1989, 11, 9));   // => 4 (jeudi)
    console.log(getDayInWeek(1969, 7, 20));   // => 7 (dimanche)
    console.log(getDayInWeek(1945, 5, 8));    // => 2 (mardi)
}

// export {isLeap};