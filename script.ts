function setTime(durations: number) {
  let interval: number;
  let timer = durations * 60;
  const alarm = new Audio("Ring.mp3");
  const breakDuration = 5 * 60;
  let breakTime = 0;

  let originalTime = 0;

  const breakBtn = document.querySelector(".breakBtn") as HTMLButtonElement;

  const timerDisplay = document.querySelector(".timerDisplay") as HTMLElement;
  const oneHourBtn = document.querySelector(".oneHourBtn") as HTMLButtonElement;
  const twoHoursBtn = document.querySelector(
    ".twoHoursBtn"
  ) as HTMLButtonElement;
  const thirtMinBtn = document.querySelector(
    ".thirtMinBtn"
  ) as HTMLButtonElement;
  const startBtn = document.querySelector(".startBtn") as HTMLButtonElement;
  const pauseBtn = document.querySelector(".pauseBtn") as HTMLButtonElement;
  const stopBtn = document.querySelector(".stopBtn") as HTMLButtonElement;

  function timerUpdate() {
    const hours = Math.floor(timer / 3600);
    const minutes = Math.floor((timer % 3600) / 60);
    const seconds = Math.floor(timer % 60);

    timerDisplay.innerHTML = `${hours}h ${minutes}m ${seconds}s`;

    if (timer === 0) {
      clearInterval(interval);
      alarm.play();
    } else {
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
        timerDisplay.innerHTML = `${breakTime} seconds left for break`;
        breakTime--;
      } else if (timer % 60 === 0) {
        timerDisplay.innerHTML += " (Work)";
      }

      if (breakTime === 0 && originalTime > 0) {
        timer = originalTime;
        originalTime = 0;
        timerDisplay.innerHTML = `${Math.floor(timer / 3600)}h ${Math.floor(
          (timer % 3600) / 60
        )}m ${Math.floor(timer % 60)}s`;
      }
    }
  }

  startBtn.addEventListener("click", () => {
    interval = setInterval(timerUpdate, 1000);
  });

  pauseBtn?.addEventListener("click", () => {
    clearInterval(interval);
  });

  stopBtn.addEventListener("click", () => {
    clearInterval(interval);
    timerDisplay.innerHTML = "";
    timer = durations * 60;

    breakTime = 0;
  });

  oneHourBtn.addEventListener("click", () => {
    timer = 3600;
    timerDisplay.innerHTML = "1h 0m 0s";
    alarm.play();
  });

  twoHoursBtn.addEventListener("click", () => {
    timer = 7200;
    timerDisplay.innerHTML = "2h 0m 0s";
    alarm.play();
  });

  thirtMinBtn.addEventListener("click", () => {
    timer = 1800;
    timerDisplay.innerHTML = "0h 30m 0s";
    alarm.play();
  });

  breakBtn.addEventListener("click", () => {
    breakBtn.innerHTML = breakBtn.innerHTML === "YES" ? "NO" : "YES";
  });
}

setTime(30);
