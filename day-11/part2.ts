export {};
const text = await Deno.readTextFile("input.txt");
const numbers = text.split(" ").map(Number);

const BLINK_COUNT = 75;
const solutions: number[][] = [];
for (let i = 0; i <= BLINK_COUNT; i++) {
    solutions[i] = [];
}

function solve(blinks: number, number: number): number {
    if (blinks === 0) {
        return 1;
    }
    if (!solutions[blinks][number]) {
        if (number === 0) {
            solutions[blinks][number] = solve(blinks - 1, 1);
        } else if (String(number).length % 2 === 0) {
            const numberAsString = String(number);
            solutions[blinks][number] = solve(
                blinks - 1,
                Number(
                    numberAsString.substring(0, numberAsString.length / 2),
                ),
            ) +
                solve(
                    blinks - 1,
                    Number(numberAsString.substring(numberAsString.length / 2)),
                );
        } else {
            solutions[blinks][number] = solve(blinks - 1, number * 2024);
        }
    }
    return solutions[blinks][number];
}

const result = numbers.reduce((sum, number) => {
    return sum + solve(BLINK_COUNT, number);
}, 0);

console.log(result);
