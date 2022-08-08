export const gcd = (a: number, b: number): number => {
  let r;

  while (b > 0) {
    r = a % b;
    a = b;
    b = r;
  }
  return a;
}

export const getPublicKey = (p: number, q: number): number => {
  const n = p * q;
  const phi = (p - 1) * (q - 1);
  let e = Math.min(p, q);

  while (gcd(e, phi) !== 1 || gcd(e, n) !== 1) {
    e += 2;
  }

  return e;
}

interface LinearCombination {
  value: number;
  s: number;
  t: number;
}

export const extendedGCDRec = (x: LinearCombination, y: LinearCombination): LinearCombination => {
  if (y.value == 0) {
    return x;
  }

  let q = Math.floor(x.value / y.value);
  let s = x.s - q * y.s;
  let t = x.t - q * y.t;

  return extendedGCDRec(y, {
    value: x.value - q * y.value,
    s,
    t
  });
}

export const extendedGCD = (a: number, b: number): LinearCombination => {
  if (a == 0 && b == 0) {
    return {
      value: 0,
      s: 0,
      t: 0
    };
  }

  if (a == 0) {
    return {
      value: b,
      s: 0,
      t: 1
    };
  }

  const x = {
    value: a,
    s: 1,
    t: 0
  }
  const y = {
    value: b,
    s: 0,
    t: 1
  }

  return extendedGCDRec(x, y);
}

export const getPrimaryKey = (e: number, phi: number) => {
  let d = extendedGCD(e, phi).s;

  while (d < 1) {
    d += phi;
  }

  return d;
}

export const generateKeys = () => {
  const p = 71;
  const q = 109;

  const n = p * q;
  const phi = (p - 1) * (q - 1);

  const e = getPublicKey(p, q);
  const d = getPrimaryKey(e, phi);

  return { e, d, n };
}

export const encrypt = (m: number, e: number, n: number) => {
  if (gcd(m, n) !== 1) {
    throw new Error("Should gcd(m, n) = 1 to meet RSA requirements.");
  }

  let c = 1;
  for (let i = 0; i < e; i ++) {
    c = (c * m) % n;
  }

  return c;
}

export const decrypt = (c: number, d: number, n: number) => {
  let m = 1;

  for (let i = 0; i < d; i ++) {
    m = (c * m) % n;
  }
  return m;
}
