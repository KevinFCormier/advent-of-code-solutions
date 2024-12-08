export {};
const text = await Deno.readTextFile("input.txt");
const lines = text.split("\n").map((s) => Array.from(s));

const length = lines.length;
const width = lines[0].length;

const antinodes: boolean[][] = Array(length);
for (let i = 0; i < length; i++) {
  antinodes[i] = Array(width).fill(false);
}

type Coordinate = {
  line: number;
  char: number;
};

function isValidCoordinate({ line, char }: Coordinate) {
  return line >= 0 && line < length && char >= 0 && char < width;
}

function getCharacter(coord: Coordinate) {
  const { line, char } = coord;
  return lines[line][char];
}

function setAntinode(coord: Coordinate) {
  if (isValidCoordinate(coord)) {
    const { line, char } = coord;
    antinodes[line][char] = true;
  }
}

function addCoordinates(
  { line: line1, char: char1 }: Coordinate,
  { line: line2, char: char2 }: Coordinate,
) {
  return { line: line1 + line2, char: char1 + char2 };
}

function subtractCoordinate(
  { line: line1, char: char1 }: Coordinate,
  { line: line2, char: char2 }: Coordinate,
) {
  return { line: line1 - line2, char: char1 - char2 };
}

function reduceSlope(slope: Coordinate) {
  const { line, char } = slope;
  let factor = Math.min(line, char);
  while (factor > 1) {
    if (line % factor === 0 && char % factor === 0) {
      const newSlope = { line: line / factor, char: char / factor };
      console.log(
        `reduced ${JSON.stringify(slope)} to ${JSON.stringify(newSlope)}`,
      );
      return newSlope;
    }
    factor--;
  }
  return slope;
}

for (let line = 0; line < length; line++) {
  for (let char = 0; char < width; char++) {
    const position = { line, char };
    const value = getCharacter(position);
    if (value !== ".") {
      for (
        let nextLine = char + 1 === width ? line + 1 : line;
        nextLine < length;
        nextLine++
      ) {
        for (
          let nextChar = nextLine === line ? char + 1 : 0;
          nextChar < width;
          nextChar++
        ) {
          const nextPosition = { line: nextLine, char: nextChar };
          if (getCharacter(nextPosition) === value) {
            const slope = reduceSlope(
              subtractCoordinate(nextPosition, position),
            );
            let antinode = nextPosition;
            do {
              setAntinode(antinode);
              antinode = addCoordinates(antinode, slope);
            } while (isValidCoordinate(antinode));
            antinode = subtractCoordinate(nextPosition, slope);
            do {
              setAntinode(antinode);
              antinode = subtractCoordinate(antinode, slope);
            } while (isValidCoordinate(antinode));
          }
        }
      }
    }
  }
}

let total = 0;

antinodes.forEach((line) => {
  console.log(line.map((b) => (b ? "#" : ".")).join(""));
  line.forEach((antinode) => {
    if (antinode) {
      total++;
    }
  });
});
console.log(total);
