function EQUALS(a: string, b: string) {
  return a === b;
}

function CONTAINS(a: string, b: string) {
  return a.includes(b);
}

export const Filter = {
  EQUALS,
  CONTAINS,
};
