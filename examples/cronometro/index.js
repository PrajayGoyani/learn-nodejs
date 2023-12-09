const assert = require('assert');

const BUF = Buffer.allocUnsafe(64);
for (let n = 0; n < 64; ++n) {
  BUF[n] = n;
}

cronometro({
  'Buffer.indexOf'() {
    const idx = BUF.indexOf(44);
    assert(idx >= 0);
  },
  'Uint8Array.indexOf'() {
    const idx = Array.prototype.indexOf.call(BUF, 44);
    assert(idx >= 0);
  },
});

function cronometro(tests) {
  const results = {};
  let fastestTest = null;
  let fastestTime = Infinity;

  for (const testName in tests) {
    if (tests.hasOwnProperty(testName)) {
      try {
        const startTime = process.hrtime();
        tests[testName]();
        const endTime = process.hrtime(startTime);
        console.log(endTime);
        const executionTime = endTime[0] * 1e3 + endTime[1] / 1e6;

        if (executionTime < fastestTime) {
          fastestTime = executionTime;
          fastestTest = testName;
        }

        results[testName] = executionTime;
      } catch (error) {
        results[testName] = 'Errored';
      }
    }
  }

  console.table(results);
  console.log(`Fastest test: ${fastestTest} (${fastestTime.toFixed(2)}ms)`);
}
