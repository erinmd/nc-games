import { formatCategoryName } from "../utils";

describe('formatCategoryName', () => {
    test('it swaps dashes for spaces', () => {
        expect(formatCategoryName('Hidden-roles')).toBe('Hidden roles')
    })
    test('it capitalizes the first letter', () => {
        expect(formatCategoryName('hidden-roles')).toBe('Hidden roles')
    })
})