export const compareObjects = (key, order = 'asc') => {
  return function innerSort(firstObject, secondObject) {
    if (!firstObject.hasOwnProperty(key) || !secondObject.hasOwnProperty(key)) {
      return 0;
    }

    const firstValue = typeof firstObject[key] === 'string'
      ? firstObject[key].toUpperCase()
      : firstObject[key];

    const secondValue = typeof secondObject[key] === 'string'
      ? secondObject[key].toUpperCase()
      : secondObject[key];

    let comparison = 0;
    if (firstValue > secondValue) {
      comparison = 1;
    } else if (firstValue < secondValue) {
      comparison = -1;
    }

    return order === 'desc' ? comparison * -1 : comparison;
  };
};
