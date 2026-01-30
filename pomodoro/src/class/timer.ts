export class Timer {
  private minutos: number = 0;
  private segundos: number = 0;
  private intervalID: any = null;

  constructor(private onTick: (min: number, sec: number) => void) {}

  startTime() {
    if (this.intervalID) return;

    this.intervalID = setInterval(() => {
      if (this.segundos >= 59) {
        this.segundos = 0;
        this.minutos++;
      }

      this.segundos++;
      this.onTick(this.minutos, this.segundos);
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.intervalID);
    this.intervalID = null;
  }

  resetTimer() {
    this.minutos = 0;
    this.segundos = 0;
    this.stopTimer();
    this.onTick(this.minutos, this.segundos);
  }
}
