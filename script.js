function setTime(durations) {
    var interval;
    var timer = durations * 60;
    var alarm = new Audio("Ring.mp3");
    var breakDuration = 5 * 60;
    var breakTime = 0;
    var originalTime = 0;
    var breakBtn = document.querySelector(".breakBtn");
    var timerDisplay = document.querySelector(".timerDisplay");
    var oneHourBtn = document.querySelector(".oneHourBtn");
    var twoHoursBtn = document.querySelector(".twoHoursBtn");
    var thirtMinBtn = document.querySelector(".thirtMinBtn");
    var MotivationInput = document.querySelector(".MotivationInput");
    var TaskSettings = document.querySelector(".TaskSettings");
    var startBtn = document.querySelector(".startBtn");
    var pauseBtn = document.querySelector(".pauseBtn");
    var stopBtn = document.querySelector(".stopBtn");
    var savedSettings = [];
    function saveTaskSettings(hours, motivation) {
        var settings = {
            hours: hours,
            motivation: motivation
        };
        savedSettings.push(settings);
        displaySavedTaskSettings();
    }
    function timerUpdate() {
        var hours = Math.floor(timer / 3600);
        var minutes = Math.floor((timer % 3600) / 60);
        var seconds = Math.floor(timer % 60);
        timerDisplay.innerHTML = "".concat(hours, "h ").concat(minutes, "m ").concat(seconds, "s");
        if (timer === 0) {
            clearInterval(interval);
            alarm.play();
            saveTaskSettings(durations, MotivationInput.value);
        }
        else {
            timer--;
            if (breakBtn.innerHTML === "YES" && timer % (25 * 60) === 0) {
                originalTime = timer;
                timer = breakDuration;
                breakTime = breakDuration;
                alarm.play();
                console.log("Break Started");
                timerDisplay.innerHTML += " (Break)";
            }
            if (breakTime > 0) {
                timerDisplay.innerHTML = "".concat(breakTime, " seconds left for break");
                breakTime--;
            }
            else if (timer % 60 === 0) {
                timerDisplay.innerHTML += " (Work)";
            }
            if (breakTime === 0 && originalTime > 0) {
                timer = originalTime;
                originalTime = 0;
                timerDisplay.innerHTML = "".concat(Math.floor(timer / 3600), "h ").concat(Math.floor((timer % 3600) / 60), "m ").concat(Math.floor(timer % 60), "s");
            }
        }
    }
    function displaySavedTaskSettings() {
        var savedSettingsHTML = "";
        savedSettings.forEach(function (setting) {
            var timeString = setting.hours === 1 ? "hour" : "hours";
            savedSettingsHTML += "<div>".concat(setting.hours, " ").concat(timeString, " - ").concat(setting.motivation, "</div>");
        });
        TaskSettings.innerHTML = savedSettingsHTML;
    }
    startBtn.addEventListener("click", function () {
        interval = setInterval(timerUpdate, 1000);
        console.log(savedSettings);
    });
    pauseBtn === null || pauseBtn === void 0 ? void 0 : pauseBtn.addEventListener("click", function () {
        clearInterval(interval);
        console.log("JJ");
    });
    stopBtn.addEventListener("click", function () {
        clearInterval(interval);
        timerDisplay.innerHTML = "";
        timer = durations * 60;
        breakTime = 0;
    });
    oneHourBtn.addEventListener("click", function () {
        timer = 3600;
        timerDisplay.innerHTML = "1h 0m 0s";
    });
    twoHoursBtn.addEventListener("click", function () {
        timer = 7200;
        timerDisplay.innerHTML = "2h 0m 0s";
    });
    thirtMinBtn.addEventListener("click", function () {
        timer = 60; //1800; //60 för att testa 1
        timerDisplay.innerHTML = "0h 30m 0s";
    });
    breakBtn.addEventListener("click", function () {
        breakBtn.innerHTML = breakBtn.innerHTML === "YES" ? "NO" : "YES";
    });
}
setTime(30);
