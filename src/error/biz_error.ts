export default class BizError extends Error {
  constructor(public readonly code: number, msg: string) {
    super(msg)
  }
}