export {};
const text = await Deno.readTextFile("input.txt");
const charArray = Array.from(text)
const defragged: string[] = []

for (let i = 0; i < charArray.length; i++) {
    const value = i % 2 === 0 ? String(i / 2) : '.'
    const count = Number(charArray[i])
    const expanded = Array(count).fill(value)
    defragged.push(...expanded)
}

let start = 0
while (start < defragged.length) {
    if (defragged[start] === '.') {
        let end = defragged.length - 1
        while (end > start) {
            if (defragged[end] !== '.') {
                defragged[start] = defragged[end]
                defragged[end] = '.'
                break;
            }
            end--
        }
    }
    start++
}

let checksum = 0
for (let i = 0; i < defragged.length && defragged[i] !== '.'; i++) {
    checksum += i * Number(defragged[i])
}

console.log(defragged.join(''))
console.log(checksum)

