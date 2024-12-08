export {};
const text = await Deno.readTextFile("input.txt") as string;
const lines = text.split("\n");
const rules: [number, number][] = [];
const updates: number[][] = [];
lines.forEach((line) => {
  if (line.includes("|")) {
    rules.push(line.split("|").slice(0, 2).map(Number) as [number, number]);
  } else if (line.includes(",")) {
    updates.push(line.split(",").map(Number));
  }
});

let sum = 0;
updates.forEach((u) => {
  if (
    rules.every(([first, last]) => {
      const firstIndex = u.indexOf(first);
      const lastIndex = u.indexOf(last);
      return firstIndex < 0 || lastIndex < 0 || (firstIndex < lastIndex);
    })
  ) {
    sum += u[(u.length - 1) / 2];
  }
});

console.log(sum);
