import { Finder } from '../models/Finder'

export class MissingInputError extends Error {
  constructor(missingInput: string) {
    super(`Value for ${missingInput} missing`)
  }
}

export const validateApiBodyInput = (args: any) => {
  if ((args as Finder).id == undefined) {
    throw new MissingInputError('id')
  }
  if ((args as Finder).message == undefined) {
    throw new MissingInputError('message')
  }
  // switch (args) {
  //   case !args.id:
  //     throw new MissingInputError('id')
  //   case !(args as Finder).message:
  //     throw new MissingInputError('message')
  //   default:
  //     throw new MissingInputError('hello')
  // }
}
