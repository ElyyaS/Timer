// Menu ******************************************************************************************************

const menu = document.querySelector("div.menu");

const timerPage = document.querySelector("div.timer");
const stopWatchPage = document.querySelector("div.stopWatch");
const ageCalculationPage = document.querySelector("div.ageCalculation");

const timerBtn = document.querySelector("a.timer");
const stopWatchBtn = document.querySelector("a.stopWatch");
const ageCalculationBtn = document.querySelector("a.ageCalculation");

const menuIcon = document.querySelector("a.menuIcon");

// ***********************************************************************************************************

timerBtn.addEventListener("click", showTimer);
stopWatchBtn.addEventListener("click", showStopWatch);
ageCalculationBtn.addEventListener("click", showAgeCalculation);

menuIcon.addEventListener("click", openCloseMenu);

// ***********************************************************************************************************

function showTimer() {

    openCloseMenu();
    
    timerBtn.classList.add("active");
    stopWatchBtn.classList.remove("active");
    ageCalculationBtn.classList.remove("active");

    timerPage.classList.remove("hidden");
    stopWatchPage.classList.add("hidden");
    ageCalculationPage.classList.add("hidden");

    resetStopWatch();
    backCalculatioAge();
}

function showStopWatch() {

    openCloseMenu();

    timerBtn.classList.remove("active");
    stopWatchBtn.classList.add("active");
    ageCalculationBtn.classList.remove("active");

    timerPage.classList.add("hidden");
    stopWatchPage.classList.remove("hidden");
    ageCalculationPage.classList.add("hidden");

    resetTimer();
    backCalculatioAge();
}

function showAgeCalculation() {

    openCloseMenu();

    timerBtn.classList.remove("active");
    stopWatchBtn.classList.remove("active");
    ageCalculationBtn.classList.add("active");

    timerPage.classList.add("hidden");
    stopWatchPage.classList.add("hidden");
    ageCalculationPage.classList.remove("hidden");

    resetTimer();
    resetStopWatch();
}

function openCloseMenu() {
    menu.classList.toggle("openMenu");
    timerBtn.classList.toggle("openMenu");
    getTimePage.classList.toggle("openMenu");
    stopWatchBtn.classList.toggle("openMenu");
    ageCalculationBtn.classList.toggle("openMenu");
}

// timer ****************************************************************************************************

const timerDisplay = document.querySelector("div.timerDisplay");
const editTimerDiv = document.querySelector("div.editTimerDiv")
const timerButtons = document.querySelector("div.timerButtons");
const getTimePage = document.querySelector("div.getTimePage");
const showFinishMessage =  document.querySelector("div.showFinishMessage");

const editTimerBtn = document.getElementById("editTimerBtn");
const startTimerBtn = document.getElementById("startTimerBtn");
const pauseTimerBtn = document.getElementById("pauseTimerBtn");
const resetTimerBtn = document.getElementById("resetTimerBtn");
const getTimeBtn = document.getElementById("getTimeBtn");

const timerHourDisplay = document.getElementById("timerHour");
const timerMinuteDisplay = document.getElementById("timerMinute");
const timerSecondDisplay = document.getElementById("timerSecond");

const hourInputGetTime = document.getElementById("hourInputGetTime");
const minuteInputGetTime = document.getElementById("minuteInputGetTime");
const secondInputGetTime = document.getElementById("secondInputGetTime");

const hourInputGetTimeError = document.getElementById("hourInputGetTimeError");
const minuteInputGetTimeError = document.getElementById("minuteInputGetTimeError");
const secondInputGetTimeError = document.getElementById("secondInputGetTimeError");

let timerHour = 0, timerMinute = 2, timerSecond = 0;
let backUpTimerHour = 0, backUpTimerMinute = 2, backUpTimerSecond = 0;
let timer;

// ***********************************************************************************************************

editTimerBtn.addEventListener("click", editTimer);
startTimerBtn.addEventListener("click", startTimer);
pauseTimerBtn.addEventListener("click", pauseTimer);
resetTimerBtn.addEventListener("click", resetTimer);
getTimeBtn.addEventListener("click", getTime);

hourInputGetTime.addEventListener("change", validationGetTimeForm);
minuteInputGetTime.addEventListener("change", validationGetTimeForm);
secondInputGetTime.addEventListener("change", validationGetTimeForm);

