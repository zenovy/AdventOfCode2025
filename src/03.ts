import fs = require('fs')
import path = require('path')

function getBanksFromInput(input: string): number[][] {
    const banks = input.split('\n')
    banks.pop()
    return banks.map(bankStr => {
        const result = []
        for (let i = 0; i < bankStr.length; i++) {
            result.push(parseInt(bankStr[i]))
        }
        return result
    })
}

function calculateLargestJoltagePair(bank: number[]): number {
    if (bank.length == 2) {
        return bank[0] * 10 + bank[1]
    }
    const pair = [bank[0]]
    for (let i = 1; i < bank.length; i++) {
        if (bank[i] > pair[0] && i < bank.length - 1) {
            pair[0] = bank[i]
            if (pair.length > 1) {
                pair.pop()
            }
        } else if (pair.length < 2 || pair[1] < bank[i]) {
            pair[1] = bank[i]
        }
    }
    return pair[0] * 10 + pair[1]
}

function main() {
    const input = fs.readFileSync(path.join(__dirname, '03_input.txt'), 'utf8')
    const banks = getBanksFromInput(input)
    const largestJoltages = banks.map(bank => {
        const largestPair = calculateLargestJoltagePair(bank)
        console.log(bank)
        console.log(largestPair)
        return largestPair
    })
    const result = largestJoltages.reduce((acc, id) => acc + id, 0)
    console.log(result)
}

if (require.main === module) {
    main()
}

export { getBanksFromInput, calculateLargestJoltagePair }