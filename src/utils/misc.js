export const reverseArray = actualArray => {
  let reversedArray = [];
  for (let i = actualArray.length - 1; i >= 0; i--) {
    reversedArray.push(actualArray[i]);
  }
  return reversedArray;
};
