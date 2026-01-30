export class Timer {
  private minutos: number = 0;
  private segundos: number = 0;
  private intervalID: any = null;

  constructor(
    private onTick: (min: number, sec: number) => void,
    public focus: number = 25,
    public shortBreak: number = 5,
    public longBreak: number = 15,
  ) {
    this.minutos = this.focus;
  }

  startTime() {
    if (this.intervalID) return;

    this.intervalID = setInterval(() => {
      if (this.segundos <= 0) {
        this.segundos = 60;
        this.minutos--;
      }

      this.segundos--;
      this.onTick(this.minutos, this.segundos);
    }, 300);
  }

  stopTimer() {
    console.log(this.minutos);
    clearInterval(this.intervalID);
    this.intervalID = null;
  }

  resetTimer() {
    this.minutos = this.focus;
    this.segundos = 0;
    this.stopTimer();
    this.onTick(this.minutos, this.segundos);
  }
}
