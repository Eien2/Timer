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
      <button class="stop-start-btn js-start-btn"></button>

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

  if (hoursInput != "" && minutesInput != "" && secondsInput != "") {
    const formatHours = Number(hoursInput * 3600);
    const formatMinutes = Number(minutesInput * 60);
    const formatSeconds = Number(secondsInput);

    let time = formatHours + formatMinutes + formatSeconds;

    const timeInterval = setInterval(() => {
      time--;
      const timeString = `${new Date(time * 1000).toISOString().slice(11, 19)}`;
      const timerOutput = document.querySelector(".js-timer-output");
      timerOutput.innerText = `${timeString}`;

      document.title = `Timer - ${timeString}`;

      if (time == 0) {
        clearInterval(timeInterval)
        timerEndSoundEffect();
      }
    }, 1000);
  } else if (!hoursInput || !minutesInput || !secondsInput) {
    alert("Please Enter Values");
  }
}

function startTimer() {
  const startBtn = document.querySelector(".js-start-btn");

  startBtn.addEventListener("click", () => {
    timer();
  });
}

function timerEndSoundEffect() {
  const ringSound = new Audio("./sounds/ring-sound.mp3");
  ringSound.volume = 0.5;
  ringSound.play();
}

startTimer();
