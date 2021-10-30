import { InfluxDB } from "@influxdata/influxdb-client";
import { Point } from "@influxdata/influxdb-client";
import dotenv from "dotenv";
dotenv.config();

import {
  SinewaveGenerator,
  TrianglewaveGenerator,
  SquarewaveGenerator,
} from "./signal-generator.mjs";

// Influx client init
const token = process.env.INFLUXDB_TOKEN;
const org = process.env.INFLUXDB_ORG;
const bucket = process.env.INFLUXDB_BUCKET;
const client = new InfluxDB({
  url: INFLUXDB_URL,
  token: token,
});
const writeApi = client.getWriteApi(org, bucket);
writeApi.useDefaultTags({ timer: "freerun" });

// Init time and signal sources
const t0 = Date.now() / 1000; // Start time, seconds
let t = t0;
let gen1 = new SinewaveGenerator(t0, 2.3, 0, 10.0, 0);
let gen2 = new SquarewaveGenerator(t0, 1, 0.1, 0, 5.0, 0);

//Write points loop
for (let i = 0; i < 20; i++) {
  let s1 = gen1.signal(t);
  let s2 = gen2.signal(t);
  let elapsed = t - t0;
  console.log(`${elapsed} ${s1} ${s2} ${s1 + s2}`);

  const point = new Point("mem").floatField("Elapsed3", elapsed);
  writeApi.writePoint(point);

  t = Date.now() / 1000; //Update time, seconds
}

//Flush and close
writeApi
  .close()
  .then(() => {
    console.log("FINISHED");
  })
  .catch((e) => {
    console.error(e);
    console.log("Finished ERROR");
  });
