const form = document.getElementById("form");
const inputDay = document.getElementById("input-day");
const inputMonth = document.getElementById("input-month");
const inputYear = document.getElementById("input-year");
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
            setErrorClass(inputYear, true);
            setErrorMessage(yearError, "Must be a valid year");
        }
        else {
            year = Number(yearStr);
            if (year >= currentDate.getFullYear()) {
                setErrorClass(inputYear, true);
                setErrorMessage(yearError, "Must be in the past");
            }
            else {
                results["year"] = true;
                setErrorClass(inputYear, false);
                setErrorMessage(yearError, "");
            }
        }
    }
    else {
        setErrorClass(inputYear, true);
        setErrorMessage(yearError, "This field is requried");
    }

    //validate month
    let monthStr = inputMonth.value.trim();
    if (monthStr !== "") {
        //check if input has "e" special number
        if (isENumber(monthStr)) {
            setErrorClass(inputMonth, true);
            setErrorMessage(monthError, "Must be a valid month");
        }
        else {
            month = Number(monthStr);
            if (month >= 13 || month <= 0) {
                setErrorClass(inputMonth, true);
                setErrorMessage(monthError, "Must be a valid month");
            }
            else {
                results["month"] = true;
                setErrorClass(inputMonth, false);
                setErrorMessage(monthError, "");
            }
        }
    }
    else {
        setErrorClass(inputMonth, true);
        setErrorMessage(monthError, "This field is requried");
    }


    //validate day
    let dayStr = inputDay.value.trim();
    if (dayStr !== "") {
        //check if input has "e" special number or month/year is invalid 
        if (isENumber(dayStr) || !results["month"] || !results["year"]) {
            setErrorClass(inputDay, true);
            setErrorMessage(dayError, "Must be a valid day");
        }
        else {
            day = Number(dayStr);

            let dateObj = new Date(year, month - 1, day);
            if (isNaN(dateObj) || dateObj.getDate() != day || dateObj.getMonth() != month - 1 || dateObj.getFullYear() != year) {
                setErrorClass(inputDay, true);
                setErrorMessage(dayError, "Must be a valid day");
            }
            else {
                results["day"] = true;
                setErrorClass(inputDay, false);
                setErrorMessage(dayError, "");
            }
        }
    }
    else {
        setErrorClass(inputDay, true);
        setErrorMessage(dayError, "This field is requried");
    }

    return results["day"] && results["month"] && results["year"];
}

function setErrorClass(element, isError) {
    if (element.classList.contains("error"))
        element.classList.remove("error");

    if (isError)
        element.classList.add("error");
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

form.addEventListener("submit", (event) => {
    event.preventDefault();
    validateForm();
});
