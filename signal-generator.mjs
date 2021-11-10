const twopi = 2 * Math.PI;

class SignalGenerator {
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

    this.phaseShiftSec = (this.phaseShiftRad / twopi) * this.period; // Calc and cache phase offset in seconds
  }

  // Methods
  phase(time) {
    // Returns the phase in radians
    return (
      (twopi * ((time - this.startTime + this.phaseShiftSec) % this.period)) /
      this.period
    );
  }

  signal(time) {
    return 0;
  }
}

class SinewaveGenerator extends SignalGenerator {
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
    let positivePhase = phase >= 0.0 ? phase : phase + twopi;
    let sig = positivePhase <= twopi * this.dutyFactor ? 1.0 : 0.0;
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

class NoiseGenerator extends SignalGenerator {
  constructor(startTime, amplitude, offset) {
    super(
      startTime,
      1, // Period
      0, // DutyFactor not used
      0, // phaseShiftRad,
      amplitude,
      offset
    ); // call the super class constructor
  }

  // Methods
  signal() {
    return (Math.random() - 0.5) * this.amplitude + this.amplitudeOffset;
  }
}

export {
  SinewaveGenerator,
  SquarewaveGenerator,
  TrianglewaveGenerator,
  NoiseGenerator,
};
