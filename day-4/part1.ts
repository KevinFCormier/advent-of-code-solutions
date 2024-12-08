export {};
const text = await Deno.readTextFile("input.txt");
const lines = text.split("\n");

const word = "XMAS";
const length = lines.length;
const width = lines[0].length;
let foundCount = 0;

for (let line = 0; line < length; line++) {
  for (let char = 0; char < width; char++) {
    if (lines[line][char] === word[0]) {
      for (let lineStep = -1; lineStep <= 1; lineStep++) {
        for (let charStep = -1; charStep <= 1; charStep++) {
          if (lineStep !== 0 || charStep !== 0) {
            let currentLine = line;
            let currentChar = char;
            let index = 0;
            while (
              index < word.length && currentLine >= 0 && currentLine < length &&
              currentChar >= 0 && currentChar < width
            ) {
              if (lines[currentLine][currentChar] !== word[index]) {
                break;
              }
              index++;
              currentLine += lineStep;
              currentChar += charStep;
            }
            if (index === word.length) {
              foundCount++;
            }
          }
        }
      }
    }
  }
}

console.log(foundCount);
