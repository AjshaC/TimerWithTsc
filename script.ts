function setTime(durations: number) {
  let interval: number;
  let timer = durations * 60;
  const alarm = new Audio("Ring.mp3");
  const breakDuration = 5 * 60;
  let breakTime = 0;

  let originalTime = 0;

  //const breakBtn = document.querySelector(".breakBtn") as HTMLButtonElement;
  //breakBtn.style.opacity = "0";
  const timerDisplay = document.querySelector(".timerDisplay") as HTMLElement;
  const oneHourBtn = document.querySelector(".oneHourBtn") as HTMLButtonElement;
  const twoHoursBtn = document.querySelector(
    ".twoHoursBtn"
  ) as HTMLButtonElement;
  const thirtMinBtn = document.querySelector(
    ".thirtMinBtn"
  ) as HTMLButtonElement;

  const MotivationInput = document.querySelector(
    ".MotivationInput"
  ) as HTMLInputElement;

  const TaskSettings = document.querySelector(".TaskSettings") as HTMLElement;

  const startBtn = document.querySelector(".startBtn") as HTMLButtonElement;
  const pauseBtn = document.querySelector(".pauseBtn") as HTMLButtonElement;
  const stopBtn = document.querySelector(".stopBtn") as HTMLButtonElement;
  const containerOne = document.querySelector(
    ".containerOne"
  ) as HTMLButtonElement;

  let circle = document.querySelector(".circle") as HTMLHRElement;

  startBtn.disabled = true;

  interface TaskSettings {
    hours: number;
    motivation: string;
    stopped: boolean;
  }

  let savedSettings: TaskSettings[] = [];

  function saveTaskSettings(hours: number, motivation: string) {
    const settings: TaskSettings = {
      hours,
      motivation,
      stopped: false,
    };
    savedSettings.push(settings);
    localStorage.setItem("TaskComplitetd", JSON.stringify(savedSettings));

    displaySavedTaskSettings();
  }

  function timerUpdate() {
    const hours = Math.floor(timer / 3600);
    const minutes = Math.floor((timer % 3600) / 60);
    const seconds = Math.floor(timer % 60);

    timerDisplay.innerHTML = `${hours}h ${minutes}m ${seconds}s`;

    if (timer === 0) {
      clearInterval(interval);
      alarm.play();
      containerOne.classList.remove("animate");
      containerOne.classList.add("animateFadeIn");
      circle.classList.remove("animate");
      localStorage.setItem("TaskComplitetd", JSON.stringify(savedSettings));
      disableDurationButtons(false, this);
      saveTaskSettings(durations, MotivationInput.value);
    } else {
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
    let savedSettingsHTML = "";
    let CompletedTask = localStorage.getItem("TaskComplitetd");
    let savedSettings;
    if (CompletedTask === null) {
      savedSettings = [];
    } else {
      savedSettings = JSON.parse(CompletedTask);
    }

    function ClearDataFromLocalStorage() {
      setTimeout(() => {
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

    savedSettings.forEach((setting) => {
      if (!setting.stopped) {
        const timeString = setting.hours < 60 ? "min" : "hour";
        const timeValue =
          setting.hours < 60 ? setting.hours : Math.floor(setting.hours / 60);
        console.log(timeValue);
        savedSettingsHTML += `<div class="task-Done"> ${setting.motivation}</div>`;
      }

      //${timeValue} ${timeString} -
    });

    TaskSettings.innerHTML = savedSettingsHTML;
  }

  function disableDurationButtons(
    disable: boolean,
    clickedButton: HTMLButtonElement
  ) {
    const durationBtns = [oneHourBtn, twoHoursBtn, thirtMinBtn];

    durationBtns.forEach((btn) => {
      if (btn !== clickedButton) {
        btn.disabled = disable;
        btn.style.opacity = disable ? "0.5" : "1";
      }
    });
  }

  startBtn.addEventListener("click", () => {
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
    savedSettings.forEach((setting) => {
      setting.stopped = false;
    });

    disableDurationButtons(true, this);
  });

  pauseBtn?.addEventListener("click", () => {
    clearInterval(interval);

    startBtn.style.opacity = "1";
    startBtn.disabled = false;

    circle.classList.remove("animate");
  });

  stopBtn.addEventListener("click", () => {
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
    disableDurationButtons(false, this);
    circle.classList.remove("animate");
    breakTime = 0;

    savedSettings.forEach((setting) => {
      if (!setting.stopped) {
        setting.stopped = true;
        console.log("true");
      }
    });
    displaySavedTaskSettings();
  });

  oneHourBtn.addEventListener("click", () => {
    timer = 3600; //3600
    timerDisplay.innerHTML = "1h 0m 0s";

    startBtn.style.opacity = "1";
    startBtn.disabled = false;
  });

  twoHoursBtn.addEventListener("click", () => {
    timer = 7200; //7200
    timerDisplay.innerHTML = "2h 0m 0s";

    startBtn.disabled = false;
  });

  thirtMinBtn.addEventListener("click", () => {
    timer = 1800; //1800; //60 för att testa 1
    timerDisplay.innerHTML = "0h 30m 0s";

    startBtn.style.opacity = "1";
    startBtn.disabled = false;
  });

  // breakBtn.addEventListener("click", () => {
  // breakBtn.innerHTML = breakBtn.innerHTML === "YES" ? "NO" : "YES";
  // });
}
setTime(30);
