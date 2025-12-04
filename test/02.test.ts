import { findFactors, findNumDigits, findInvalidIdsPart1, findInvalidIdsPart2, getRangesFromInput, getNumbersRepeatedTwiceUntil, getNumbersRepeatedUntil } from '../src/02'

describe('test_02', () => {
    it('should find the prime factors of a number', () => {
        const primeFactors = findFactors(12)
        expect(primeFactors).toEqual([1, 2, 3, 4, 6])
    })
    it('should find the power of 10 for 12 to be 2', () => {
        const powerOf10 = findNumDigits(12)
        expect(powerOf10).toEqual(2)
    })
    it('should find the power of 10 for 100 to be 3', () => {
        const powerOf10 = findNumDigits(100)
        expect(powerOf10).toEqual(3)
    })
    it('should get repeated numbers from 1000 to 1333', () => {
        const result = getNumbersRepeatedTwiceUntil({start: 1000, end: 1333})
        expect(result).toHaveLength(4)
        expect(result).toContain(1010)
        expect(result).toContain(1111)
        expect(result).toContain(1212)
        expect(result).toContain(1313)
    })
    it('should not get repeated numbers between 1001 and 1009', () => {
        const result = getNumbersRepeatedTwiceUntil({start: 1001, end: 1009})
        expect(result).toHaveLength(0)
    })
    it('should recursively find the repeated numbers in the next step up', () => {
        const result = getNumbersRepeatedTwiceUntil({start: 9871, end: 103418})
        expect(result).toHaveLength(6)
        expect(result).toContain(9898)
        expect(result).toContain(9999)
        expect(result).toContain(100100)
        expect(result).toContain(101101)
        expect(result).toContain(102102)
        expect(result).toContain(103103)
    })
    it('should not find numbers in a range between two numbers with the same odd number of digits', () => {
        const result = getNumbersRepeatedTwiceUntil({start: 11111, end: 99999})
        expect(result).toHaveLength(0)
    })
    it('should not add numbers lower than the bottom of the range', () => {
        const result = getNumbersRepeatedTwiceUntil({start: 1455, end: 1460})
        expect(result).toHaveLength(0)
    })
    it('should pass the example', () => {
        const input = `\
        11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124
        `
        const ranges = getRangesFromInput(input)
        const invalidIds = findInvalidIdsPart1(ranges)
        expect(invalidIds).toEqual([11, 22, 99, 1010, 1188511885, 222222, 446446, 38593859])
        const sum = invalidIds.reduce((acc, val) => acc + val, 0)
        expect(sum).toEqual(1227775554)
    })
    it('should get the repeated numbers with prime factors for a number with 6 digits', () => {
        const result = getNumbersRepeatedUntil({start: 120000, end: 124125})
        expect(result).toContain(121212)
        expect(result).toContain(120120)
        expect(result).toContain(121121)
        expect(result).toContain(122122)
        expect(result).toContain(123123)
        expect(result).toContain(124124)
        expect(result.size).toEqual(6)
    })
    it('should get repeated numbers across a range with multiple digits', () => {
        const result = getNumbersRepeatedUntil({start: 99999999, end: 100100100})
        expect(result).toContain(99999999)
        expect(result).toContain(100100100)
        expect(result.size).toEqual(2)
    })
    it('should not get multiple copies of the same digits', () => {
        const result = getNumbersRepeatedUntil({start: 99999999, end: 100000000})
        expect(result).toContain(99999999)
        expect(result.size).toEqual(1)
    })
    it('should pass the second part example', () => {
        const input = `\
        11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124
        `
        const ranges = getRangesFromInput(input)
        const invalidIds = findInvalidIdsPart2(ranges)
        const expectedResults = [11, 22, 99, 111, 999, 1010, 1188511885, 222222, 446446, 38593859, 565656, 824824824, 2121212121]
        for (const expectedResult of expectedResults) {
            expect(invalidIds).toContain(expectedResult)
        }
        expect(invalidIds).toHaveLength(expectedResults.length)
        const sum = invalidIds.reduce((acc, val) => acc + val, 0)
        expect(sum).toEqual(4174379265)
    })
    it('should work on very high digit counts', () => {
        const result = getNumbersRepeatedUntil({start: 100000000000, end: 100000100000})
        expect(result).toContain(100000100000)
        expect(result.size).toEqual(1)
    })
    it('should not count single-digit numbers', () => {
        const result = getNumbersRepeatedUntil({start: 1, end: 11})
        expect(result).toContain(11)
        expect(result.size).toEqual(1)
    })
})
