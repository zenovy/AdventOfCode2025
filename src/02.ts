const fs = require('fs')
const path = require('path')

type RRange = {
    start: number
    end: number
}

function getRangesFromInput(input: string): RRange[] {
    const ranges = input.split(',')
    return ranges.map(range => {
        const [start, end] = range.split('-').map(Number)
        return { start, end }
    })
}

function findPrimeFactors(target: number): number[] {
    const primeFactors: number[] = []
    for (let i = 2; i <= target / 2; i++) {
        if (target % i === 0) {
            primeFactors.push(i)
        }
    }
    return primeFactors
}

function findPowerOf10LargerThanNumber(number: number): number {
    let power = 1
    while (10 ** power <= number) {
        power += 1
    }
    return power
}

function getRepeatedNumber(part: number, powerOf10: number, primeFactor: number): number {
    let result = 0
    for (let i = 0; i < powerOf10; i += primeFactor) {
        result += part * (10 ** i)
    }
    return result
}

function getRepeatingNumbers(range: RRange): number[] {
    const repeatingNumbers = []
    const leftPowerOf10 = findPowerOf10LargerThanNumber(range.start)
    const rightPowerOf10 = findPowerOf10LargerThanNumber(range.end)
    if (leftPowerOf10 === rightPowerOf10) {
        const primeFactors = findPrimeFactors(leftPowerOf10)
        primeFactors.forEach(primeFactor => {
            const lpart = Math.floor(range.start / (10 ** (leftPowerOf10 - primeFactor)))
            const rpart = Math.floor(range.end / (10 ** (rightPowerOf10 - primeFactor)))
            for (let part = lpart; part <= rpart; part++) {
                const repeatingNumber = getRepeatedNumber(part, leftPowerOf10, primeFactor)
                repeatingNumbers.push(repeatingNumber)
            }
        })
    }
    return repeatingNumbers
}

function findInvalidIds(ranges: RRange[]): number[] {
    return []
}

function main() {
    const input = fs.readFileSync(path.join(__dirname, '02_input.txt'), 'utf8')
    const ranges = getRangesFromInput(input)
    const invalidIds = findInvalidIds(ranges)
    const result = invalidIds.reduce((acc, id) => acc + id, 0)
    console.log(result)
}

if (require.main === module) {
    main()
}

export { findPrimeFactors, findPowerOf10LargerThanNumber, getRepeatedNumber, getRepeatingNumbers, findInvalidIds }