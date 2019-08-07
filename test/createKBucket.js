'use strict'
var test = require('tape')
var u8a = require('../util/u8a')
var eq = require('../util/arrayEquals')
var KBucket = require('../')

test('localNodeId should be a random SHA-1 if not provided', function (t) {
  var kBucket = new KBucket()
  t.true(kBucket.localNodeId instanceof Uint8Array)
  t.same(kBucket.localNodeId.length, 20) // SHA-1 is 160 bits (20 bytes)
  t.end()
})

test('localNodeId is a Uint8Array populated from options if options.localNodeId Uint8Array is provided', function (t) {
  var localNodeId = u8a('some length')
  var kBucket = new KBucket({ localNodeId: localNodeId })
  t.true(kBucket.localNodeId instanceof Uint8Array)
  t.true(eq(kBucket.localNodeId, localNodeId))
  t.end()
})

test('throws exception if options.localNodeId is a String', function (t) {
  t.throws(function () {
    return new KBucket({ localNodeId: 'some identifier' })
  })
  t.end()
})

test('check root node', function (t) {
  var kBucket = new KBucket()
  t.same(kBucket.root, { contacts: [], dontSplit: false, left: null, right: null })
  t.end()
})
