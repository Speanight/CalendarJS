// Return if a year is leap or not.
function isLeap(year) {
    return year%4==0 && (year%100!=0 && year%400 != 0);
}

// Returns if the month is 28, 29, 30 or 31 days.
function getNbDays(year, month) {
    let leap = isLeap(year);
    let long = [1, 3, 5, 7, 8, 10, 12];

    // Février est un cas appart...
    if (month == 2) {
        if (leap == true) {
            return 29;
        }
        return 28;
    }
    // Si le mois demandé est un "mois long", on return 31.
    if (long.includes(month)) {
        return 31;
    }
    // Sinon, on return 30.
    return 30;
}

// Returns which date the month starts by
function getDayInWeek(year, month, day) {
    var d = new Date(year, month-1, day); // d = 1st day of the month chosen.
    if (d.getDay() != 0) {
        return d.getDay(); // We return the day
    }
    // If d.getDay() = 0, it's Sunday, so we return 7. (just a personal choice)
    return 7;
}

// Return the name of the month thanks to its number
function nameMonth(month) {
    var months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
    return months[month-1]; // We substract 1 because "Janvier" is months[0].
}

// Returns the number of the month thanks to its name.
function numMonth(month) {
    var months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

    for (let i = 0; i < months.length; i++) {
        if (months[i] == month) {
            return i+1; // +1 because first element is 0 and we consider the 1st month as #1 (personal choice again).
        }
    }
}

// Build of the calendar. Good luck reading that.
function buildCalendar(element, year, month, wantedDay) {
    // Used for the first line, to show month + year
    let flex = document.createElement("div");
    flex.id = "flex";
    element.appendChild(flex);
    var date = document.createElement("p");
    let nameMo = nameMonth(month);

    // Creation of the left arrow.
    let leftA = document.createElement("p");
    leftA.innerHTML = "<";
    leftA.classList.add("lArrow");
    flex.appendChild(leftA);

    // Shows the month and year.
    date.id = "monthYear";
    date.innerHTML = (nameMo + " " + year);
    flex.appendChild(date);

    // Creation of the right arrow.
    let rightA = document.createElement("p");
    rightA.classList.add("rArrow");
    rightA.innerHTML = ">";
    flex.appendChild(rightA);


    // Used to show the second line, with the days (lun, mar, ...)
    let days = document.createElement("div");
    days.id = "flex";
    element.appendChild(days);
    // Pain.
    days.innerHTML = "<p>lun</p><p>mar</p><p>mer</p><p>jeu</p><p>ven</p><p>sam</p><p>dim</p>";
    

    // Used to write all the days one by one.
    let firstDay = getDayInWeek(year, month, 1);
    let countDays = 1;

    let limitDays = getNbDays(year, month);

    // Creation of the first line of the days.
    let week = document.createElement("div");
    week.id = "flex";
    element.appendChild(week);
    // Creation of empty spaces...
    for (let i = 0; i < firstDay-1; i++) {
        var emptyP = document.createElement("p");
        emptyP.classList.add("Edays");
        week.append(emptyP);
    }
    // Shows the 1st day depending of the month and all.
    var iDay = document.createElement("p");
    iDay.innerHTML = "1";
    if (wantedDay == countDays) {
        iDay.classList.add("chosenDay");
    }
    iDay.classList.add("days");
    countDays++;
    week.append(iDay);
    // Creates other empty spaces.
    for (let i = firstDay; i < 8; i++) {
        if (countDays <= limitDays) {
            if (wantedDay == countDays) {
                iDay.classList.add("chosenDay");
            }
            var iDay = document.createElement("p");
            iDay.innerHTML = countDays;
            iDay.classList.add("days");
            countDays++;
            week.append(iDay);
        }
    }

    // Repeats until we reach the max day of the month.
    while (countDays <= limitDays) {
        let week = document.createElement("div");
        week.id = "flex";
        element.appendChild(week);
        week.append(iDay);
        for (let i = 0; i < 7; i++) {
            if (countDays <= limitDays) {
                var iDay = document.createElement("p");
                iDay.innerHTML = countDays;
                iDay.classList.add("days");
                if (wantedDay == countDays) {
                    iDay.classList.add("chosenDay");
                }
                week.append(iDay);
            }
            else if (countDays > limitDays+1) {
                var emptyP = document.createElement("p");
                emptyP.classList.add("Edays");
                week.append(emptyP);
            }
            countDays++;
        }
    }

    // Adds the "reponsive" with the JS.
    hover();
}
  

// Used for the hovers and clicks functions.
function hover() {
    // We create a "table" of the days, and take the l and r arrows...
    var days = document.getElementsByClassName("days");
    let lA = document.getElementsByClassName("lArrow");
    let rA = document.getElementsByClassName("rArrow");

    // We convert the days "table" to a real table...
    days = Array.from(days);
    // ... So that we can add the arrows.
    days.push(...lA);
    days.push(...rA);
  
    for (var i = 0; i < days.length; i++) {
        // The backgorund color will change if the mouse is over one of the days.
        days[i].addEventListener("mouseover", function() {
            this.style.backgroundColor = "orange";
        });
  
        // When the mouse leaves the area, the background color goes back to default.
        days[i].addEventListener("mouseout", function() {
            this.style.backgroundColor = "";
        });

        // If it's a day and not an arrow...
        if (i < days.length-2) {
            // We add the function inputDate on click.
            days[i].addEventListener("click", inputDate);
        }
        else {
            // Else, we add the function changeMonth on click.
            days[i].addEventListener("click", changeMonth);
        }
    }
}

// Used to delete the calendar.
function deleteCalendar(calendar) {
    let child = calendar.children;
    let lim = calendar.children.length;
    for (let i = 0; i < lim; i++) {
        child[0].remove();
    }
}

// Used for the arrows, to change the month.
function changeMonth() {
    // We keep the month and year of the current date.
    let docMonth = document.getElementById("monthYear");
    let month = docMonth.innerHTML.split(" ", 1);
    let year = docMonth.innerHTML.split(" ", 2);
    year = year[1];
    month = month[0];
    let nMonth = numMonth(month);

    // We delete the calendar...
    var calendar = document.getElementById('grid');
    deleteCalendar(calendar);

    // If we clicked on the left arrow...
    if (this.classList[0] == "lArrow") {
        // If we're in January, we switch to December of the year before.
        if (nMonth == 1) {
            nMonth = 13;
            year -= 1;
        }
        buildCalendar(calendar, year, nMonth-1);
    }
    // If we clicked on the right arrow...
    else if (this.classList[0] == "rArrow") {
        // If we're in December, we switch to january of the next year.
        if (nMonth == 12) {
            nMonth = 0;
            year = +year+ +1;
        }
        buildCalendar(calendar, year, nMonth+1);
    }
}

function inputDate() {

    var input = document.getElementById("inDate");
    var monthYear = document.getElementById("monthYear").innerHTML;
    var month = monthYear.split(" ")[0];
    var year = monthYear.split(" ")[1];

    month = numMonth(month)-1;

    var date = new Date(year, month, this.innerHTML, 5);

    

    var formattedDate = date.toISOString().substring(0, 10);
    input.value = formattedDate;
}

// export {isLeap};