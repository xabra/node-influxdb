let iterationCount = 0;
let interval_ms = 1;
const start = Date.now();

class SignalGenerator {
  startTime = Date.now() / 1000; // Time at creation in seconds

  calcPhaseOffsetSeconds(offsetRadians) {
    return (this.phaseOffsetRadians / (2 * Math.PI)) * this.period;
  }

  constructor(period, phaseOffsetRadians, amplitude, amplitudeOffset) {
    this.period = period; // in seconds
    this.phaseOffsetRadians = phaseOffsetRadians; // store input value in radians
    this.amplitude = amplitude; // unitless
    this.amplitudeOffset = amplitudeOffset; // unitless

    this.phaseOffsetSeconds = this.calcPhaseOffsetSeconds(
      this.phaseOffsetRadians
    ); // Calc and cache phase offset in seconds
  }

  // Method

  phase() {
    return (
      2 *
      Math.PI *
      ((Date.now() / 1000 - this.startTime + this.phaseOffsetSeconds) % // Is sign of phase offset correct??
        this.period)
    );
  }

  signal() {
    return 0;
  }

  report() {
    console.log(JSON.stringify(this));
  }
}

class SineGenerator extends SignalGenerator {
  constructor(period, phaseOffset, amplitude, amplitudeOffset) {
    super(period, phaseOffset, amplitude, amplitudeOffset); // call the super class constructor
  }

  // Methods
  signal() {
    return this.amplitudeOffset + this.amplitude * Math.sin(this.phase());
  }
}

// === Testing ============
let gen1 = new SineGenerator(1.0, 0, 10, 0);
let gen2 = new SineGenerator(1.0, 0.628, 10, 0);
let gen3 = new SineGenerator(1.0, -0.628, 10, 0);

gen1.report();
gen2.report();
gen3.report();

setInterval(() => {
  console.log(
    `${
      (Date.now() - start) / 1000
    } ${gen1.phase()} ${gen2.phase()} ${gen3.phase()}`
  );
}, 10);
