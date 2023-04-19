let sessionTime = 1500;
let breakTime = 300;
let pause = false;
let clock;

const mins = document.getElementById("mins");
const secs = document.getElementById("secs");
const sessionTimes = document.getElementById("sessionTimes");
const breakTimes = document.getElementById("breakTimes");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");

const formatTimes = (time) => parseInt(time).toString().padStart(2, "0");

startBtn.addEventListener("click", () => startClock("session"));
pauseBtn.addEventListener("click", () => pauseClock());
resetBtn.addEventListener("click", () => resetClock());

function initTimes() {
  sessionTime = 1500;
  sessionTimes.textContent = formatTimes(sessionTime / 60);
  breakTimes.textContent = breakTime / 60;
  mins.textContent = formatTimes(sessionTime / 60);
  secs.textContent = formatTimes(sessionTime % 60);
  changeButtonDisabled(false);
}

function changeButtonDisabled(type) {
  document.querySelector(".session-time-add").disabled = type;
  document.querySelector(".session-time-decrease").disabled = type;
  document.querySelector(".break-time-add").disabled = type;
  document.querySelector(".break-time-decrease").disabled = type;
}

function startClock(type) {
  let timer;
  if (type === "session") {
    timer = sessionTime;
  } else if (type === "break") {
    timer = breakTime;
  } else {
    return;
  }

  changeButtonDisabled(true);
  pause = false;

  clock = setInterval(() => {
    if (!pause) {
      timer--;
      mins.textContent = formatTimes(timer / 60);
      secs.textContent = formatTimes(timer % 60);
      document.title = `${formatTimes(timer / 60)}：${formatTimes(timer % 60)}`;

      if (timer <= 0) {
        clearInterval(clock);
        if (type === "session") {
          setTimeout(() => {
            alert("Session Times Out!");
            startClock("break");
          }, 1000);
        } else if (type === "break") {
          initTimes();
        }
        return;
      }
    }
  }, 1000);
}

function pauseClock() {
  pause = true;
  clearInterval(clock);
}

function resetClock() {
  initTimes();
  clearInterval(clock);
  document.title = "Pomodoro Timer";
}

function handleTimes(time, target) {
  const maxTime = 60 * 60;

  if (target === "sessionTimes") {
    const newSessionTime = sessionTime + time;
    if (newSessionTime < 60 || newSessionTime > maxTime) {
      return;
    }
    sessionTime = newSessionTime;
    sessionTimes.textContent = formatTimes(sessionTime / 60);
    mins.textContent = formatTimes(sessionTime / 60);
  } else {
    const newBreakTime = breakTime + time;
    if (newBreakTime < 0 || newBreakTime > maxTime) {
      return;
    }
    breakTime = newBreakTime;
    breakTimes.textContent = breakTime / 60;
  }
}

initTimes();
