import { stringify, stringifyBackward } from "./utils";

const testObj = {
  first: 4,
  second: 3,
  third: 2,
  fourth: 1
};

describe('test utils function', () => {
  it('should stringify return firstSecondThirdFourth', () => {
    expect(stringify(testObj)).toBe('firstSecondThirdFourth');
  });

  it('should stringifyBackward return firstSecondThirdFourth', () => {
    expect(stringifyBackward(testObj)).toBe('htruofDrihtDnocesTsrif');
  });
})
