const fs = require('fs')
const path = require('path')

type Rotation = {
    direction: 'left' | 'right'
    magnitude: number
}

function getRotationsFromInput(input: string): Rotation[] {
    const rotations = input.split('\n')
    rotations.pop() // remove the last empty line
    return rotations.map(rotation => {
        if (rotation[0] !== 'L' && rotation[0] !== 'R') {
            throw new Error('Invalid rotation: ' + rotation)
        }
        const direction = rotation[0] === 'L' ? 'left' : 'right'
        // Optimization: Skip any digits besides the last two, since 100s will cause a full rotation
        const digits = rotation.length > 2 ? rotation.slice(-2) : rotation.slice(-1)
        const magnitude = parseInt(digits)
        return { direction, magnitude }
    })
}

function findPassword(startPosition: number, rotations: Rotation[]): number {
    let currentPosition = startPosition
    let password = 0
    for (const rotation of rotations) {
        if (rotation.direction === 'left') {
            currentPosition -= rotation.magnitude
            if (currentPosition < 0) {
                currentPosition = 100 + currentPosition
            }
        } else {
            currentPosition += rotation.magnitude
            if (currentPosition > 99) {
                currentPosition = currentPosition - 100
            }
        }
        if (currentPosition == 0) {
            password += 1
        }
    }
    return password
}

function main() {
    const input = fs.readFileSync(path.join(__dirname, '01_input.txt'), 'utf8')
    const rotations = getRotationsFromInput(input)
    const password = findPassword(50, rotations)
    console.log(password)
}

if (require.main === module) {
    main()
}

export { findPassword, getRotationsFromInput }
