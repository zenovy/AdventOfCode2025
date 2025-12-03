import { findPrimeFactors, findPowerOf10LargerThanNumber, getRepeatedNumber, getRepeatingNumbers } from '../src/02'

describe('test_02', () => {
    it('should find the prime factors of a number', () => {
        const primeFactors = findPrimeFactors(12)
        expect(primeFactors).toEqual([2, 3, 4, 6])
    })
    it('should find the power of 10 for 12 to be 2', () => {
        const powerOf10 = findPowerOf10LargerThanNumber(12)
        expect(powerOf10).toEqual(2)
    })
    it('should find the power of 10 for 100 to be 3', () => {
        const powerOf10 = findPowerOf10LargerThanNumber(100)
        expect(powerOf10).toEqual(3)
    })
    it('should find the repeating number for 123456 with prime factor 2 to be 121212', () => {
        const repeatingNumber = getRepeatedNumber(12, 6, 2)
        expect(repeatingNumber).toEqual(121212)
    })
    it('should find the repeating number for 123456 with prime factor 3 to be 123123', () => {
        const repeatingNumber = getRepeatedNumber(123, 6, 3)
        expect(repeatingNumber).toEqual(123123)
    })
    it('should get repeating numbers 1', () => {
        const repeatingNumbers = getRepeatingNumbers({start: 1000, end: 1121})
        expect(repeatingNumbers).toEqual([1010, 1111])
    })
    it('should get repeating numbers 2', () => {
        const repeatingNumbers = getRepeatingNumbers({start: 1919, end: 2223})
        expect(repeatingNumbers).toEqual([1919, 2020, 2121, 2222])
    })
    it('should get repeating numbers 3', () => {
        const repeatingNumbers = getRepeatingNumbers({start: 191100, end: 193194})
        expect(repeatingNumbers).toEqual([191919, 191191, 192192, 193193])
    })
})
