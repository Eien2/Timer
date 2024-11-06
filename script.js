/*====HTML====*/
function renderFooter() {
  const footer = document.querySelector(".js-footer");

  footer.innerHTML = `
    <a class="credit-link link" href="https://github.com/Eien2" target="_blank">
      <p class="credit-text">Created by Eien</p>
    </a>
  `;
}

function renderTimer() {
  const main2 = document.querySelector(".js-main-2");

  main2.innerHTML += `
    <div class="timer-frame">
      <div class="stop-start-container">
        <button class="stop-start-btn start-btn js-start-btn">Start</button>
        <button class="stop-start-btn stop-btn js-stop-btn">Stop</button>
      </div>

      <div class="timer">
        <p class="timer-text js-timer-output">
          00:00:00
        </p>
      </div>
    </div>
  `;
}

function renderMain() {
  const main = document.querySelector(".js-main");

  main.innerHTML = `
    <div class="description-container">
      <div class="title-container">
        <p class="title">Read</p>
      </div>

      <p class="description">
        Enter the hours, minutes and seconds you want to set the timer up. <br>
        Click the white button on timer to start or stop it. <br>
        if you want to reset the timer click the button that is below inputs. <br>
        <br>
        Enjoy my simple project
      </p>
    </div>

    <div class="input-container">
      <div class="description-container-in">
        <p class="description description-1">
          Please provide numbers in inputs below.
        </p>
        <p class="description description-2">
          Max 59 seconds and minutes.
        </p>
      </div>

      <div class="inputs">
        <input class="input-hours js-hours time-input" type="text" name="time" value="" placeholder="HH">
        <input class="input-minutes js-minutes time-input" type="text" name="time" value="" placeholder="MM">
        <input class="input-seconds js-seconds time-input" type="text" name="time" value="" placeholder="SS">
      </div>
    </div>

    <div class="reset-btn-container">
      <button class="reset-btn js-reset-btn">Reset Timer</button>
    </div>
  `;

  renderTimer();
}

renderMain();
renderFooter();

/*====INTERACTIVE====*/

function timer() {
  let hoursInput = document.querySelector(".js-hours");
  let minutesInput = document.querySelector(".js-minutes");
  let secondsInput = document.querySelector(".js-seconds");
  hoursInput = hoursInput.value;
  minutesInput = minutesInput.value;
  secondsInput = secondsInput.value;

  if (!hoursInput || !minutesInput || !secondsInput) {
    alert("Please Enter Values");
  } else if (minutesInput >= 60 || secondsInput >= 60) {
    alert("You can't enter minutes and seconds above 59");
  } else if (hoursInput != "" && minutesInput != "" && secondsInput != "") {
    const formatHours = Number(hoursInput * 3600);
    const formatMinutes = Number(minutesInput * 60);
    const formatSeconds = Number(secondsInput);

    let time = JSON.parse(localStorage.getItem("time")) || {
      time: formatHours + formatMinutes + formatSeconds,
    };

    // Time Script
    const timeInterval = setInterval(() => {
      time.time--;
      time.timeOnGoing = time.time;
      const timeString = `${new Date(time.timeOnGoing * 1000).toISOString().slice(11, 19)}`;
      const timerOutput = document.querySelector(".js-timer-output");
      timerOutput.innerText = `${timeString}`;

      document.title = `Timer - ${timeString}`;

      localStorage.setItem("time", JSON.stringify(time));

      if (time.time == 0) {
        clearInterval(timeInterval);
        timerEndSoundEffect();
        localStorage.removeItem("time");
      }
    }, 1000);

    // Reset Button
    const resetBtn = document.querySelector(".js-reset-btn");

    resetBtn.addEventListener("click", () => {
      time.time = 0;
      localStorage.removeItem("time");
      const timeString = `${new Date(time.time * 1000).toISOString().slice(11, 19)}`;
      const timerOutput = document.querySelector(".js-timer-output");
      timerOutput.innerText = `${timeString}`;

      document.title = `Timer - ${timeString}`;
      clearInterval(timeInterval);
    });

    // Stop Btn
    const stopBtn = document.querySelector(".js-stop-btn");

    stopBtn.addEventListener("click", () => {
      clearInterval(timeInterval);
      time.timeOnGoing = time.time;
    });
  }
}

function timerEndSoundEffect() {
  const ringSound = new Audio("./sounds/ring-sound.mp3");
  ringSound.volume = 0.5;
  ringSound.play();
}

localStorage.removeItem("time");

// Buttons
const startBtn = document.querySelector(".js-start-btn");

startBtn.addEventListener("click", () => {
  timer();
});
