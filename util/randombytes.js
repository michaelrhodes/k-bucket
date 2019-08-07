module.exports = randomBytes

function randomBytes (n) {
  var u8a = new Uint8Array(n)
  this.crypto.getRandomValues(u8a)
  return u8a
}
