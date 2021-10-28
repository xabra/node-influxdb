import {
  SinewaveGenerator,
  TrianglewaveGenerator,
  SquarewaveGenerator,
} from "./signal-generator.mjs";

let gen1 = new SinewaveGenerator(0, 2.3, 0, 10.0, 0);
let gen2 = new SquarewaveGenerator(0, 1, 0.1, 0, 5.0, 0);

console.log(`GEN1: ${JSON.stringify(gen1)}`);

const dt = 0.02;
for (let t = 0; t < 6; t += dt) {
  let s1 = gen1.signal(t);
  let s2 = gen2.signal(t);
  console.log(`${t} ${s1} ${s2} ${s1 + s2}`);
}
