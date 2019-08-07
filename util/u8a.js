module.exports = from

function from (str) {
  if (typeof str !== 'string') {
    return Uint8Array.from(str)
  }

  var l = str.length
  var u8a = new Uint8Array(l)
  for (var i = 0; i < l; i++) {
    u8a[i] = str.charCodeAt(i)
  }
  return u8a
}
