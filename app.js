let iterationCount = 0;
let interval_ms = 1;

function intervalTask() {
  if (iterationCount % 1000 == 0) {
    // console.log only every 1000 iterations
    console.log("Iterations: " + iterationCount);
  }
  iterationCount++;
}

setInterval(intervalTask, interval_ms);
