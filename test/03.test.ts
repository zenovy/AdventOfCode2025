
import { getBanksFromInput, calculateLargestJoltagePair } from '../src/03'

describe('test_02', () => {
    it('should parse the bank input into arrays', () => {
        const input = `\
        234234234234278
        111111111111111
        `.replace(/^[ \t]+/gm, '')
        const result = getBanksFromInput(input)
        expect(result).toEqual([[2,3,4,2,3,4,2,3,4,2,3,4,2,7,8],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]])
    })
    it('should pass the test input', () => {
        const input = `\
        987654321111111
        811111111111119
        234234234234278
        818181911112111
        `.replace(/^[ \t]+/gm, '')
        const banks = getBanksFromInput(input)
        const expected = [
            98,
            89,
            78,
            92
        ]
        const largestJoltagePairs = banks.map((bank) => calculateLargestJoltagePair(bank))
        for (let i = 0; i < banks.length; i++) {
            const result = largestJoltagePairs[i]
            expect(result).toBe(expected[i])
        }
        const result = largestJoltagePairs.reduce((acc, id) => acc + id, 0)
        expect(result).toEqual(357)
    })
})