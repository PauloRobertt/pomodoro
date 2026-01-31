export class Timer {
  private timer: number = 0;

  private horas: number = 0;
  private minutos: number = 0;
  private segundos: number = 0;

  private ciclos: number = 0;
  private intervalID: any = null;

  constructor(
    private onTick: (hors: number, min: number, sec: number) => void,
    public focus: number = 25,
    public shortBreak: number = 5,
    public longBreak: number = 15,
    public cycle: number = 4,
  ) {
    this.minutos = this.focus / 60;

    if (this.minutos > 60) {
      this.horas = Math.floor(this.minutos / 60);
      this.minutos = 0;
    }

    this.onTick(this.horas, this.minutos, this.segundos);
  }

  shortBreakTime() {
    this.minutos = this.shortBreak;
    this.intervalID = setInterval(() => {
      if (this.segundos <= 0) {
        this.segundos = 60;
        this.minutos--;
      }

      this.segundos--;

      if (this.minutos <= 0 && this.segundos <= 0) {
        this.stopTimer();
        this.startTime();
      }
      this.onTick(this.minutos, this.segundos);
    }, 100);
  }

  longBreakTime() {
    this.minutos = this.longBreak;
    this.intervalID = setInterval(() => {
      if (this.segundos <= 0) {
        this.segundos = 60;
        this.minutos--;
      }

      this.segundos--;

      if (this.minutos <= 0 && this.segundos <= 0) {
        this.stopTimer();
        this.startTime();
        console.log("LongBreak Acabou");
      }
      this.onTick(this.minutos, this.segundos);
    }, 100);
  }

  startTime() {
    if (this.intervalID) return;

    this.intervalID = setInterval(() => {
      if (this.segundos <= 0) {
        this.segundos = 59;
        this.minutos--;
      }

      if (this.minutos <= 0 && this.horas > 0) {
        this.minutos = 59;
        this.horas--;
      }

      this.segundos--;

      if (this.minutos <= 0 && this.segundos <= 0) {
        this.stopTimer();
      }

      this.onTick(this.horas, this.minutos, this.segundos);
    }, 1);
  }

  stopTimer() {
    clearInterval(this.intervalID);
    this.intervalID = null;
  }

  resetTimer() {
    this.stopTimer();
    this.minutos = this.focus / 60;
    this.segundos = 0;

    if (this.minutos > 60) {
      this.horas = Math.floor(this.minutos / 60);
      this.minutos = 0;
    }
    this.onTick(this.horas, this.minutos, this.segundos);
  }
}
