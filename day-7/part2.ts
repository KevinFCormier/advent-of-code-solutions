export {};
const text = await Deno.readTextFile("input.txt") as string;
const lines = text.split("\n");

function solve(
  operands: number[],
  cumulative: number,
  cumulativeExpression: string,
  result: number,
): { expression: string; equal: boolean } | undefined {
  const operand = operands[0];
  const remainingOperands = operands.slice(1);
  if (remainingOperands.length) {
    const plus = solve(
      remainingOperands,
      cumulative + operand,
      `${cumulativeExpression} + ${operand}`,
      result,
    );
    const multiply = solve(
      remainingOperands,
      cumulative * operand,
      `${cumulativeExpression} * ${operand}`,
      result,
    );
    const concat = solve(
      remainingOperands,
      Number(`${cumulative}${operand}`),
      `${cumulativeExpression} || ${operand}`,
      result,
    );
    return plus?.equal
      ? plus
      : multiply?.equal
      ? multiply
      : concat?.equal
      ? concat
      : undefined;
  } else {
    if ((cumulative + operand) == result) {
      return {
        expression: `${result} = ${cumulativeExpression} + ${operand}`,
        equal: true,
      };
    } else if ((cumulative * operand) == result) {
      return {
        expression: `${result} = ${cumulativeExpression} * ${operand}`,
        equal: true,
      };
    } else if (Number(`${cumulative}${operand}`) == result) {
      return {
        expression: `${result} = ${cumulativeExpression} || ${operand}`,
        equal: true,
      };
    } else {
      return undefined;
    }
  }
}

let sum = 0;
lines.forEach((line) => {
  const [resultString, operandsString] = line.split(": ");
  const result = Number(resultString);
  const operands = operandsString.split(" ").map(Number);
  const operand = operands[0];
  const solution = solve(operands.slice(1), operand, String(operand), result);
  if (solution) {
    if (solution.expression.includes("||")) {
      console.log(solution.expression);
    }
    sum += result;
  } else {
    console.log(`No solution: ${result}: ${operandsString}`);
  }
});

console.log(sum);
