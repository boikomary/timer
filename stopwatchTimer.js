import { ClassHelper } from "./classHelper.js";

function StopwatchTimer(watch) {
  let startTime;
  let myInterval;

  let htmlElements = {
    output: document.querySelector(`.container [data-mode="${watch.name}"] .output`),
    buttons: document.querySelectorAll(
      `.container .tabs [data-mode="${watch.name}"] .buttons button`
    ),
    startButton: document.querySelector(
      `.container .tabs [data-mode="${watch.name}"] .buttons .start`
    ),
    stopButton: document.querySelector(
      `.container .tabs [data-mode="${watch.name}"] .buttons .stop`
    ),
    resetButton: document.querySelector(
      `.container .tabs [data-mode="${watch.name}"] .buttons .reset`
    )
  };

  function onStartButtonClick() {
    ClassHelper.removeClass("disabled", htmlElements.buttons);
    ClassHelper.addClass("disabled", [htmlElements.startButton]);
    myInterval = setInterval(onIntervalTick, 1000);
    startTime = new Date().getTime();
  }

  function onStopButtonClick() {
    ClassHelper.removeClass("disabled", htmlElements.buttons);
    ClassHelper.addClass("disabled", [htmlElements.stopButton]);
    clearInterval(myInterval);
    lastDifferenceSeconds = differenceSeconds;
  }

  function onResetButtonClick() {
    ClassHelper.removeClass("disabled", htmlElements.buttons);
    ClassHelper.addClass("disabled", [htmlElements.resetButton]);
    lastDifferenceSeconds = initSeconds;
    startTime = new Date().getTime();
    clearInterval(myInterval);
    onIntervalTick();
  }



  function onIntervalTick() {
    const differenceMilliseconds = new Date().getTime() - startTime;
    watch.differenceSeconds(differenceMilliseconds);

    let seconds = parseInt(differenceSeconds % 60);
    let minutes = parseInt((differenceSeconds / 60) % 60);
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }

    if (seconds < 10) {
      seconds = `0${seconds}`;
    }

    htmlElements.output.innerText = `00:${minutes}:${seconds}`;
  }

  htmlElements.startButton.addEventListener("click", onStartButtonClick);
  htmlElements.stopButton.addEventListener("click", onStopButtonClick);
  htmlElements.resetButton.addEventListener("click", onResetButtonClick);
}

class SuperTimer{
  constructor(name, initSeconds){
    
    this.lastDifferenceSeconds = initSeconds;
    this.differenceSeconds = 0;
  }

  onIntervalTick() {
    const differenceMilliseconds = new Date().getTime() - startTime;
    differenceSeconds(differenceMilliseconds);

    let seconds = parseInt(differenceSeconds % 60);
    let minutes = parseInt((differenceSeconds / 60) % 60);
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }

    if (seconds < 10) {
      seconds = `0${seconds}`;
    }

    htmlElements.output.innerText = `00:${minutes}:${seconds}`;
  }
  
    differenceSeconds(differenceMilliseconds) {
      throw new Error("mode is not recognized");
    }
  }

class Timer extends SuperTimer {
  constructor(initSeconds){
    super("timer", initSeconds)
  }

  differenceSeconds(differenceMilliseconds) {
    differenceSeconds =
      lastDifferenceSeconds - Math.round(differenceMilliseconds / 1000);
    if (differenceSeconds === 0) {
      clearInterval(myInterval);
      console.log("stopped");
    }
  }
}

class StopWatch extends SuperTimer {
  constructor(initSeconds){
    super("stopwatch", initSeconds)
  }

  differenceSeconds(differenceMilliseconds) {
    differenceSeconds =
      lastDifferenceSeconds + Math.round(differenceMilliseconds / 1000);
  }
}

export { StopwatchTimer };
