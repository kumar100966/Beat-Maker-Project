class Drumkit {
  constructor() {
    this.initialiseSelectors();
    this.index = 0;
    this.bpm = 150;
    this.intervalID = null;
  }

  initialiseSelectors() {
    this.kickDrums = document.querySelectorAll(".kick-box");
    this.snareDrums = document.querySelectorAll(".snare-box");
    this.hihatDrums = document.querySelectorAll(".hihat-box");
    this.kickAudio = document.querySelector(".kick-sound");
    this.snareAudio = document.querySelector(".snare-sound");
    this.hihatAudio = document.querySelector(".hihat-sound");
    this.playButton = document.querySelector(".play-button");
  }

  repeat() {
    let repeatingCounter = this.index % 8;
    const activeBoxes = document.querySelectorAll(
      `.box${repeatingCounter + 1}`
    );

    activeBoxes.forEach((box) => {
      box.style.animation = "boxScale .3s ease-in-out alternate 2";
      if (box.classList.contains("kick-box-active")) {
        this.kickAudio.currentTime = 0.1;
        this.kickAudio.play();
      }
      if (box.classList.contains("snare-box-active")) {
        this.snareAudio.currentTime = 0.1;
        this.snareAudio.play();
      }
      if (box.classList.contains("hihat-box-active")) {
        this.hihatAudio.currentTime = 0.1;
        this.hihatAudio.play();
      }
    });

    this.index++;
  }

  start() {
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
}

const drumkit = new Drumkit();

drumkit.playButton.addEventListener("click", () => drumkit.start());

drumkit.kickDrums.forEach((element) => {
  element.addEventListener("click", () =>
    element.classList.toggle("kick-box-active")
  );
  element.addEventListener(
    "animationend",
    () => (element.style.animation = "")
  );
});
drumkit.snareDrums.forEach((element) => {
  element.addEventListener("click", () =>
    element.classList.toggle("snare-box-active")
  );
  element.addEventListener(
    "animationend",
    () => (element.style.animation = "")
  );
});
drumkit.hihatDrums.forEach((element) => {
  element.addEventListener("click", () =>
    element.classList.toggle("hihat-box-active")
  );
  element.addEventListener(
    "animationend",
    () => (element.style.animation = "")
  );
});
