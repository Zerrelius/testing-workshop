import { expect, test, describe } from 'vitest';
import { validateScore } from '../src/validateScore';

describe('validateScore', () => {

    // Basisvalidierung

    test('valid score', () => {
        const result = validateScore(80);
        expect(result.valid).toBe(true);
        expect(result.passed).toBe(true);
        expect(result.grade).toBe('B');
    });

    test('invalid score', () => {
        const result = validateScore(101);
        expect(result.valid).toBe(false);
        expect(result.errors).toContain('Score muss zwischen 0 und 100 liegen');
    });

    test('missing score', () => {
        const result = validateScore();
        expect(result.valid).toBe(false);
        expect(result.errors).toContain('Score ist erforderlich');
    });

    test('negativ score', () => {
        const result = validateScore(-10);
        expect(result.valid).toBe(false);
        expect(result.errors).toContain('Score muss zwischen 0 und 100 liegen');
    });

    test('invalid type', () => {
        const result = validateScore('80');
        expect(result.valid).toBe(false);
        expect(result.errors).toContain('Score muss eine Zahl sein');
    });
});

describe('Strict Mode', () => {

    // Strict Mode
    
    test('strict mode', () => {
        const result = validateScore(80, {strictMode: true});
        expect(result.valid).toBe(true);
    });
    
    test('strict mode invalid', () => {
        const result = validateScore(80.5, { strictMode: true });
        expect(result.valid).toBe(false);
        expect(result.errors).toContain('Score muss eine ganze Zahl sein');
    });
    
    test('strict mode invalid 2', () => {
        const result = validateScore(NaN, {strictMode: true});
        expect(result.valid).toBe(false);
        expect(result.errors).toContain('Score muss eine gültige Zahl sein');
    });
    
    test('strict mode invalid 3', () => {
        const result = validateScore(Infinity, { strictMode: true });
        expect(result.valid).toBe(false);
        expect(result.errors).length > 0;
    });
    
    test('strict mode invalid 4', () => {
        const result = validateScore('80', { strictMode: true});
        expect(result.valid).toBe(false);
        expect(result.errors).toContain('Score muss eine Zahl sein');
    });
});

describe('Bonus-Points', () => {

    // Bonuspunkte

    test('bonus points', () => {
        const result = validateScore(90, {bonusCategories: ['Bonus 1', 'Bonus 2']});
        expect(result.score).toBe(94);
    });
    
    test('bonus points 2', () => {
        const result = validateScore(100, {bonusCategories: ['Bonus 1', 'Bonus 2', 'Bonus 3', 'Bonus 4', 'Bonus 5', 'Bonus 6', 'Bonus 7', 'Bonus 8', 'Bonus 9', 'Bonus 10']});
        expect(result.score).toBe(100);
    });

    test('bonus points 3', () => {
        const result = validateScore(90, {bonusCategories: ['Bonus 1', 'Bonus 2', 'Bonus 3', 'Bonus 4', 'Bonus 5', 'Bonus 6', 'Bonus 7', 'Bonus 8', 'Bonus 9', 'Bonus 10', 'Bonus 11']});
        expect(result.score).toBe(100);
    });
});

describe('Bestandsprüfung', () => {

    // Bestandsprüfung

    test('bestandsprüfnung pass', () => {
        const result = validateScore(100, ['Bonus 1', 'Bonus 2', 'Bonus 3', 'Bonus 4', 'Bonus 5', 'Bonus 6', 'Bonus 7', 'Bonus 8', 'Bonus 9', 'Bonus 10', 'Bonus 11']);
        expect(result.passed).toBe(true);
    });

    test('bestandsprüfnung fail', () => {
        const result = validateScore(50, ['Bonus 1', 'Bonus 2', 'Bonus 3', 'Bonus 4', 'Bonus 5', 'Bonus 6', 'Bonus 7', 'Bonus 8', 'Bonus 9', 'Bonus 10', 'Bonus 11']);
        expect(result.passed).toBe(false);
    });
});

describe('Notenberechnung', () => {

    // Notenberechnung

    test('grade A', () => {
        const result = validateScore(90);
        expect(result.grade).toBe('A');
    });

    test('grade B', () => {
        const result = validateScore(80);
        expect(result.grade).toBe('B');
    });

    test('grade C', () => {
        const result = validateScore(70);
        expect(result.grade).toBe('C');
    });

    test('grade D', () => {
        const result = validateScore(60);
        expect(result.grade).toBe('D');
    });

    test('grade F', () => {
        const result = validateScore(50);
        expect(result.grade).toBe('F');
    });

    test('grade F', () => {
        const result = validateScore(0);
        expect(result.grade).toBe('F');
    });
});

describe('Edge Cases', () => {

    // Edge Cases

    test('edge case 1', () => {
        const result = validateScore(0);
        expect(result.valid).toBe(true);
        expect(result.passed).toBe(false);
        expect(result.grade).toBe('F');
    });

    test('edge case 2', () => {
        const result = validateScore(100);
        expect(result.valid).toBe(true);
        expect(result.passed).toBe(true);
        expect(result.grade).toBe('A');
    });

    test('edge case 3', () => {
        const result = validateScore(50);
        expect(result.valid).toBe(true);
        expect(result.passed).toBe(false);
        expect(result.grade).toBe('F');
    });

    test('edge case 4', () => {
        const result = validateScore(60);
        expect(result.valid).toBe(true);
        expect(result.passed).toBe(true);
        expect(result.grade).toBe('D');
    });

    test('edge case 5', () => {
        const result = validateScore(70);
        expect(result.valid).toBe(true);
        expect(result.passed).toBe(true);
        expect(result.grade).toBe('C');
    });

    test('edge case 6', () => {
        const result = validateScore(80);
        expect(result.valid).toBe(true);
        expect(result.passed).toBe(true);
        expect(result.grade).toBe('B');
    });

    test('edge case 7', () => {
        const result = validateScore(90);
        expect(result.valid).toBe(true);
        expect(result.passed).toBe(true);
        expect(result.grade).toBe('A');
    });

    test('edge case 8', () => {
        const result = validateScore(101);
        expect(result.valid).toBe(false);
        expect(result.errors).toContain('Score muss zwischen 0 und 100 liegen');
    });

    test('edge case 9', () => {
        const result = validateScore(-1);
        expect(result.valid).toBe(false);
        expect(result.errors).toContain('Score muss zwischen 0 und 100 liegen');
    });

    test('edge case 10', () => {
        const result = validateScore();
        expect(result.valid).toBe(false);
        expect(result.errors).toContain('Score ist erforderlich');
    });

    test('edge case 11', () => {
        const result = validateScore('80');
        expect(result.valid).toBe(false);
        expect(result.errors).toContain('Score muss eine Zahl sein');
    });

    test('edge case 12', () => {
        const result = validateScore(80.5, { strictMode: true });
        expect(result.valid).toBe(false);
        expect(result.errors).toContain('Score muss eine ganze Zahl sein');
    });

    test('edge case 13', () => {
        const result = validateScore(59.9999);
        expect(result.valid).toBe(true);
        expect(result.passed).toBe(false);
        expect(result.grade).toBe('F');
    });
    
});