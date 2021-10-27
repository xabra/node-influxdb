class SignalGenerator {
  calcPhaseShiftSec(phaseShiftRad) {
    return (this.phaseShiftRad / (2 * Math.PI)) * this.period;
  }

  constructor(
    startTime,
    period,
    dutyFactor,
    phaseShiftRad,
    amplitude,
    amplitudeOffset
  ) {
    this.startTime = startTime;
    this.period = period; // in seconds
    this.dutyFactor = dutyFactor; //0.0 to 1.0
    this.phaseShiftRad = phaseShiftRad; // store input value in radians
    this.amplitude = amplitude; // unitless
    this.amplitudeOffset = amplitudeOffset; // unitless

    this.phaseShiftSec = this.calcPhaseShiftSec(this.phaseShiftRad); // Calc and cache phase offset in seconds
  }

  // Methods
  phase(time) {
    // Returns the phase in radians
    return (
      2 *
      Math.PI *
      ((time - this.startTime + this.phaseShiftSec) % // Is sign of phase offset correct??
        this.period)
    );
  }

  signal(time) {
    return 0;
  }
}

class SineGenerator extends SignalGenerator {
  constructor(startTime, period, phaseShiftRad, amplitude, amplitudeOffset) {
    super(
      startTime,
      period,
      0, // DutyFactor not used
      phaseShiftRad,
      amplitude,
      amplitudeOffset
    ); // call the super class constructor
  }

  // Methods
  signal(time) {
    return this.amplitudeOffset + this.amplitude * Math.sin(this.phase(time));
  }
}

class SquarewaveGenerator extends SignalGenerator {
  constructor(
    startTime,
    period,
    dutyFactor,
    phaseShiftRad,
    amplitude,
    amplitudeOffset
  ) {
    super(
      startTime,
      period,
      dutyFactor, //0 to 1.0
      phaseShiftRad,
      amplitude,
      amplitudeOffset
    ); // call the super class constructor
  }

  // Methods
  signal(time) {
    let phase = this.phase(time);
    let positivePhase = phase >= 0.0 ? phase : phase + 2 * math.PI;
    let sig = positivePhase <= 2 * Math.PI * this.dutyFactor ? 1.0 : 0.0;
    return this.amplitudeOffset + this.amplitude * sig;
  }
}

class TrianglewaveGenerator extends SignalGenerator {
  constructor(
    startTime,
    period,
    dutyFactor,
    phaseShiftRad,
    amplitude,
    amplitudeOffset
  ) {
    super(
      startTime,
      period,
      dutyFactor, //0 to 1.0
      phaseShiftRad,
      amplitude,
      amplitudeOffset
    ); // call the super class constructor
  }

  // Methods
  signal(time) {
    let twopi = 2 * Math.PI;
    let phase = this.phase(time);
    let positivePhase = phase >= 0.0 ? phase : phase + twopi;
    let dutyFactorRad = twopi * this.dutyFactor;
    let sig =
      positivePhase <= dutyFactorRad
        ? positivePhase / dutyFactorRad
        : (twopi - positivePhase) / (twopi - dutyFactorRad);
    return this.amplitudeOffset + this.amplitude * sig;
  }
}
// === Testing ============

let interval_ms = 5;
const startTime = Date.now() / 1000; //Common start time for all generators, in seconds

let gen1 = new TrianglewaveGenerator(startTime, 1.0, 0.5, 0, 10, 0);
let gen2 = new TrianglewaveGenerator(startTime, 1.0, 0.0, 0, 10, 2);
let gen3 = new TrianglewaveGenerator(startTime, 1.0, 1.0, 0, 10, -2);

setInterval(() => {
  let currentTime = Date.now() / 1000;
  let elapsedTime = currentTime - startTime;
  console.log(
    `${elapsedTime} ${gen1.signal(currentTime)} ${gen2.signal(
      currentTime
    )} ${gen3.signal(currentTime)}`
  );
}, interval_ms);
