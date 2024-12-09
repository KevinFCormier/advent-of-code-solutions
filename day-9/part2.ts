export {};
const text = await Deno.readTextFile("input.txt");
const charArray = Array.from(text);
type BlockSpan = {
    data: boolean;
    id: number;
    size: number;
};
const defragged: BlockSpan[] = [];

for (let i = 0; i < charArray.length; i++) {
    defragged.push({
        data: i % 2 === 0,
        id: i / 2,
        size: Number(charArray[i]),
    });
}

function printMap() {
    const map: string[] = [];
    defragged.forEach((span) => {
        if (span.data) {
            map.push(...Array(span.size).fill(span.id));
        } else {
            map.push(...Array(span.size).fill("."));
        }
    });

    console.log(map.join(""));
}

const dataSpans = defragged.filter((d) => d.data);
let data = dataSpans.pop();

do {
    if (data) {
        const dataIndex = defragged.indexOf(data);
        if (dataIndex > 0) {
            const freeIndex = defragged.findIndex((d) =>
                !d.data && d.size >= data!.size
            );
            if (freeIndex > 0 && freeIndex < dataIndex) {
                const freeSpan = defragged[freeIndex];
                freeSpan.size -= data.size;
                defragged.splice(dataIndex, 1, {
                    data: false,
                    id: 0,
                    size: data.size,
                });
                defragged.splice(freeIndex, 0, data);
                //printMap();
            }
        }
        data = dataSpans.pop();
    }
} while (data);

let checksum = 0;
let index = 0;
defragged.forEach((span) => {
    if (span.data) {
        const startIndex = index;
        do {
            checksum += index * span.id;
            index++;
        } while (index - startIndex < span.size);
    } else {
        index += span.size;
    }
});

console.log(checksum);
