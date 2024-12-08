export {};
const text = await Deno.readTextFile("input.txt");
const lines = text.split("\n");

const length = lines.length;
const width = lines[0].length;
let foundCount = 0;

type Coordinate = {
  line: number;
  char: number;
};

type Line = [Coordinate, Coordinate];
type Pair = [Line, Line];

// function isValidCoordinate({line, char}: Coordinate) {
//   return line > 0 && line <= length && char >=0  && char < width
// }

const diagonals: Pair = [[{ line: -1, char: -1 }, { line: 1, char: 1 }], [{
  line: -1,
  char: 1,
}, { line: 1, char: -1 }]];
const compass: Pair = [[{ line: -1, char: 0 }, { line: 1, char: 0 }], [{
  line: 0,
  char: -1,
}, { line: 0, char: 1 }]];

function getLetter({ line, char }: Coordinate) {
  return lines[line][char];
}

function addCoordinates(
  { line: line1, char: char1 }: Coordinate,
  { line: line2, char: char2 }: Coordinate,
) {
  return { line: line1 + line2, char: char1 + char2 };
}

function isMas(coord1: Coordinate, coord2: Coordinate) {
  // if (!isValidCoordinate(coord1)) || !isValidCoordinate(coord2)) {
  //   return false
  // }
  const val1 = getLetter(coord1);
  const val2 = getLetter(coord2);
  return (val1 === "M" && val2 === "S") || (val1 === "S" && val2 === "M");
}

function checkX(center: Coordinate, pair: Pair) {
  return pair.every(([offsetA, offsetB]) =>
    isMas(addCoordinates(center, offsetA), addCoordinates(center, offsetB))
  );
}

for (let line = 1; line < length - 1; line++) {
  for (let char = 1; char < width - 1; char++) {
    const center = { line, char };
    if (getLetter(center) === "A") {
      if (checkX(center, diagonals)) {
        foundCount++;
      }
      // if(checkX(center, compass)) {
      //   foundCount++
      // }
    }
  }
}

console.log(foundCount);
