const test = require('ava')
const semver = require('semver')

const { FFClient } = require('../lib')

test('Solve behavior of correct semantic version', t => {
  const ffclient = new FFClient(1)
  const behavior1 = () => console.log(1)
  const behavior2 = () => console.log(2)
  const behavior3 = () => console.log(3)

  const rules = {
    "1.0.0": behavior1,
    "2.0.0": behavior2,
    "3.0.0": behavior3
  }

  const behavior = ffclient.solveVersion(rules, "2.1.0")
  t.is(behavior.name, 'behavior2')
})

test('Solve behavior of exact semantic version', t => {
  const ffclient = new FFClient(1)
  const behavior1 = () => console.log(1)
  const behavior2 = () => console.log(2)
  const behavior3 = () => console.log(3)

  const rules = {
    "1.0.0": behavior1,
    "2.0.0": behavior2,
    "3.0.0": behavior3
  }

  const behavior = ffclient.solveVersion(rules, "1.0.0")
  t.is(behavior.name, 'behavior1')
})

test('Solve behavior of first semantic version', t => {
  const ffclient = new FFClient(1)
  const behavior1 = () => console.log(1)
  const behavior2 = () => console.log(2)
  const behavior3 = () => console.log(3)

  const rules = {
    "1.0.0": behavior1,
    "2.0.0": behavior2,
    "3.0.0": behavior3
  }

  const behavior = ffclient.solveVersion(rules, "0.5.0")
  t.is(behavior.name, 'behavior1')
})

test('Solve behavior of last semantic version', t => {
  const ffclient = new FFClient(1)
  const behavior1 = () => console.log(1)
  const behavior2 = () => console.log(2)
  const behavior3 = () => console.log(3)

  const rules = {
    "1.0.0": behavior1,
    "2.0.0": behavior2,
    "3.0.0": behavior3
  }

  const behavior = ffclient.solveVersion(rules, "3.2.0")
  t.is(behavior.name, 'behavior3')
})
