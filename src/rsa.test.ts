import {decrypt, encrypt, gcd, getPublicKey, generateKeys, extendedGCD, getPrimaryKey} from "./rsa";

describe('test rsa algorithm', () => {
  it('m and m2 should be same', () => {
    const { e, d, n } = generateKeys();
    const m = 247;
    const c = encrypt(m, e, n);
    const m2 = decrypt(c, d, n);

    expect(m2).toBe(m);
  });

  it('error case', () => {
  });

  it ('should generate gcd properly', () => {
    expect(gcd(12, 24)).toBe(12);
    expect(gcd(26, 39)).toBe(13);
    expect(gcd(5, 24)).toBe(1);
  });

  it ('should generate linear combination properly', () => {
    expect(extendedGCD(0, 0)).toEqual({
      value: 0,
      s: 0,
      t: 0
    });

    expect(extendedGCD(0, 12)).toEqual({
      value: 12,
      s: 0,
      t: 1
    });

    expect(extendedGCD(12, 5)).toEqual({
      value: 1,
      s: -2,
      t: 5
    });
  });

  it ('generate public key properly', () => {
    const e = getPublicKey(71, 109);
    expect(gcd(e, 70 * 108)).toBe(1);
    expect(gcd(e, 71)).toBe(1);
    expect(gcd(e, 109)).toBe(1);
  });

  it ('generate primary key properly', () => {
    const e = getPublicKey(71, 109);
    const d = getPrimaryKey(e, 70 * 108);
    const linearCombination = extendedGCD(e, d);
    expect(linearCombination.value).toBe(1);
    expect(linearCombination.s * e + linearCombination.t * d).toBe(1);
  });
})
