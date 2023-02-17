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
    var startBtn = document.querySelector(".startBtn");
    var pauseBtn = document.querySelector(".pauseBtn");
    var stopBtn = document.querySelector(".stopBtn");
    function timerUpdate() {
        var hours = Math.floor(timer / 3600);
        var minutes = Math.floor((timer % 3600) / 60);
        var seconds = Math.floor(timer % 60);
        timerDisplay.innerHTML = "".concat(hours, "h ").concat(minutes, "m ").concat(seconds, "s");
        if (timer === 0) {
            clearInterval(interval);
            alarm.play();
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
    startBtn.addEventListener("click", function () {
        interval = setInterval(timerUpdate, 1000);
    });
    pauseBtn === null || pauseBtn === void 0 ? void 0 : pauseBtn.addEventListener("click", function () {
        clearInterval(interval);
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
        alarm.play();
    });
    twoHoursBtn.addEventListener("click", function () {
        timer = 7200;
        timerDisplay.innerHTML = "2h 0m 0s";
        alarm.play();
    });
    thirtMinBtn.addEventListener("click", function () {
        timer = 1800;
        timerDisplay.innerHTML = "0h 30m 0s";
        alarm.play();
    });
    breakBtn.addEventListener("click", function () {
        breakBtn.innerHTML = breakBtn.innerHTML === "YES" ? "NO" : "YES";
    });
}
setTime(30);
