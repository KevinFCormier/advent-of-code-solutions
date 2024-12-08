export {};
const text = await Deno.readTextFile("input.txt");
const left: number[] = [];
const right: number[] = [];
text.split("\n").forEach((line) => {
  const [col1, col2] = line.split(/\s+/g);
  left.push(Number(col1));
  right.push(Number(col2));
});
let similarity = 0;
left.forEach((left) => {
  similarity += left * right.filter((r) => r === left).length;
});
console.log(similarity);
