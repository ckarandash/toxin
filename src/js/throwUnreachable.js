class UnreachableError extends Error {}

function throwUnreachable(message = 'Mustn\'t get here') {
  throw new UnreachableError(message);
}

export default throwUnreachable;