// ***********************************************************************************************************

function startTimer() {
    startTimerBtn.classList.add("hidden");
    pauseTimerBtn.classList.remove("hidden");
    resetTimerBtn.classList.add("hidden");
    
    timer = setInterval(mainTimer, 1000);
}

function mainTimer() {
    if (timerSecond == 0) {

        if (timerMinute != 0) {
            timerSecond = 60;
            timerMinute -= 1;
        }

        else {
    
            if (timerHour != 0) {
                timerSecond = 60;
                timerMinute = 59;
                timerHour -= 1;
            }

            else {
                clearInterval(timer);
                setTimer();
                showFinishMessage.classList.add("finish");
                setTimeout(hideFinishMessage, 3000);
                pauseTimer();
                startTimerBtn.classList.add("hidden");
                return 0;
            }
        }
    }
    
    timerSecond -= 1;
    
    setTimer();
}

function pauseTimer() {
    startTimerBtn.classList.remove("hidden");
    pauseTimerBtn.classList.add("hidden");
    resetTimerBtn.classList.remove("hidden");
    
    clearInterval(timer);
}

function resetTimer() {
    startTimerBtn.classList.remove("hidden");
    
    clearInterval(timer);
    
    timerHour = backUpTimerHour;
    timerMinute = backUpTimerMinute;
    timerSecond = backUpTimerSecond;
    
    setTimer();
}

function setTimer() {
    timerHourDisplay.innerHTML = (timerHour < 10) ? "0" + timerHour : timerHour;
    timerMinuteDisplay.innerHTML = (timerMinute < 10) ? "0" + timerMinute : timerMinute;
    timerSecondDisplay.innerHTML = (timerSecond < 10) ? "0" + timerSecond : timerSecond;
}

function editTimer() {
    timerDisplay.classList.add("hidden");
    editTimerDiv.classList.add("hidden");
    timerButtons.classList.add("hidden");
    getTimePage.classList.remove("hidden");
}

function getInputValue() {
    timerHour = (hourInputGetTime.value === "") ? 0 : parseInt(hourInputGetTime.value);
    timerMinute = (minuteInputGetTime.value === "") ? 0 : parseInt(minuteInputGetTime.value);
    timerSecond = (secondInputGetTime.value === "") ? 0 : parseInt(secondInputGetTime.value); 
}

function getTime() {

    if (validationGetTimeForm()) {

        timerDisplay.classList.remove("hidden");
        editTimerDiv.classList.remove("hidden");
        timerButtons.classList.remove("hidden");
        getTimePage.classList.add("hidden");

        getInputValue();

        backUpTimerHour = timerHour;
        backUpTimerMinute = timerMinute;
        backUpTimerSecond = timerSecond;
        
        pauseTimer();
        setTimer(); 

    }
}

function validationGetTimeForm() {
    let errosCount = 0;

    getInputValue();

    if (isNaN(timerHour) || timerHour < 0) {
        errosCount += 1;
        hourInputGetTime.classList.add("error");
    } else {
        hourInputGetTime.classList.remove("error");
    }

    if (isNaN(timerMinute) ||  timerMinute < 0 || 60 <= timerMinute) {
        errosCount += 1;
        minuteInputGetTime.classList.add("error");
    } else {
        minuteInputGetTime.classList.remove("error");
    }

    if (isNaN(timerSecond) || timerSecond < 0 || 60 <= timerSecond) {
        errosCount += 1;
        secondInputGetTime.classList.add("error");
    } else {
        secondInputGetTime.classList.remove("error");
    }

    if (errosCount == 0) {
        return true;
    } else {
        return false;
    }
}

function hideFinishMessage() {
    showFinishMessage.classList.remove("finish");
}

// stopWatch ************************************************************************************************

const stopWatchDisplay = document.querySelector(".stopWatchDisplay");
const stopWatchButtons = document.querySelector(".stopWatchButtons");

const startStopWatchBtn = document.getElementById("startStopWatchBtn");
const pauseStopWatchBtn = document.getElementById("pauseStopWatchBtn");
const resetStopWatchBtn = document.getElementById("resetStopWatchBtn");
const splitStopWatchBtn = document.getElementById("splitStopWatchBtn");

