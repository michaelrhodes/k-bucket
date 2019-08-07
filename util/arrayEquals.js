/**
 * @param  {Uint8Array} array1
 * @param  {Uint8Array} array2
 * @return {Boolean}
 */
function arrayEquals (array1, array2) {
  if (array1 === array2) {
    return true
  }
  if (array1.length !== array2.length) {
    return false
  }
  for (let i = 0, length = array1.length; i < length; ++i) {
    if (array1[i] !== array2[i]) {
      return false
    }
  }
  return true
}

module.exports = arrayEquals
