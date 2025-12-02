import { findPassword, getRotationsFromInput } from "../src/01_2"

describe('test_01_2', () => {
    it('should return 0 if rotations never hit 0', () => {
        const input = `\
            R1
            R2
            R3
            R50
        `.replace(/^[ \t]+/gm, '')
        const rotations = getRotationsFromInput(input)
        const password = findPassword(0, rotations)
        expect(password).toBe(0)
    })
    it('should return 5 if it rotates 5 times to the right', () => {
        const input = `\
            R500
        `.replace(/^[ \t]+/gm, '')
        const rotations = getRotationsFromInput(input)
        const password = findPassword(50, rotations)
        expect(password).toBe(5)
    })
    it('should return 5 if it rotates 5 times to the left', () => {
        const input = `\
            L500
        `.replace(/^[ \t]+/gm, '')
        const rotations = getRotationsFromInput(input)
        const password = findPassword(50, rotations)
        expect(password).toBe(5)
    })
    it('should handle rotating around 0', () => {
        const input = `\
            R1
            L2
            R3
        `.replace(/^[ \t]+/gm, '')
        const rotations = getRotationsFromInput(input)
        const password = findPassword(0, rotations)
        expect(password).toBe(2)
    })
    it('should not double count right rotations that hit 0', () => {
        const input = `\
            R50
            R50
        `.replace(/^[ \t]+/gm, '')
        const rotations = getRotationsFromInput(input)
        const password = findPassword(0, rotations)
        expect(password).toBe(1)
    })
    it('should not double count left rotations from 0', () => {
        const input = `\
            L50
            L50
        `.replace(/^[ \t]+/gm, '')
        const rotations = getRotationsFromInput(input)
        const password = findPassword(50, rotations)
        expect(password).toBe(1)
    })
    it('should match the test example', () => {
        const input = `\
            L68
            L30
            R48
            L5
            R60
            L55
            L1
            L99
            R14
            L82
        `.replace(/^[ \t]+/gm, '')
        const rotations = getRotationsFromInput(input)
        const password = findPassword(50, rotations)
        expect(password).toBe(6)
    })
})