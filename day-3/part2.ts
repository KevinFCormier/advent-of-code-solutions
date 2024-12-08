export {};
const text = await Deno.readTextFile("input.txt");

const matches = [...text.matchAll(/mul\((\d+),(\d+)\)|do\(\)|don\'t\(\)/g)];
let sum = 0;
let enabled = true;
matches.forEach((m) => {
  if (m[0] === "do()") {
    enabled = true;
  } else if (m[0] === "don't()") {
    enabled = false;
  } else if (enabled) {
    sum += Number(m[1]) * Number(m[2]);
  }
});
console.log(sum);
