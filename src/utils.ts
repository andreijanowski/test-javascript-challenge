export const stringify = (obj: object) => {
  return Object.keys(obj)
    .map((key: string, index: number) => index > 0 ? key.charAt(0).toUpperCase() + key.slice(1) : key).join('');
}

export const stringifyBackward = (obj: object) => {
  return Object.keys(obj)
    .reverse()
    .map((key: string) => key.split('').reverse().join(''))
    .map((key: string, index: number) => index > 0 ? key.charAt(0).toUpperCase() + key.slice(1) : key)
    .join('');
}
