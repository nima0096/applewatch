document.addEventListener("DOMContentLoaded", function () {
  let laps = [];
  let isTimeRunning = false;
  let timerID;
  let totalMilliseconds = 0;

  function formatTime(time) {
    if (time < 10) {
      return `0${time}`;
    } else {
      return time;
    }
  }

  const rightSideButton = document.getElementById("right-side-button");
  const leftSideButton = document.getElementById("left-side-button");

  rightSideButton.addEventListener("click", function () {
    if (!isTimeRunning) {
      isTimeRunning = true;

      rightSideButton.innerText = "Stop";
      rightSideButton.style.backgroundColor = "red";
      rightSideButton.style.color = "white";

      leftSideButton.innerText = "Lap";

      timerID = setInterval(function () {
        totalMilliseconds++;
        const timerInSeconds = totalMilliseconds / 100;

        const minutes = Math.floor((timerInSeconds % 3600) / 60);
        const seconds = Math.floor(timerInSeconds % 60);
        const milliseconds = totalMilliseconds % 100;

        document.getElementById("minutes").innerText = formatTime(minutes);
        document.getElementById("seconds").innerText = formatTime(seconds);
        document.getElementById("milliseconds").innerText =
          formatTime(milliseconds);
      }, 10);
    } else {
      isTimeRunning = false;
      rightSideButton.innerText = "Start";
      rightSideButton.style.backgroundColor = "green";
      rightSideButton.style.color = "#fafafa";

      leftSideButton.innerText = "Reset";

      clearInterval(timerID);
    }
  });

  leftSideButton.addEventListener("click", function () {
    if (!isTimeRunning) {
      isClockRunning = false;
      laps = [];
      totalMilliseconds = 0;
      clearInterval(timerID);

      document.getElementById("minutes").innerText = "00";
      document.getElementById("seconds").innerText = "00";
      document.getElementById("milliseconds").innerText = "00";

      displayLaps();
    } else {
      addLap();
    }
  });

  function addLap() {
    const timerInSeconds = totalMilliseconds / 100;

    const minutes = Math.floor((timerInSeconds % 3600) / 60);
    const seconds = Math.floor(timerInSeconds % 60);
    const milliseconds = totalMilliseconds % 100;

    laps.push({
      lap: laps.length + 1,
      minutes: formatTime(minutes),
      seconds: formatTime(seconds),
      milliseconds: formatTime(milliseconds / 10),
    });

    displayLaps();
  }

  function displayLaps() {
    const lapsContainer = document.getElementById("laps");
    lapsContainer.innerHTML = "";

    laps.forEach(function (lap, index) {
      const lapDiv = document.createElement("div");
      lapDiv.id = index;

      const lapNumber = document.createElement("span");
      lapNumber.textContent = `Lap ${lap.lap}`;

      const lapTime = document.createElement("span");
      lapTime.textContent = `${lap.minutes}:${lap.seconds}.${lap.milliseconds}`;

      lapDiv.appendChild(lapNumber);
      lapDiv.appendChild(lapTime);

      lapDiv.style.display = "flex";
      lapDiv.style.justifyContent = "space-between";
      lapDiv.style.width = "100%";
      lapDiv.style.marginTop = "12px";

      lapsContainer.appendChild(lapDiv);
    });
  }
});
Collapse;
