import { findPassword, getRotationsFromInput } from '../src/01'

describe('test_01', () => {
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
    it('should return 0 if rotations move around 0 but never hit 0', () => {
        const input = `\
            R1
            L2
            R3
        `.replace(/^[ \t]+/gm, '')
        const rotations = getRotationsFromInput(input)
        const password = findPassword(0, rotations)
        expect(password).toBe(0)
    })
    it('should return 1 if rotations hit 0 exactly once', () => {
        const input = `\
            R50
        `.replace(/^[ \t]+/gm, '')
        const rotations = getRotationsFromInput(input)
        const password = findPassword(50, rotations)
        expect(password).toBe(1)
    })
    it('should return the correct password with hundreds-place magnitude', () => {
        const input = `\
            R999
            L1
            R2
            R300
            L500
            R2
            L404
            R202
        `.replace(/^[ \t]+/gm, '')
        const rotations = getRotationsFromInput(input)
        const password = findPassword(0, rotations)
        expect(password).toBe(4)
    })
})