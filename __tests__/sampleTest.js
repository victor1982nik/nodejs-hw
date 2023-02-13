const addTwoNumbers = (a, b) => {
    return a + b;
};

describe("Addition service test", () => {
    it('Add two valid numbers', () => {       
        expect(addTwoNumbers(1, 1)).toEqual(1 + 1);
    });
    it('Add two valid numbers1', () => {       
        expect(addTwoNumbers(2, 2)).toEqual(2 + 2);
    });
});