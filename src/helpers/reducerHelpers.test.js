/* eslint-env jest */

import {
  toggleObjectValue,
  updateTempAttrValue,
  takeEmailDomain,
  takeEmailAddress,
  secretAfterTwo,
  obfuscatedWord,
  secretEmail,
  replaceImages,
  tempOrRealAttrIs
} from './reducerHelpers'

describe('toggleObjectValue', () => {
  test('it only toggles the attr given', () => {
    const currState = {
      id1: {
        a: true,
        b: 'b',
        c: {
          a: 'a'
        }
      },
      id2: {
        d: 'd'
      }
    }
    const finalState = {
      id1: {
        a: false,
        b: 'b',
        c: {
          a: 'a'
        }
      },
      id2: {
        d: 'd'
      }
    }

    expect(toggleObjectValue('id1', 'a', currState)).toEqual(finalState)
  })
})

describe('updateTempAttrValue', () => {
  test('updates value of given key in tempAttrs nested object', () => {
    const initialState = {
      id1: {
        a: true,
        b: 'b',
        tempAttrs: {
          c: 'c',
          d: 'd'
        }
      },
      id2: {
        e: 'e',
        tempAttrs: {
          f: 'f'
        }
      }
    }

    const finalState = {
      id1: {
        a: true,
        b: 'b',
        tempAttrs: {
          c: 'z',
          d: 'd'
        }
      },
      id2: {
        e: 'e',
        tempAttrs: {
          f: 'f'
        }
      }
    }

    expect(updateTempAttrValue('id1', 'c', 'z', initialState)).toEqual(
      finalState
    )
  })
})

describe('tempOrRealAttrIs', () => {
  test('returns temp value equality if temp value set', () => {
    const state = {
      a: 'a',
      tempAttrs: {
        a: 'b'
      }
    }

    expect(tempOrRealAttrIs(state, 'a', 'b')).toBe(true)
    expect(tempOrRealAttrIs(state, 'a', 'a')).toBe(false)
  })

  test('returns real value equality if temp value not set', () => {
    const state = {
      a: 'a'
    }

    expect(tempOrRealAttrIs(state, 'a', 'a')).toBe(true)
    expect(tempOrRealAttrIs(state, 'a', 'b')).toBe(false)
  })
})

test('gets domain portion of email address', () => {
  expect(takeEmailDomain('john@gmail.com')).toBe('@gmail.com')
})

test('gets address portion of email address', () => {
  expect(takeEmailAddress('john@gmail.com')).toBe('john')
})

test('drops first three makes remaining *', () => {
  expect(secretAfterTwo('john')).toBe('**')
  expect(secretAfterTwo('jo')).toBe('')
})

test('makes all letters but first two *', () => {
  expect(obfuscatedWord('john')).toBe('jo**')
  expect(obfuscatedWord('johnny')).toBe('jo****')
  expect(obfuscatedWord('jo')).toBe('jo')
})

test('hide after first three letters of email', () => {
  expect(secretEmail('john@gmail.com')).toBe('jo**@gmail.com')
  expect(secretEmail('johnny@yahoo.com')).toBe('jo****@yahoo.com')
  expect(secretEmail('jo@jo.com')).toBe('jo@jo.com')
})

test('replace image dimensions', () => {
  expect(replaceImages('/something/else/80x53.jpeg')).toBe(
    '/something/else/540x360.jpeg'
  )
})
