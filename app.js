import {
  SinewaveGenerator,
  TrianglewaveGenerator,
  SquarewaveGenerator,
} from "./signal-generator.mjs";

const dt = 0.02; //seconds
let t0 = Date.now() / 1000; //seconds
let gen1 = new SinewaveGenerator(t0, 2.3, 0, 10.0, 0);
let gen2 = new SquarewaveGenerator(t0, 1, 0.1, 0, 5.0, 0);

console.log(`GEN1: ${JSON.stringify(gen1)}`);

let t = t0;
setInterval(() => {
  let s1 = gen1.signal(t);
  let s2 = gen2.signal(t);
  console.log(`${t - t0} ${s1} ${s2} ${s1 + s2}`);
  t = Date.now() / 1000;
}, dt * 1000);
