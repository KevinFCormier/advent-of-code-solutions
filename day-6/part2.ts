export {};
let lines: string[][] = [];

async function restoreInput() {
  const text = await Deno.readTextFile("input.txt");
  lines = text.split("\n").map((s) => Array.from(s));
}

await restoreInput();

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

let position: Coordinate | undefined = undefined;
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
const startingPosition = position;
const MAX_MOVES = 30000;

async function obstacleCreatesLoop() {
  let direction = up;
  let position = startingPosition;
  let moves = 0;

  while (isValidCoordinate(position) && moves < MAX_MOVES) {
    while (
      getCharacter(addCoordinates(position, direction)) === "#" &&
      moves < MAX_MOVES
    ) {
      direction = turn(direction);
      moves++;
    }
    position = addCoordinates(position, direction);
    moves++;
  }
  return moves >= MAX_MOVES;
}

let obstaclePlacements = 0;
for (let line = 0; line < length; line++) {
  for (let char = 0; char < width; char++) {
    const position = { line, char };
    const character = getCharacter(position);
    if (character !== "^" && character !== "#") {
      setCharacter(position, "#");
      if (await obstacleCreatesLoop()) {
        obstaclePlacements++;
      }
      await restoreInput();
    }
  }
}

console.log(obstaclePlacements);
