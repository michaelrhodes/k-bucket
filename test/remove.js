'use strict'
var test = require('tape')
var u8a = require('../util/u8a')
var KBucket = require('../')

test('throws TypeError if contact.id is not a Uint8Array', function (t) {
  var kBucket = new KBucket()
  var contact = { id: 'foo' }
  t.throws(function () {
    kBucket.remove(contact.id)
  })
  t.end()
})

test('removing a contact should remove contact from nested buckets', function (t) {
  var kBucket = new KBucket({ localNodeId: u8a([ 0x00, 0x00 ]) })
  for (var i = 0; i < kBucket.numberOfNodesPerKBucket; ++i) {
    kBucket.add({ id: u8a([ 0x80, i ]) }) // make sure all go into "far away" bucket
  }
  // cause a split to happen
  kBucket.add({ id: u8a([ 0x00, i ]) })
  // console.log(require('util').inspect(kBucket, false, null))
  var contactToDelete = { id: u8a([ 0x80, 0x00 ]) }
  t.same(kBucket._indexOf(kBucket.root.right, contactToDelete.id), 0)
  kBucket.remove(u8a([ 0x80, 0x00 ]))
  t.same(kBucket._indexOf(kBucket.root.right, contactToDelete.id), -1)
  t.end()
})

test('should generate "removed"', function (t) {
  t.plan(1)
  var kBucket = new KBucket()
  var contact = { id: u8a('a') }
  kBucket.onremoved = function (removedContact) {
    t.same(removedContact, contact)
    t.end()
  }
  kBucket.add(contact)
  kBucket.remove(contact.id)
})

test('should generate event "removed" when removing from a split bucket', function (t) {
  t.plan(2)
  var kBucket = new KBucket({
    localNodeId: u8a('') // need non-random localNodeId for deterministic splits
  })
  for (var i = 0; i < kBucket.numberOfNodesPerKBucket + 1; ++i) {
    kBucket.add({ id: u8a('' + i) })
  }
  t.false(kBucket.bucket)
  var contact = { id: u8a('a') }
  kBucket.onremoved = function (removedContact) {
    t.same(removedContact, contact)
    t.end()
  }
  kBucket.add(contact)
  kBucket.remove(contact.id)
})