const stopWatchHourDisplay = document.getElementById("stopWatchHour");
const stopWatchMinuteDisplay = document.getElementById("stopWatchMinute");
const stopWatchSecondDisplay = document.getElementById("stopWatchSecond");

const stopWatchRecords = document.querySelector('.stopWatchRecords');
const TableRecords = document.querySelector('.tableRecords');
const tableScroll = document.querySelector('#table-scroll');

let stopWatchHour = 0, stopWatchMinute = 0, stopWatchSecond = 0;
let timerStopWatch;
let splitCountStopWatch = 0;

// ***********************************************************************************************************

startStopWatchBtn.addEventListener("click", startStopWatch);
pauseStopWatchBtn.addEventListener("click", pauseStopWatch);
resetStopWatchBtn.addEventListener("click", resetStopWatch);
splitStopWatchBtn.addEventListener("click", splitStopWatch);

// ***********************************************************************************************************

function startStopWatch() {
    startStopWatchBtn.classList.add("hidden");
    pauseStopWatchBtn.classList.remove("hidden");
    resetStopWatchBtn.classList.add("hidden");
    splitStopWatchBtn.classList.remove("hidden");

    timerStopWatch = setInterval(mainStopWatch, 1000);
}

function pauseStopWatch() {
    startStopWatchBtn.classList.remove("hidden");
    pauseStopWatchBtn.classList.add("hidden");
    resetStopWatchBtn.classList.remove("hidden");
    splitStopWatchBtn.classList.add("hidden");

    clearInterval(timerStopWatch);
}

function resetStopWatch() {
    stopWatchHour = 0;
    stopWatchMinute = 0;
    stopWatchSecond = 0;
    
    stopWatchDisplay.classList.remove("registerRecord");
    stopWatchButtons.classList.remove("registerRecord");
    tableScroll.classList.remove("registerRecord");

    splitCountStopWatch = 0;

    Array.prototype.slice.call(document.getElementsByTagName('tr')).forEach(
        function(item) {
            item.remove();
        }
    );

    pauseStopWatch();
    setStopWatch();
}

function splitStopWatch() {

    stopWatchDisplay.classList.add("registerRecord");
    stopWatchButtons.classList.add("registerRecord");
    tableScroll.classList.add("registerRecord");

    if (splitCountStopWatch == 0) {
        let tr = document.createElement("tr");
        let rankTd = document.createElement("td");
        let timeTd = document.createElement("td");

        tr.classList.add("theadTableRecord")
        rankTd.classList.add("stopWatchTdRecord");
        timeTd.classList.add("stopWatchTdRecord");
        rankTd.classList.add("rankTd");
        timeTd.classList.add("timeTd");
        
        let rankTdText = document.createTextNode("lap");

        let timeTdText = document.createTextNode("time");

        rankTd.appendChild(rankTdText);
        timeTd.appendChild(timeTdText);
        tr.appendChild(rankTd);
        tr.appendChild(timeTd);
        TableRecords.appendChild(tr);
    }

    let tr = document.createElement("tr");
    let rankTd = document.createElement("td");
    let timeTd = document.createElement("td");

    rankTd.classList.add("stopWatchTdRecord");
    timeTd.classList.add("stopWatchTdRecord");
    rankTd.classList.add("rankTd");
    timeTd.classList.add("timeTd");
    
    splitCountStopWatch += 1;

    let rankTdText = document.createTextNode(`#${splitCountStopWatch}`);

    let timeTdText = document.createTextNode(`

        ${stopWatchHour < 10 ? '0' + stopWatchHour : stopWatchHour} 
        :
        ${stopWatchMinute < 10 ? '0' + stopWatchMinute: stopWatchMinute} 
        :
        ${stopWatchSecond < 10 ? '0' + stopWatchSecond : stopWatchSecond}

    `);

    rankTd.appendChild(rankTdText);
    timeTd.appendChild(timeTdText);
    tr.appendChild(rankTd);
    tr.appendChild(timeTd);
    TableRecords.appendChild(tr);

    tableScroll.scrollTop = tableScroll.scrollHeight;
}

function mainStopWatch() {

    stopWatchSecond += 1;

    if (stopWatchSecond == 60) {
        stopWatchSecond = 0;
        stopWatchMinute += 1;
    }

    if (stopWatchMinute == 60) {
        stopWatchMinute = 0;
        stopWatchHour += 1;
    }

    setStopWatch();
}

