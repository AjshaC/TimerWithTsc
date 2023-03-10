function setTime(durations) {
    var _this = this;
    var interval;
    var timer = durations * 60;
    var alarm = new Audio("Ring.mp3");
    var breakDuration = 5 * 60;
    var breakTime = 0;
    var originalTime = 0;
    //const breakBtn = document.querySelector(".breakBtn") as HTMLButtonElement;
    //breakBtn.style.opacity = "0";
    var timerDisplay = document.querySelector(".timerDisplay");
    var oneHourBtn = document.querySelector(".oneHourBtn");
    var twoHoursBtn = document.querySelector(".twoHoursBtn");
    var thirtMinBtn = document.querySelector(".thirtMinBtn");
    var MotivationInput = document.querySelector(".MotivationInput");
    var TaskSettings = document.querySelector(".TaskSettings");
    var startBtn = document.querySelector(".startBtn");
    var pauseBtn = document.querySelector(".pauseBtn");
    var stopBtn = document.querySelector(".stopBtn");
    var containerOne = document.querySelector(".containerOne");
    var circle = document.querySelector(".circle");
    startBtn.disabled = true;
    var savedSettings = [];
    function saveTaskSettings(hours, motivation) {
        var settings = {
            hours: hours,
            motivation: motivation,
            stopped: false
        };
        savedSettings.push(settings);
        localStorage.setItem("TaskComplitetd", JSON.stringify(savedSettings));
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
            containerOne.classList.remove("animate");
            containerOne.classList.add("animateFadeIn");
            circle.classList.remove("animate");
            localStorage.setItem("TaskComplitetd", JSON.stringify(savedSettings));
            disableDurationButtons(false, this);
            saveTaskSettings(durations, MotivationInput.value);
        }
        else {
            timer--;
            // if (breakBtn.innerHTML === "YES" && timer % (25 * 60) === 0) {
            //   originalTime = timer;
            //   timer = breakDuration;
            //   breakTime = breakDuration;
            //   alarm.play();
            //   console.log("Break Started");
            //   timerDisplay.innerHTML += " (Break)";
            // }
            // if (breakTime > 0) {
            //   timerDisplay.innerHTML = `${breakTime} seconds left for break`;
            //   breakTime--;
            // }
            // if (breakTime === 0 && originalTime > 0) {
            //   timer = originalTime;
            //   originalTime = 0;
            //   timerDisplay.innerHTML = `${Math.floor(timer / 3600)}h ${Math.floor(
            //     (timer % 3600) / 60
            //   )}m ${Math.floor(timer % 60)}s`;
            // }
        }
    }
    displaySavedTaskSettings();
    function displaySavedTaskSettings() {
        var savedSettingsHTML = "";
        var CompletedTask = localStorage.getItem("TaskComplitetd");
        var savedSettings;
        if (CompletedTask === null) {
            savedSettings = [];
        }
        else {
            savedSettings = JSON.parse(CompletedTask);
        }
        function ClearDataFromLocalStorage() {
            setTimeout(function () {
                localStorage.removeItem("TaskComplitetd");
                if (!localStorage.getItem("TaskComplitetd")) {
                    location.reload();
                }
            }, 12 * 60 * 60 * 1000); //5*1000 12 * 60 * 60 * 1000
            // if (localStorage.getItem("TaskComplitetd") == null) {
            //   location.reload();
            // }
        }
        ClearDataFromLocalStorage();
        savedSettings.forEach(function (setting) {
            if (!setting.stopped) {
                var timeString = setting.hours < 60 ? "min" : "hour";
                var timeValue = setting.hours < 60 ? setting.hours : Math.floor(setting.hours / 60);
                console.log(timeValue);
                savedSettingsHTML += "<div class=\"task-Done\"> ".concat(setting.motivation, "</div>");
            }
            //${timeValue} ${timeString} -
        });
        TaskSettings.innerHTML = savedSettingsHTML;
    }
    function disableDurationButtons(disable, clickedButton) {
        var durationBtns = [oneHourBtn, twoHoursBtn, thirtMinBtn];
        durationBtns.forEach(function (btn) {
            if (btn !== clickedButton) {
                btn.disabled = disable;
                btn.style.opacity = disable ? "0.5" : "1";
            }
        });
    }
    startBtn.addEventListener("click", function () {
        // breakBtn.style.opacity = "0";
        if (!MotivationInput.value) {
            MotivationInput.style.borderBottom = "2px solid pink";
            return;
        }
        interval = setInterval(timerUpdate, 1000);
        containerOne.classList.add("animate");
        containerOne.classList.remove("animateFadeIn");
        MotivationInput.disabled = true;
        startBtn.style.opacity = "0.5";
        startBtn.disabled = true;
        circle.classList.add("animate");
        savedSettings.forEach(function (setting) {
            setting.stopped = false;
        });
        disableDurationButtons(true, _this);
    });
    pauseBtn === null || pauseBtn === void 0 ? void 0 : pauseBtn.addEventListener("click", function () {
        clearInterval(interval);
        startBtn.style.opacity = "1";
        startBtn.disabled = false;
        circle.classList.remove("animate");
    });
    stopBtn.addEventListener("click", function () {
        clearInterval(interval);
        timerDisplay.innerHTML = "";
        timer = durations * 0;
        containerOne.classList.remove("animate");
        containerOne.classList.add("animateFadeIn");
        MotivationInput.disabled = false;
        timerDisplay.innerHTML = "Start Over";
        startBtn.style.opacity = "1";
        startBtn.disabled = true;
        //breakBtn.style.opacity = "1";
        disableDurationButtons(false, _this);
        circle.classList.remove("animate");
        breakTime = 0;
        savedSettings.forEach(function (setting) {
            if (!setting.stopped) {
                setting.stopped = true;
                console.log("true");
            }
        });
        displaySavedTaskSettings();
    });
    oneHourBtn.addEventListener("click", function () {
        timer = 3600; //3600
        timerDisplay.innerHTML = "1h 0m 0s";
        startBtn.style.opacity = "1";
        startBtn.disabled = false;
    });
    twoHoursBtn.addEventListener("click", function () {
        timer = 7200; //7200
        timerDisplay.innerHTML = "2h 0m 0s";
        startBtn.disabled = false;
    });
    thirtMinBtn.addEventListener("click", function () {
        timer = 1800; //1800; //60 f??r att testa 1
        timerDisplay.innerHTML = "0h 30m 0s";
        startBtn.style.opacity = "1";
        startBtn.disabled = false;
    });
    // breakBtn.addEventListener("click", () => {
    // breakBtn.innerHTML = breakBtn.innerHTML === "YES" ? "NO" : "YES";
    // });
}
setTime(30);
