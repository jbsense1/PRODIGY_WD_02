let startTime = 0;
let elapsedTime = 0;
let isRunning = false;
let intervalId;
let laps = [];

const display = document.getElementById('display');
const lapList = document.getElementById('lap-list');

function formatTime(time) {
  const hours = Math.floor(time / 3600000);
  const minutes = Math.floor((time % 3600000) / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  
  return (
    (hours < 10 ? '0' : '') + hours + ':' +
    (minutes < 10 ? '0' : '') + minutes + ':' +
    (seconds < 10 ? '0' : '') + seconds
  );
}

function updateDisplay() {
  const currentTime = Date.now();
  elapsedTime = currentTime - startTime;
  display.textContent = formatTime(elapsedTime);
}

document.getElementById('start').addEventListener('click', function () {
  if (!isRunning) {
    isRunning = true;
    startTime = Date.now() - elapsedTime;
    intervalId = setInterval(updateDisplay, 1000); 
  }
});

document.getElementById('pause').addEventListener('click', function () {
  if (isRunning) {
    clearInterval(intervalId);
    isRunning = false;
  }
});


document.getElementById('reset').addEventListener('click', function () {
  clearInterval(intervalId);
  isRunning = false;
  startTime = 0;
  elapsedTime = 0;
  display.textContent = '00:00:00';
  lapList.innerHTML = ''; 
  laps = [];
});

document.getElementById('lap').addEventListener('click', function () {
  if (isRunning) {
    const lapTime = formatTime(elapsedTime);
    laps.push(lapTime);

    const li = document.createElement('li');
    li.textContent = `Lap ${laps.length}: ${lapTime}`;
    lapList.appendChild(li);
  }
});