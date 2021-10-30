import { InfluxDB } from "@influxdata/influxdb-client";
import { Point } from "@influxdata/influxdb-client";
import dotenv from "dotenv";
dotenv.config();

import {
  SinewaveGenerator,
  TrianglewaveGenerator,
  SquarewaveGenerator,
} from "./signal-generator.mjs";

// Init Influx client
const token = process.env.INFLUXDB_TOKEN;
const org = process.env.INFLUXDB_ORG;
const bucket = process.env.INFLUXDB_BUCKET;
const client = new InfluxDB({
  url: process.env.INFLUXDB_URL,
  token: token,
});
const writeApi = client.getWriteApi(org, bucket);
writeApi.useDefaultTags({});

// Init time and signal sources
const t0 = Date.now() / 1000; // Start time, seconds
let t = t0;
let measurementCount = 0;
let gen1 = new SinewaveGenerator(t0, 2.3, 0, 10.0, 0);
let gen2 = new SquarewaveGenerator(t0, 1, 0.1, 0, 5.0, 0);

//Write points loop
let intervalHandle = setInterval(() => {
  if (measurementCount <= 200) {
    let s1 = gen1.signal(t);
    let s2 = gen2.signal(t);
    let elapsedTime = t - t0;
    console.log(`${measurementCount} ${elapsedTime} ${s1} ${s2} ${s1 + s2}`);
    const point = new Point("testData2")
      .floatField("measurementCount", measurementCount)
      .floatField("elapsedTime", elapsedTime)
      .floatField("s1", s1)
      .floatField("s2", s2)
      .floatField("s1+s2", s1 + s2);
    writeApi.writePoint(point);
    t = Date.now() / 1000; //Update time, second
    measurementCount++;
  } else {
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
    clearInterval(intervalHandle);
  }
}, 10);
