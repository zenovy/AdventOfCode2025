const fs = require('fs')
const path = require('path')

type Rotation = {
    direction: 'left' | 'right'
    fullRotations: number
    remainder: number
}

function getRotationsFromInput(input: string): Rotation[] {
    const rotations = input.split('\n')
    rotations.pop() // remove the last empty line
    return rotations.map(rotation => {
        if (rotation[0] !== 'L' && rotation[0] !== 'R') {
            throw new Error('Invalid rotation: ' + rotation)
        }
        const direction = rotation[0] === 'L' ? 'left' : 'right'
        // Extract full rotations and remainder from the rotation string
        if (rotation.length > 3) {
            const fullRotations = parseInt(rotation.slice(1, -2))
            const remainder = parseInt(rotation.slice(-2))
            return { direction, fullRotations, remainder }
        } else {
            const remainder = parseInt(rotation.slice(1))
            return { direction, fullRotations: 0, remainder }
        }
    })
}

function findPassword(startPosition: number, rotations: Rotation[]): number {
    let currentPosition = startPosition
    let password = 0
    for (const rotation of rotations) {
        const lastPosition = currentPosition
        if (rotation.direction === 'left') {
            currentPosition -= rotation.remainder
            if (currentPosition < 0) {
                currentPosition = 100 + currentPosition
                if (lastPosition !== 0) {
                    password += 1
                }
            }
        } else {
            currentPosition += rotation.remainder
            if (currentPosition > 99) {
                currentPosition = currentPosition - 100
                if (currentPosition > 0) {
                    password += 1
                }
            }
        }
        if (currentPosition == 0) {
            password += 1
        }
        password += rotation.fullRotations
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