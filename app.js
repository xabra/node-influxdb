let iterationCount = 0;
let interval_ms = 1;
const start = Date.now();

function intervalTask() {
  if (iterationCount % 1000 == 0) {
    // log every N iterations
    let elapsedTime = Date.now() - start;

    console.log(
      `Iteration: ${iterationCount}\tTime per iteration (ms): ${
        elapsedTime / iterationCount
      }`
    );
  }
  iterationCount++;
}

setInterval(intervalTask, interval_ms);
