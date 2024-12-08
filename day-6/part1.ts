export {};
const text = await Deno.readTextFile("input.txt");
const lines = text.split("\n").map((s) => Array.from(s));

const length = lines.length;
const width = lines[0].length;

type Coordinate = {
  line: number;
  char: number;
};

const up = { line: -1, char: 0 };
const right = { line: 0, char: 1 };
const down = { line: 1, char: 0 };
const left = { line: 0, char: -1 };
const directions = [up, right, down, left];

function turn(direction: Coordinate) {
  return directions[(directions.indexOf(direction) + 1) % directions.length];
}

function isValidCoordinate({ line, char }: Coordinate) {
  return line >= 0 && line < length && char >= 0 && char < width;
}

function getCharacter(coord: Coordinate) {
  if (!isValidCoordinate(coord)) {
    return undefined;
  }
  const { line, char } = coord;
  return lines[line][char];
}

function setCharacter({ line, char }: Coordinate, character: string) {
  return lines[line][char] = character;
}

function addCoordinates(
  { line: line1, char: char1 }: Coordinate,
  { line: line2, char: char2 }: Coordinate,
) {
  return { line: line1 + line2, char: char1 + char2 };
}

let direction = up;

let position;
for (let line = 0; line < length; line++) {
  for (let char = 0; char < width; char++) {
    if (getCharacter({ line, char }) === "^") {
      position = { line, char };
      break;
    }
  }
  if (position) {
    break;
  }
}

if (!position) {
  position = { line: -1, char: -1 };
}

while (isValidCoordinate(position)) {
  setCharacter(position, "X");
  while (getCharacter(addCoordinates(position, direction)) === "#") {
    direction = turn(direction);
  }
  position = addCoordinates(position, direction);
}

let visited = 0;
for (let line = 0; line < length; line++) {
  for (let char = 0; char < width; char++) {
    if (getCharacter({ line, char }) === "X") {
      visited++;
    }
  }
}

//console.log(lines.map((s) => s.join('')).join('\n'))
console.log(visited);
