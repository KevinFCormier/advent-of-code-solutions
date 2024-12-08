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
  function getViolatedRules(update: number[]) {
    return rules.filter(([first, last]) => {
      const firstIndex = update.indexOf(first);
      const lastIndex = update.indexOf(last);
      return !(firstIndex < 0 || lastIndex < 0 || (firstIndex < lastIndex));
    });
  }
  let violatedRules = getViolatedRules(u);
  if (violatedRules.length) {
    do {
      const [first, last] = violatedRules[0];
      u.splice(u.indexOf(last), 1);
      u.splice(u.indexOf(first) + 1, 0, last);
      violatedRules = getViolatedRules(u);
    } while (violatedRules.length);

    sum += u[(u.length - 1) / 2];
  }
});

console.log(sum);
