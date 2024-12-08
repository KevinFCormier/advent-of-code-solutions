export {};
const text = await Deno.readTextFile("input.txt");
let safeReports = 0;
text.split("\n").forEach((line) => {
  const values = line.split(/\s+/g).map(Number);
  const increasing = (values[1] - values[0]) > 0;
  if (
    values.every((v, index) => {
      if (index === 0) {
        return true;
      }
      const diff = v - values[index - 1];
      return increasing ? diff >= 1 && diff <= 3 : diff <= -1 && diff >= -3;
    })
  ) {
    safeReports += 1;
  }
});

console.log(safeReports);
