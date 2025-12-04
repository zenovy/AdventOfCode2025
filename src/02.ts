import fs = require('fs')
import path = require('path')

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

function findFactors(target: number): number[] {
    const factors: number[] = [1]
    for (let i = 2; i <= target / 2; i++) {
        if (target % i === 0) {
            factors.push(i)
        }
    }
    return factors
}

function findNumDigits(number: number): number {
    let power = 1
    while (10 ** power <= number) {
        power += 1
    }
    return power
}

function getNumbersRepeatedTwiceUntil(range: RRange): number[] {
    const number = range.start
    let limit = range.end

    const numDigits = findNumDigits(number)
    const numDigitsInLimit = findNumDigits(limit)
    if (numDigits % 2 !== 0) {
        if (numDigitsInLimit > numDigits) {
            return getNumbersRepeatedTwiceUntil({start: 10 ** numDigits, end: range.end})
        } else {
            return []
        }
    } 

    if (numDigits < numDigitsInLimit) {
        limit = 10 ** (numDigits) - 1
    }
    const halfPowerOf10 = 10 ** (numDigits / 2)
    
    const multiplier = 1 + halfPowerOf10
    let startPart = Math.floor(number / halfPowerOf10)
    if (startPart * multiplier < range.start) {
        startPart += 1
    }
    const results: number[] = []
    for (let part = startPart; part * multiplier <= limit; part++) {
        results.push(part * multiplier)
    }
    if (numDigits + 1 < numDigitsInLimit) {
        results.push(...getNumbersRepeatedTwiceUntil({start: 10 ** (numDigits + 1), end: range.end}))
    }
    return results
}

function getNumbersRepeatedUntil(range: RRange): Set<number> {
    const number = range.start
    let limit = range.end

    const numDigits = findNumDigits(number)
    const numDigitsInLimit = findNumDigits(limit)

    let results: Set<number> = new Set()
    if (numDigitsInLimit > numDigits) {
        const numbers = getNumbersRepeatedUntil({start: 10 ** numDigits, end: range.end})
        results = results.union(numbers)
        limit = 10 ** (numDigits) - 1
    }

    if (numDigits === 1) {
        return results
    }

    const factors = findFactors(findNumDigits(range.start))

    for (const factor of factors) {
        let multiplier = 1
        for (let i = factor; i < numDigits; i += factor) {
            multiplier += 10 ** i
        }
        let startPart = Math.floor(number / 10 ** (numDigits - factor))
        if (startPart * multiplier < range.start) {
            startPart += 1
        }
        for (let part = startPart; part * multiplier <= limit; part++) {
            results.add(part * multiplier)
        }
    }
    return results
}

function findInvalidIdsPart1(ranges: RRange[]): number[] {
    const results = []
    for (const range of ranges) {
        const result = getNumbersRepeatedTwiceUntil(range)
        results.push(...result)
    }
    return results
}

function findInvalidIdsPart2(ranges: RRange[]): number[] {
    let results: Set<number> = new Set()
    for (const range of ranges) {
        const result = getNumbersRepeatedUntil(range)
        console.log(range)
        console.log(result)
        results = results.union(result)
    }
    return Array.from(results)
}

function main() {
    const input = fs.readFileSync(path.join(__dirname, '02_input.txt'), 'utf8')
    const ranges = getRangesFromInput(input)
    const invalidIds = findInvalidIdsPart2(ranges)
    const result = invalidIds.reduce((acc, id) => acc + id, 0)
    console.log(result)
}

if (require.main === module) {
    main()
}

export { findFactors, findNumDigits, getNumbersRepeatedTwiceUntil, getNumbersRepeatedUntil, getRangesFromInput, findInvalidIdsPart1, findInvalidIdsPart2 }