let startTime, updatedTime, difference, tInterval, savedTime = 0;
let running = false;
let lapTimes = [];

function start() {
    if (!running) {
        startTime = new Date().getTime() - savedTime;
        tInterval = setInterval(getShowTime, 1000);
        document.getElementById("startBtn").disabled = true;
        document.getElementById("pauseBtn").disabled = false;
        running = true;
    }
}

function pause() {
    if (running) {
        clearInterval(tInterval);
        savedTime = difference;
        document.getElementById("startBtn").disabled = false;
        document.getElementById("pauseBtn").disabled = true;
        running = false;
    }
}

function reset() {
    clearInterval(tInterval);
    running = false;
    savedTime = 0;
    document.getElementById("startBtn").disabled = false;
    document.getElementById("pauseBtn").disabled = true;
    document.getElementById("display").innerHTML = "00:00:00";
    lapTimes = [];
    document.getElementById("laps").innerHTML = "";
}

function recordLap() {
    if (running) {
        let lapTime = document.getElementById("display").innerHTML;
        lapTimes.push(lapTime);
        let lapDiv = document.createElement("div");
        lapDiv.innerHTML = `Lap ${lapTimes.length}: ${lapTime}`;
        document.getElementById("laps").appendChild(lapDiv);
    }
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    document.getElementById("display").innerHTML = hours + ":" + minutes + ":" + seconds;
}
