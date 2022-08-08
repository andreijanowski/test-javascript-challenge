export type Either<L,R> = Left<L> | Right<R>

export class Left<L> {
  constructor(private readonly value: L) {}
  public getValue() {
    return this.value
  }
}

export class Right<R> {
  constructor(private readonly value: R) {}
  public getValue() {
    return this.value
  }
}

export function caseOf<L, R>(value: Either<L, R>, block: { left: (x: L) => any, right: (x: R) => any }) {
  const { left, right } = block
  const unwrappedValue = value.getValue()

  if (value instanceof Left) return left(unwrappedValue as L)
  else if (value instanceof Right) return right(unwrappedValue as R)

  throw new Error('Invalid value type: ${typeof value}')
}