import { SinewaveGenerator } from "./signal-generator.mjs";

let gen1 = new SinewaveGenerator(0, 2.3, 0, 10.0, 0);

console.log(`GEN1: ${JSON.stringify(gen1)}`);

const dt = 0.02;
for (let t = 0; t < 6; t += dt) {
  console.log(`${t} ${gen1.phase(t)} ${gen1.signal(t)}`);
}
