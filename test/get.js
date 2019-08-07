'use strict'
var test = require('tape')
var u8a = require('../util/u8a')
var eq = require('../util/arrayEquals')
var KBucket = require('../')

test('throws TypeError if id is not a Uint8Array', function (t) {
  var kBucket = new KBucket()
  t.throws(function () {
    kBucket.get('foo')
  })
  t.end()
})

test('get retrieves null if no contacts', function (t) {
  var kBucket = new KBucket()
  t.same(kBucket.get(u8a('foo')), null)
  t.end()
})

test('get retrieves a contact that was added', function (t) {
  var kBucket = new KBucket()
  var contact = { id: u8a('a') }
  kBucket.add(contact)
  t.true(eq(kBucket.get(u8a('a')).id, u8a('a')))
  t.end()
})

test('get retrieves most recently added contact if same id', function (t) {
  var kBucket = new KBucket()
  var contact = { id: u8a('a'), foo: 'foo', bar: ':p', vectorClock: 0 }
  var contact2 = { id: u8a('a'), foo: 'bar', vectorClock: 1 }
  kBucket.add(contact)
  kBucket.add(contact2)
  t.true(eq(kBucket.get(u8a('a')).id, u8a('a')))
  t.same(kBucket.get(u8a('a')).foo, 'bar')
  t.same(kBucket.get(u8a('a')).bar, undefined)
  t.end()
})

test('get retrieves contact from nested leaf node', function (t) {
  var kBucket = new KBucket({localNodeId: u8a([ 0x00, 0x00 ])})
  for (var i = 0; i < kBucket.numberOfNodesPerKBucket; ++i) {
    kBucket.add({ id: u8a([ 0x80, i ]) }) // make sure all go into "far away" bucket
  }
  // cause a split to happen
  kBucket.add({ id: u8a([ 0x00, i ]), find: 'me' })
  t.same(kBucket.get(u8a([ 0x00, i ])).find, 'me')
  t.end()
})