function setStopWatch() {
    stopWatchHourDisplay.innerHTML = (stopWatchHour < 10) ? "0" + stopWatchHour : stopWatchHour;
    stopWatchMinuteDisplay.innerHTML = (stopWatchMinute < 10) ? "0" + stopWatchMinute : stopWatchMinute;
    stopWatchSecondDisplay.innerHTML = (stopWatchSecond < 10) ? "0" + stopWatchSecond : stopWatchSecond;
}

// age calculation ********************************************************************************************

const AgeCalculationMain = document.querySelector("div.AgeCalculation");
const getDateBirthDayMain = document.querySelector("div.getDateBirthDayMain");
const showAgeDiv = document.querySelector("div.showAge");

const radioButtons = document.querySelectorAll("input.getDateBirthRadio");
const adRadio = document.getElementById("adRadio");
const shRadio = document.getElementById("shRadio");

const getTimeAgeCalculationYearInput = document.getElementById("getTimeAgeCalculationYearInput");
const selectMonthAgeCalculationAd = document.getElementById("selectMonthAgeCalculationAd");
const selectMonthAgeCalculationSh = document.getElementById("selectMonthAgeCalculationSh");
const getTimeAgeCalculationDayInput = document.getElementById("getTimeAgeCalculationDayInput");
const getDateBirthDayRegisterBtn = document.getElementById("getDateBirthDayRegisterBtn");

const showYearAge = document.getElementById("showYearAge");
const showMonthAge = document.getElementById("showMonthAge");
const showDayAge = document.getElementById("showDayAge");
const backCalculatioAgeBtn = document.getElementById("backCalculatioAgeBtn");

let dateTypeState = "ad";

let date = new Date();
let currentYearAd = date.getFullYear();
let currentMonthAd = date.getMonth() + 1;
let currentDayAd = date.getDate();
let birthYearAd, birthMonthAd, birthDayAd;
let resultYearAd, resultMonthAd, resultDayAd;

const perisanDate =  new Intl.NumberFormat("fa").format(123456)
const persianTime =  new Intl.DateTimeFormat(["pt-BR", "pt-PT"], options);
var options = {
    year: 'numeric' | '2-digit',
    month: 'numeric' | '2-digit' | 'narrow' | 'short' | 'long',
    day: 'numeric' | '2-digit'
};
let dateFormat = new Intl.DateTimeFormat("fa");
let dateOfToday = dateFormat.format(Date.now());

String.prototype.toEnglishDigit = function() {
    let perDigit = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    let replace = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    let replaceString = this;
    let regex;

    for (let i = 0; i < perDigit.length; i++) {
        regex = new RegExp(perDigit[i], "g");
        replaceString = replaceString.replace(regex, replace[i]);
    }

    return replaceString;
};

dateOfToday = dateOfToday.toEnglishDigit();
dateOfToday = dateOfToday.split("/");

let currentYearSh = parseInt(dateOfToday[0]);
let currentMonthSh = parseInt(dateOfToday[1]);
let currentDaySh = parseInt(dateOfToday[2]);
let birthYearSh, birthMonthSh, birthDaySh;
let resultYearSh, resultMonthSh, resultDaySh;

// ***********************************************************************************************************

adRadio.addEventListener("click", radioChange);
shRadio.addEventListener("click", radioChange);

getTimeAgeCalculationYearInput.addEventListener("change", validationGetBirthDateFormBlur);
selectMonthAgeCalculationAd.addEventListener("blur", validationGetBirthDateFormBlur);
selectMonthAgeCalculationSh.addEventListener("blur", validationGetBirthDateFormBlur);
getTimeAgeCalculationDayInput.addEventListener("change", validationGetBirthDateFormBlur);
getDateBirthDayRegisterBtn.addEventListener("click", calculateAge);

backCalculatioAgeBtn.addEventListener("click", backCalculatioAge)

// ***********************************************************************************************************

function radioChange() {
    if (dateTypeState == "ad") {
        dateTypeState = "sh"
    } else {
        dateTypeState = "ad"
    }

    for(const radioButton of radioButtons){
        radioButton.addEventListener('change', changeGetDateBirthSelect);
    }        
}

