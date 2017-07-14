/* eslint-env jest */

import {
  takeEmailDomain,
  takeEmailAddress,
  secretAfterTwo,
  obfuscatedWord,
  secretEmail,
  replaceImages
} from './reducerHelpers'

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
