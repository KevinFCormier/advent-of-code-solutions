export {};

type MapCell = {
  value: string;
  id?: number;
  perimeter: number;
};

const text = await Deno.readTextFile("input.txt");
const lines = text.split("\n").map((s) =>
  Array.from(s).map((value) => ({ value, perimeter: 0 } as MapCell))
);

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

let region = 0;

function remapRegion(oldRegion: number, newRegion: number) {
  for (let line = 0; line < length; line++) {
    let mapCell: MapCell | undefined = undefined;
    for (let char = 0; char < width; char++) {
      mapCell = getValue({ line, char });
      if (mapCell) {
        if (mapCell.id === oldRegion) {
          mapCell.id = newRegion;
        } else if (!mapCell.id) {
          break;
        }
      }
    }
    if (mapCell && !mapCell.id) {
      break;
    }
  }
}

function computePerimeterAndRegions(location: Coordinate) {
  const mapCell = getValue(location);
  if (mapCell) {
    directions.forEach((direction) => {
      const otherCell = getValue(addCoordinates(location, direction));
      if (!otherCell || mapCell.value !== otherCell.value) {
        mapCell.perimeter++;
      } else if (otherCell.id && otherCell.id !== mapCell.id) {
        if (!mapCell.id) {
          mapCell.id = otherCell.id;
        } else {
          remapRegion(otherCell.id, mapCell.id);
        }
      } else {
        if (!mapCell.id) {
          region++;
          mapCell.id = region;
        }
        otherCell.id = mapCell.id;
      }
    });
    if (!mapCell.id) {
      region++;
      mapCell.id = region;
    }
  }
}

for (let line = 0; line < length; line++) {
  for (let char = 0; char < width; char++) {
    computePerimeterAndRegions({ line, char });
  }
}

lines.forEach((values) => console.log(values.map(({ id }) => id).join(", ")));

const regionTotals: {
  count: number;
  perimeter: number;
  sides: number;
}[] = [];

for (let line = 0; line < length; line++) {
  for (let char = 0; char < width; char++) {
    const mapCell = getValue({ line, char });
    if (mapCell) {
      const { id, perimeter } = mapCell;
      if (id) {
        if (!regionTotals[id]) {
          regionTotals[id] = { count: 0, perimeter: 0, sides: 0 };
        }
        regionTotals[id].count++;
        regionTotals[id].perimeter += perimeter;
      }
    }
  }
}

for (let line = 0; line <= length; line++) {
  let previousUpperRegion: number | undefined = undefined;
  let previousLowerRegion: number | undefined = undefined;
  for (let char = 0; char < width; char++) {
    const upperRegion = getValue({ line: line - 1, char })?.id;
    const lowerRegion = getValue({ line, char })?.id;
    if (upperRegion !== lowerRegion) {
      if (
        upperRegion &&
        (upperRegion !== previousUpperRegion ||
          upperRegion === previousLowerRegion)
      ) {
        regionTotals[upperRegion].sides++;
      }
      if (
        lowerRegion &&
        (lowerRegion !== previousLowerRegion ||
          lowerRegion === previousUpperRegion)
      ) {
        regionTotals[lowerRegion].sides++;
      }
    }
    previousUpperRegion = upperRegion;
    previousLowerRegion = lowerRegion;
  }
}

for (let char = 0; char <= width; char++) {
  let previousLeftRegion: number | undefined = undefined;
  let previousRightRegion: number | undefined = undefined;
  for (let line = 0; line < length; line++) {
    const leftRegion = getValue({ line, char: char - 1 })?.id;
    const rightRegion = getValue({ line, char })?.id;
    if (leftRegion !== rightRegion) {
      if (
        leftRegion &&
        (leftRegion !== previousLeftRegion ||
          leftRegion === previousRightRegion)
      ) {
        regionTotals[leftRegion].sides++;
      }
      if (
        rightRegion &&
        (rightRegion !== previousRightRegion ||
          rightRegion === previousLeftRegion)
      ) {
        regionTotals[rightRegion].sides++;
      }
    }
    previousLeftRegion = leftRegion;
    previousRightRegion = rightRegion;
  }
}

let fencesPrice = 0;
let id = 0;
while (id <= region) {
  const regionTotal = regionTotals[id];
  if (regionTotal) {
    const regionPrice = regionTotal.count * regionTotal.sides;
    console.log(
      `${id}: ${regionTotal.count} * ${regionTotal.sides} = ${regionPrice}`,
    );
    fencesPrice += regionPrice;
  }
  id++;
}

console.log(fencesPrice);