function changeGetDateBirthSelect() {
    if (this.checked) {
        if (this.value == "ad") {
            selectMonthAgeCalculationAd.classList.remove("hidden");
            selectMonthAgeCalculationSh.classList.add("hidden");
            dateState = "ad";
        } else {
            selectMonthAgeCalculationAd.classList.add("hidden");
            selectMonthAgeCalculationSh.classList.remove("hidden");
            dateState = "sh";
        }

        validationGetBirthDateForm("changeDateState");
    }
}

function calculateAge(){

    if (validationGetBirthDateForm("calculateAge")) {
        
        if (dateTypeState == "ad") {

            birthYearAd = parseInt(getTimeAgeCalculationYearInput.value);
            birthDayAd = parseInt(getTimeAgeCalculationDayInput.value);
            birthMonthAd = parseInt(selectMonthAgeCalculationAd.value);

            if (currentYearAd == birthYearAd && currentMonthAd < birthMonthAd) {

                selectMonthAgeCalculationAd.classList.add("error");
                calculateAge();

            } else if (
                currentYearAd == birthYearAd
                &&
                birthMonthAd == currentMonthAd
                &&
                currentDayAd < birthDayAd
            ) {

                getTimeAgeCalculationDayInput.classList.add("error");
                calculateAge();

            } else {
                getTimeAgeCalculationYearInput.classList.remove("error");
                selectMonthAgeCalculationAd.classList.remove("error");
                getTimeAgeCalculationDayInput.classList.remove("error");
            }

            resultYearAd = currentYearAd - birthYearAd;

            if (currentMonthAd >= birthMonthAd) {
                resultMonthAd = currentMonthAd - birthMonthAd;
            } else {
                resultMonthAd =  12 - (birthMonthAd - currentMonthAd);
                resultYearAd -= 1;
            }

            if (currentDayAd >= birthDayAd) {
                resultDayAd = currentDayAd - birthDayAd;
            } else {
                resultDayAd =  30 - (birthDayAd - currentDayAd);

                if (resultMonthAd == 0) {
                    resultMonthAd = 11;
                    resultYearAd -= 1;
                } else {
                    resultMonthAd -= 1;
                }
            }

            showYearAge.innerHTML = resultYearAd;
            showMonthAge.innerHTML = resultMonthAd;
            showDayAge.innerHTML = resultDayAd;
        }

        if (dateTypeState == "sh") {

            birthYearSh = parseInt(getTimeAgeCalculationYearInput.value);
            birthDaySh = parseInt(getTimeAgeCalculationDayInput.value);
            birthMonthSh = parseInt(selectMonthAgeCalculationSh.value);
            
            if (currentYearSh == birthYearSh && currentMonthSh < birthMonthSh) {

                getTimeAgeCalculationYearInput.classList.add("error");
                selectMonthAgeCalculationSh.classList.add("error");
                calculateAge();

            } else if (
                currentYearSh == birthYearSh
                &&
                birthMonthSh == currentMonthSh
                &&
                currentDaySh < birthDaySh
            ) {

                getTimeAgeCalculationDayInput.classList.add("error");
                calculateAge();

            } else {
                getTimeAgeCalculationYearInput.classList.remove("error");
                selectMonthAgeCalculationSh.classList.remove("error");
                getTimeAgeCalculationDayInput.classList.remove("error");
            }

            resultYearSh = currentYearSh - birthYearSh;

            if (currentMonthSh >= birthMonthSh) {
                resultMonthSh = currentMonthSh - birthMonthSh;
            } else {
                resultMonthSh =  12 - (birthMonthSh - currentMonthSh);
                resultYearSh -= 1;
            }

            if (currentDaySh >= birthDaySh) {
                resultDaySh = currentDaySh - birthDaySh;
            } else {
                resultDaySh =  birthDaySh - currentDaySh;
                resultMonthSh -= 1;
            }

            showYearAge.innerHTML = resultYearSh;
            showMonthAge.innerHTML = resultMonthSh;
            showDayAge.innerHTML = resultDaySh;
        }
    
        getDateBirthDayMain.classList.add("hidden");
        showAgeDiv.classList.remove("hidden");
    }

}

