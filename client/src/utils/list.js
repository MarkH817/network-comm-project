/**
 * @template T
 * @typedef {function(T, T): Number} Comparator
 */

/**
 * Add an item to the list in order
 * @template T
 * @param {Array<T>} list
 * @param {T} item
 * @param {Comparator} comparator
 * @returns {Array<T>}
 */
export const sortedInsertion = (list, item, comparator) =>
  [...list, item].sort(comparator)

// istanbul ignore next
/**
 * Returns a random element in the array
 * @template T
 * @param {Array<T>} list
 * @returns T
 */
export const randomEntry = list => list[Math.floor(Math.random() * list.length)]
