const { calculator } = require('../src/calculator');

describe('Calculator', () => {
  describe('add', () => {
    test('should add two positive numbers', () => {
      expect(calculator.add(2, 3)).toBe(5);
    });

    test('should add positive and negative numbers', () => {
      expect(calculator.add(5, -3)).toBe(2);
    });

    test('should add two negative numbers', () => {
      expect(calculator.add(-2, -3)).toBe(-5);
    });

    test('should throw error for non-numeric input', () => {
      expect(() => calculator.add('2', 3)).toThrow('Both arguments must be numbers');
      expect(() => calculator.add(2, '3')).toThrow('Both arguments must be numbers');
    });
  });

  describe('subtract', () => {
    test('should subtract two numbers', () => {
      expect(calculator.subtract(5, 3)).toBe(2);
    });

    test('should handle negative results', () => {
      expect(calculator.subtract(3, 5)).toBe(-2);
    });

    test('should throw error for non-numeric input', () => {
      expect(() => calculator.subtract('5', 3)).toThrow('Both arguments must be numbers');
    });
  });

  describe('multiply', () => {
    test('should multiply two numbers', () => {
      expect(calculator.multiply(4, 3)).toBe(12);
    });

    test('should handle zero multiplication', () => {
      expect(calculator.multiply(5, 0)).toBe(0);
    });

    test('should multiply negative numbers', () => {
      expect(calculator.multiply(-2, -3)).toBe(6);
      expect(calculator.multiply(-2, 3)).toBe(-6);
    });
  });

  describe('divide', () => {
    test('should divide two numbers', () => {
      expect(calculator.divide(10, 2)).toBe(5);
    });

    test('should handle decimal results', () => {
      expect(calculator.divide(10, 3)).toBeCloseTo(3.333);
    });

    test('should throw error for division by zero', () => {
      expect(() => calculator.divide(10, 0)).toThrow('Division by zero is not allowed');
    });

    test('should throw error for non-numeric input', () => {
      expect(() => calculator.divide('10', 2)).toThrow('Both arguments must be numbers');
    });
  });
});