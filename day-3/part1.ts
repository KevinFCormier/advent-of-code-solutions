export {};
const text = await Deno.readTextFile("input.txt");

const matches = [...text.matchAll(/mul\((\d+),(\d+)\)/g)];
let sum = 0;
let enabled = true;
matches.forEach((m) => {
  sum += Number(m[1]) * Number(m[2]);
});
console.log(sum);
