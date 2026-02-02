export class Timer {
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
    this.timerFormat(this.focus);
  }

  timerFormat(value: number) {
    this.segundos = value;

    if (this.segundos >= 60) {
      this.minutos = Math.floor(this.segundos / 60);
      this.segundos = 0;
    }

    if (this.minutos >= 60) {
      this.horas = Math.floor(this.minutos / 60);
      this.minutos = this.minutos % 60;
    }

    this.onTick(this.horas, this.minutos, this.segundos);
  }

  shortBreakTime() {
    this.timerFormat(this.shortBreak);
    this.intervalBreakTime();
  }

  longBreakTime() {
    this.timerFormat(this.longBreak);
    this.intervalBreakTime();
  }

  intervalBreakTime() {
    this.intervalID = setInterval(() => {
      if (this.segundos == 0) {
        this.segundos = 60;
        this.minutos--;
      }

      this.segundos--;

      if (this.minutos == 0 && this.segundos == 0) {
        this.stopTimer();
        this.segundos = this.focus;
        this.startTime();
      }
      this.onTick(this.horas, this.minutos, this.segundos);
    }, 1000);
  }

  startTime() {
    if (this.intervalID) return;
    this.timerFormat(this.segundos);

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

      if (this.minutos <= 0 && this.segundos <= 0 && this.ciclos < this.cycle) {
        this.ciclos++;
        this.stopTimer();
        this.shortBreakTime();
      }

      if (
        this.minutos <= 0 &&
        this.segundos <= 0 &&
        this.ciclos === this.cycle
      ) {
        this.ciclos = 0;
        this.stopTimer();
        this.longBreakTime();
      }

      this.onTick(this.horas, this.minutos, this.segundos);
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.intervalID);
    this.intervalID = null;
  }

  resetTimer() {
    this.ciclos = 0;
    this.stopTimer();
    this.timerFormat(this.focus);
    this.onTick(this.horas, this.minutos, this.segundos);
  }
}
