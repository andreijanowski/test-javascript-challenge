import { stringify, stringifyBackward } from "./utils";
import { decrypt, encrypt, generateKeys } from "./rsa";

const showTestResult = () => {
  const testObj = {
    first: 4,
    second: 3,
    third: 2,
    fourth: 1
  };

  // Sub task 1
  console.log('stringify', stringify(testObj));
  // Sub task 2
  console.log('stringify backward', stringifyBackward(testObj));

  // Sub task 4
  const { e, d, n } = generateKeys();

  const m = 8000;
  const c = encrypt(m, e, n);
  const m2 = decrypt(c, d, n);

  console.log('decrypt result:', m2)
}

showTestResult();
