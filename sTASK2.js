let timer;
let isRunning = false;
let time = 0; // Time in seconds
let lapTimes = [];
let darkMode = false;
let coolBlueMode = false;

function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const sec = seconds % 60;
    return `${padZero(hours)}:${padZero(minutes)}:${padZero(sec)}`;
}

function padZero(num) {
    return num < 10 ? `0${num}` : num;
}

function toggleStartStop() {
    if (isRunning) {
        clearInterval(timer); // Stop timer
        document.getElementById('startStop').textContent = "Start";
    } else {
        timer = setInterval(updateTime, 1000); // Start timer
        document.getElementById('startStop').textContent = "Pause";
    }
    isRunning = !isRunning;
}

function updateTime() {
    time++;
    document.getElementById('time').textContent = formatTime(time);
    updateProgressBar();
}

function updateProgressBar() {
    const maxTime = 3600; // Max time for progress bar (e.g., 1 hour)
    const percentage = (time / maxTime) * 100;
    document.getElementById('progress-bar-fill').style.width = `${percentage}%`;
}

function resetStopwatch() {
    clearInterval(timer); // Stop the timer
    isRunning = false;
    time = 0;
    lapTimes = [];
    document.getElementById('time').textContent = formatTime(time);
    document.getElementById('lap-list').innerHTML = "";
    document.getElementById('startStop').textContent = "Start";
    document.getElementById('progress-bar-fill').style.width = "0%";
}

function recordLap() {
    if (isRunning) {
        lapTimes.push(time);
        const lapList = document.getElementById('lap-list');
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapTimes.length}: ${formatTime(time)}`;
        lapList.appendChild(lapItem);
        playSound();
    }
}

function playSound() {
    const audio = new Audio('https://www.soundjay.com/button/beep-07.wav');
    audio.play();
}

function toggleTheme() {
    darkMode = !darkMode;
    coolBlueMode = !darkMode && !coolBlueMode;

    const body = document.body;
    if (darkMode) {
        body.classList.add('dark-mode');
        body.classList.remove('cool-blue');
        document.querySelector('.mode-toggle').textContent = "Switch to Light Mode";
    } else if (coolBlueMode) {
        body.classList.add('cool-blue');
        body.classList.remove('dark-mode');
        document.querySelector('.mode-toggle').textContent = "Switch to Dark Mode";
    } else {
        body.classList.remove('dark-mode', 'cool-blue');
        document.querySelector('.mode-toggle').textContent = "Switch to Cool Blue Mode";
    }
}
