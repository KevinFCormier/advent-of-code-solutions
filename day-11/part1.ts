export {};
const text = await Deno.readTextFile("input.txt");
let numbers = text.split(" ").map(Number);

for (let i = 0; i < 25; i++) {
    const newNumbers: number[] = [];
    numbers.forEach((n) => {
        if (n === 0) {
            newNumbers.push(1);
        } else if (String(n).length % 2 === 0) {
            const numberAsString = String(n);
            newNumbers.push(
                Number(numberAsString.substring(0, numberAsString.length / 2)),
            );
            newNumbers.push(
                Number(numberAsString.substring(numberAsString.length / 2)),
            );
        } else {
            newNumbers.push(n * 2024);
        }
    });
    numbers = newNumbers;
    //console.log(numbers.join(" "));
}
console.log(numbers.length);
