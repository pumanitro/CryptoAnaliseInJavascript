import _ from "lodash";

export const replaceOrAddAtEnd = (array, predicate, newElement) => {
  const indexOfNewElement = _.findIndex(array, predicate);

  if (indexOfNewElement === -1) {
    return [...array, newElement];
  } else {
    array[indexOfNewElement] = newElement;
    return [...array];
  }
};
