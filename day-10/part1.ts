export {};
const text = await Deno.readTextFile("input.txt");
const lines = text.split("\n").map((s) => Array.from(s).map(Number));

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

function isValidCoordinate({ line, char }: Coordinate) {
  return line >= 0 && line < length && char >= 0 && char < width;
}

function getValue(coord: Coordinate) {
  if (!isValidCoordinate(coord)) {
    return undefined;
  }
  const { line, char } = coord;
  return lines[line][char];
}

function addCoordinates(
  { line: line1, char: char1 }: Coordinate,
  { line: line2, char: char2 }: Coordinate,
) {
  return { line: line1 + line2, char: char1 + char2 };
}

function getTrailDestinations(
  position: Coordinate,
  startValue: number,
  trail: string,
): Coordinate[] {
  if (getValue(position) !== startValue) {
    return [];
  } else if (startValue === 9) {
    return [position];
  }
  return directions.reduce<Coordinate[]>(
    (destinations, direction) => {
      const nextPosition = addCoordinates(position, direction);
      const { line: nextLine, char: nextChar } = nextPosition;
      const newDestinations = getTrailDestinations(
        addCoordinates(position, direction),
        startValue + 1,
        `${trail}, {${nextLine}, ${nextChar}}`,
      );
      return [
        ...destinations,
        ...newDestinations.filter(({ line: newLine, char: newChar }) =>
          !destinations.find(({ line, char }) =>
            line === newLine && char === newChar
          )
        ),
      ];
    },
    [],
  );
}

let sum = 0;
for (let line = 0; line < length; line++) {
  for (let char = 0; char < width; char++) {
    const position = { line, char };
    if (getValue(position) === 0) {
      const destinations = getTrailDestinations(
        position,
        0,
        `{${line}, ${char}}`,
      );
      sum += destinations.length;
    }
  }
}

console.log(sum);
