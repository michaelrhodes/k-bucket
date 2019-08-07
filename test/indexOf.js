'use strict'
var test = require('tape')
var u8a = require('../util/u8a')
var KBucket = require('../')

test('indexOf returns a contact with id that contains the same byte sequence as the test contact', function (t) {
  var kBucket = new KBucket()
  kBucket.add({ id: u8a('a') })
  t.same(kBucket._indexOf(kBucket.root, u8a('a')), 0)
  t.end()
})

test('indexOf returns -1 if contact is not found', function (t) {
  var kBucket = new KBucket()
  kBucket.add({ id: u8a('a') })
  t.same(kBucket._indexOf(kBucket.root, u8a('b')), -1)
  t.end()
})
