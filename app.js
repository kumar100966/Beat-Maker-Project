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
    this.hihatAudio = document.querySelector(".hihat");
    this.playButton = document.querySelector(".play-button");
  }

  repeat() {
    let repeatingCounter = this.index % 8;
    console.log(repeatingCounter);
    this.index++;
  }

  play() {
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

drumkit.playButton.addEventListener("click", () => drumkit.play());
