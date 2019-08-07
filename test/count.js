'use strict'
var test = require('tape')
var u8a = require('../util/u8a')
var KBucket = require('../')

test('count returns 0 when no contacts in bucket', function (t) {
  var kBucket = new KBucket()
  t.same(kBucket.count(), 0)
  t.end()
})

test('count returns 1 when 1 contact in bucket', function (t) {
  var kBucket = new KBucket()
  var contact = { id: u8a('a') }
  kBucket.add(contact)
  t.same(kBucket.count(), 1)
  t.end()
})

test('count returns 1 when same contact added to bucket twice', function (t) {
  var kBucket = new KBucket()
  var contact = { id: u8a('a') }
  kBucket.add(contact)
  kBucket.add(contact)
  t.same(kBucket.count(), 1)
  t.end()
})

test('count returns number of added unique contacts', function (t) {
  var kBucket = new KBucket()
  kBucket.add({ id: u8a('a') })
  kBucket.add({ id: u8a('a') })
  kBucket.add({ id: u8a('b') })
  kBucket.add({ id: u8a('b') })
  kBucket.add({ id: u8a('c') })
  kBucket.add({ id: u8a('d') })
  kBucket.add({ id: u8a('c') })
  kBucket.add({ id: u8a('d') })
  kBucket.add({ id: u8a('e') })
  kBucket.add({ id: u8a('f') })
  t.same(kBucket.count(), 6)
  t.end()
})
