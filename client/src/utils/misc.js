/**
 * Generate hashCode from a string. Limited to positive values.
 * @param {String} str
 * @returns {Number}
 */
export const hashCode = str => {
  let hash = 0

  // istanbul ignore if
  if (str.length === 0) {
    return hash
  }

  for (let i = 0; i < str.length; i++) {
    let char = str.charCodeAt(i)

    hash = (hash << 5) - hash + char
    hash = hash & hash // Convert to 32bit integer
  }

  return Math.abs(hash)
}
