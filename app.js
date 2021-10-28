import { InfluxDB } from "@influxdata/influxdb-client";
import dotenv from "dotenv";
dotenv.config();

import {
  SinewaveGenerator,
  TrianglewaveGenerator,
  SquarewaveGenerator,
} from "./signal-generator.mjs";

const dt = 0.02; //seconds
let t0 = Date.now() / 1000; //seconds
let gen1 = new SinewaveGenerator(t0, 2.3, 0, 10.0, 0);
let gen2 = new SquarewaveGenerator(t0, 1, 0.1, 0, 5.0, 0);

// Influx client init
const token = process.env.INFLUXDB_TOKEN;
const org = "adam.brailove@gmail.com";
const bucket = "SignalGeneratorTestBucket";
const client = new InfluxDB({
  url: "https://us-west-2-1.aws.cloud2.influxdata.com",
  token: token,
});

let t = t0;
setInterval(() => {
  let s1 = gen1.signal(t);
  let s2 = gen2.signal(t);
  console.log(`${t - t0} ${s1} ${s2} ${s1 + s2}`);
  t = Date.now() / 1000;
}, dt * 1000);
