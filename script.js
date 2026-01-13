const form = document.getElementById("form");
const inputDay = document.getElementById("input-day");
const inputMonth = document.getElementById("input-month");
const inputYear = document.getElementById("input-year");
const dayLabel = document.getElementById("day-label");
const monthLabel = document.getElementById("month-label");
const yearLabel = document.getElementById("year-label");
const dayError = document.getElementById("day-error");
const monthError = document.getElementById("month-error");
const yearError = document.getElementById("year-error");
const outputDay = document.getElementById("output-day");
const outputMonth = document.getElementById("output-month");
const outputYear = document.getElementById("output-year");
const submitBtn = document.getElementById("submit-btn");

function isENumber(str) {
    const regex = /\d+e\d+/i;
    return str.match(regex);
}

function validateForm() {
    let results = {
        "day": false,
        "month": false,
        "year": false,
    };

    let year, month, day;
    let currentDate = new Date();
    //validate year
    let yearStr = inputYear.value.trim();
    if (yearStr !== "") {
        //check if input has "e" special number
        if (isENumber(yearStr)) {
            addRemoveErrorClass(inputYear, true);
            addRemoveErrorClass(yearLabel, true, "label-error");
            setErrorMessage(yearError, "Must be a valid year");
        }
        else {
            year = Number(yearStr);
            if (year >= currentDate.getFullYear()) {
                addRemoveErrorClass(inputYear, true);
                addRemoveErrorClass(yearLabel, true, "label-error");
                setErrorMessage(yearError, "Must be in the past");
            }
            else {
                results["year"] = true;
                addRemoveErrorClass(inputYear, false);
                addRemoveErrorClass(yearLabel, false, "label-error");
                setErrorMessage(yearError, "");
            }
        }
    }
    else {
        addRemoveErrorClass(inputYear, true);
        addRemoveErrorClass(yearLabel, true, "label-error");
        setErrorMessage(yearError, "This field is requried");
    }

    //validate month
    let monthStr = inputMonth.value.trim();
    if (monthStr !== "") {
        //check if input has "e" special number
        if (isENumber(monthStr)) {
            addRemoveErrorClass(inputMonth, true);
            addRemoveErrorClass(monthLabel, true, "label-error");
            setErrorMessage(monthError, "Must be a valid month");
        }
        else {
            month = Number(monthStr);
            if (month >= 13 || month <= 0) {
                addRemoveErrorClass(inputMonth, true);
                addRemoveErrorClass(monthLabel, true, "label-error");
                setErrorMessage(monthError, "Must be a valid month");
            }
            else {
                results["month"] = true;
                addRemoveErrorClass(inputMonth, false);
                addRemoveErrorClass(monthLabel, false, "label-error");
                setErrorMessage(monthError, "");
            }
        }
    }
    else {
        addRemoveErrorClass(inputMonth, true);
        addRemoveErrorClass(monthLabel, true, "label-error");
        setErrorMessage(monthError, "This field is requried");
    }


    //validate day
    let dayStr = inputDay.value.trim();
    if (dayStr !== "") {
        //check if input has "e" special number or month/year is invalid 
        if (isENumber(dayStr)) {
            addRemoveErrorClass(inputDay, true);
            addRemoveErrorClass(dayLabel, true, "label-error");
            setErrorMessage(dayError, "Must be a valid day");
        }
        else if (!results["month"] || !results["year"]) {
            if (Number(dayStr) > 31) {
                addRemoveErrorClass(inputDay, true);
                addRemoveErrorClass(dayLabel, true, "label-error");
                setErrorMessage(dayError, "Must be a valid day");
            }
        }
        else {
            day = Number(dayStr);

            let dateObj = new Date(year, month - 1, day);
            if (isNaN(dateObj) || dateObj.getDate() != day || dateObj.getMonth() != month - 1 || dateObj.getFullYear() != year) {
                addRemoveErrorClass(inputDay, true);
                addRemoveErrorClass(dayLabel, true, "label-error");
                setErrorMessage(dayError, "Must be a valid day");
            }
            else {
                results["day"] = true;
                addRemoveErrorClass(inputDay, false);
                addRemoveErrorClass(dayLabel, false, "label-error");
                setErrorMessage(dayError, "");
            }
        }
    }
    else {
        addRemoveErrorClass(inputDay, true);
        addRemoveErrorClass(dayLabel, true, "label-error");
        setErrorMessage(dayError, "This field is requried");
    }

    return results["day"] && results["month"] && results["year"];
}

function addRemoveErrorClass(element, isError, className="error") {
    if (element.classList.contains(className))
        element.classList.remove(className);

    if (isError)
        element.classList.add(className);
}

function setErrorMessage(element, message) {
    if (message !== "") {
        element.textContent = message;
        element.style.display = "block";
    }
    else {
        element.textContent = "";
        element.style.display = "none";
    }
}

function resetInputStatus() {
    addRemoveErrorClass(inputDay, false);
    addRemoveErrorClass(dayLabel, false);
    setErrorMessage(dayError, "");

    addRemoveErrorClass(inputMonth, false);
    addRemoveErrorClass(monthLabel, false);
    setErrorMessage(monthError, "");

    addRemoveErrorClass(inputYear, false);
    addRemoveErrorClass(yearLabel, false);
    setErrorMessage(yearError, "");
}

form.addEventListener("submit", (event) => {
    resetInputStatus();
    event.preventDefault();
    validateForm();
});
