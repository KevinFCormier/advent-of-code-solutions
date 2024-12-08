export {};
const text = await Deno.readTextFile("input.txt");

function isSafe(values: number[]) {
  const increasing = (values[1] - values[0]) > 0;
  return values.every((v, index) => {
    if (index === 0) {
      return true;
    }
    const diff = v - values[index - 1];
    return increasing ? diff >= 1 && diff <= 3 : diff <= -1 && diff >= -3;
  });
}

let safeReports = 0;
text.split("\n").forEach((line) => {
  const values = line.split(/\s+/g).map(Number);
  const increasing = (values[1] - values[0]) > 0;
  if (isSafe(values)) {
    safeReports += 1;
  } else {
    for (let i = 0; i < values.length; i++) {
      if (isSafe(values.toSpliced(i, 1))) {
        safeReports += 1;
        break;
      }
    }
  }
});

console.log(safeReports);