function validationGetBirthDateFormBlur(event) {

    if (event.target.tagName == "INPUT") {
        
        if (dateTypeState == "ad" && event.target.placeholder == "Year") {

            if (date.getFullYear() < parseInt(event.target.value)
                ||
                parseInt(event.target.value) < 1900
                ||
                event.target.value == ""
            ) {
                event.target.classList.add("error");
            } else {
                event.target.classList.remove("error");
            }
        }

        else if (dateTypeState == "sh" && event.target.placeholder == "Year") {

            if (currentYearSh < parseInt(event.target.value)
                ||
                parseInt(event.target.value) < 1300
                ||
                event.target.value == ""
            ) {
                    event.target.classList.add("error");
            } else {
                event.target.classList.remove("error");
            }
        }

        if (event.target.placeholder == "Day") {

            if (31 < parseInt(event.target.value) 
                ||
                parseInt(event.target.value) < 1
                ||
                event.target.value == ""
            ) {
                event.target.classList.add("error");
            } else {
                event.target.classList.remove("error");
            }
        }

    }

    if (event.target.tagName == "SELECT") {

        if (event.target.value == "0") {
            event.target.classList.add("error");
        } else {
            event.target.classList.remove("error");
        }
    }

}

function validationGetBirthDateForm(statusCallBack) {

    let errosCount = 0;

    if (dateTypeState == "ad") {

        if (
            (statusCallBack === "calculateAge"
            &&
            getTimeAgeCalculationYearInput.value === "")
            ||
            ((statusCallBack === "calculateAge"
            &&
            getTimeAgeCalculationYearInput.value != "")
            ||
            (statusCallBack === "changeDateState"
            &&
            getTimeAgeCalculationYearInput.value != ""))
            &&
            (currentYearAd < parseInt(getTimeAgeCalculationYearInput.value)
            ||
            parseInt(getTimeAgeCalculationYearInput.value) < 1900)
        ) {
            errosCount += 1;
            getTimeAgeCalculationYearInput.classList.add("error");
        } else {
            getTimeAgeCalculationYearInput.classList.remove("error");
        }

        if (
            statusCallBack === "calculateAge"
            &&
            parseInt(selectMonthAgeCalculationAd.value) == 0
        ) {
            errosCount += 1;
            selectMonthAgeCalculationAd.classList.add("error");
        } else {
            selectMonthAgeCalculationAd.classList.remove("error");
        }
        
    } else {

        if (
            (statusCallBack === "calculateAge"
            &&
            getTimeAgeCalculationYearInput.value === "")
            ||
            ((statusCallBack === "calculateAge"
            &&
            getTimeAgeCalculationYearInput.value != "")
            ||
            (statusCallBack === "changeDateState"
            &&
            getTimeAgeCalculationYearInput.value != ""))
            &&
            (currentYearSh < parseInt(getTimeAgeCalculationYearInput.value)
            ||
            parseInt(getTimeAgeCalculationYearInput.value) < 1300)
        ) {
            errosCount += 1;
            getTimeAgeCalculationYearInput.classList.add("error");
        } else {
            getTimeAgeCalculationYearInput.classList.remove("error");
        }

        if (
            statusCallBack === "calculateAge"
            &&
            parseInt(selectMonthAgeCalculationSh.value) == 0
        ) {
            errosCount += 1;
            selectMonthAgeCalculationSh.classList.add("error");
        } else {
            selectMonthAgeCalculationSh.classList.remove("error");
        }

    }
    
    if (
        (statusCallBack === "calculateAge"
        &&
        getTimeAgeCalculationDayInput.value === "")
        ||
        ((statusCallBack === "calculateAge"
        &&
        getTimeAgeCalculationDayInput.value != "")
        ||
        (statusCallBack === "changeDateState"
        &&
        getTimeAgeCalculationDayInput.value != ""))
        &&
        (31 < parseInt(getTimeAgeCalculationDayInput.value)
        ||
        parseInt(getTimeAgeCalculationDayInput.value) < 1)
    ) {
        errosCount += 1;
        getTimeAgeCalculationDayInput.classList.add("error");
    } else {
        getTimeAgeCalculationDayInput.classList.remove("error");
    }

    if (errosCount == 0) {
        return true;
    } else {
        return false;
    }
}

function backCalculatioAge() {
    getDateBirthDayMain.classList.remove("hidden");
    showAgeDiv.classList.add("hidden");

    getTimeAgeCalculationYearInput.value = "";
    selectMonthAgeCalculationAd.value = 0;
    selectMonthAgeCalculationSh.value = 0;
    getTimeAgeCalculationDayInput.value = "";
}