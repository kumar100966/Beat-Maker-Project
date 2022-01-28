class Drumkit {
  constructor() {
    this.initialiseSelectors();
    this.index = 0;
    this.bpm = 100;
    this.intervalID = null;
  }

  initialiseSelectors() {
    this.kickDrums = document.querySelectorAll(".kick-box");
    this.snareDrums = document.querySelectorAll(".snare-box");
    this.hihatDrums = document.querySelectorAll(".hihat-box");
    this.kickAudio = document.querySelector(".kick-sound");
    this.snareAudio = document.querySelector(".snare-sound");
    this.hihatAudio = document.querySelector(".hihat-sound");
  }

  repeat() {
    let repeatingCounter = this.index % 8;
    const activeBoxes = document.querySelectorAll(
      `.box${repeatingCounter + 1}`
    );

    activeBoxes.forEach((box) => {
      box.style.animation = "boxScale .3s ease-in-out alternate 2";
      if (box.classList.contains("kick-box-active")) {
        this.playDrumBeat(this.kickAudio);
      }
      if (box.classList.contains("snare-box-active")) {
        this.playDrumBeat(this.snareAudio);
      }
      if (box.classList.contains("hihat-box-active")) {
        this.playDrumBeat(this.hihatAudio);
      }
    });

    this.index++;
  }

  playDrumBeat(audio) {
    audio.currentTime = 0.1;
    audio.play();
  }

  start() {
    this.index = 0;
    if (!this.intervalID) {
      this.intervalID = window.setInterval(
        () => this.repeat(),
        (60 / this.bpm) * 1000
      );
      return;
    }

    window.clearInterval(this.intervalID);
    this.intervalID = null;
  }

  initialiseButtonAndBoxes(drumType, activeDrumClass) {
    drumType.forEach((element) => {
      element.addEventListener("click", () =>
        element.classList.toggle(activeDrumClass)
      );
      element.addEventListener(
        "animationend",
        () => (element.style.animation = "")
      );
    });
  }
}

const drumkit = new Drumkit();

drumkit.initialiseButtonAndBoxes(drumkit.kickDrums, "kick-box-active");
drumkit.initialiseButtonAndBoxes(drumkit.snareDrums, "snare-box-active");
drumkit.initialiseButtonAndBoxes(drumkit.hihatDrums, "hihat-box-active");

const playButton = document.querySelector(".play-button");

function togglePlayButton() {
  this.classList.toggle("play-button-active");
  if (this.classList.contains("play-button-active")) {
    this.innerText = "Stop";
    return;
  }
  this.innerText = "Play";
}

playButton.addEventListener("click", function () {
  drumkit.start();
  togglePlayButton.call(this);
});

const kickSelectElement = document.querySelector("#kick-sound");
const snareSelectElement = document.querySelector("#snare-sound");
const hihatSelectElement = document.querySelector("#hihat-sound");

addListenerToSoundSelect(kickSelectElement, drumkit.kickAudio);
addListenerToSoundSelect(snareSelectElement, drumkit.snareAudio);
addListenerToSoundSelect(hihatSelectElement, drumkit.hihatAudio);

function addListenerToSoundSelect(selectElement, audioElement) {
  selectElement.addEventListener("change", function () {
    audioElement.src = this.value;
  });
}
