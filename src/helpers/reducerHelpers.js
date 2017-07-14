import {
  curry,
  map,
  reduce,
  assoc,
  keys,
  split,
  compose,
  join,
  juxt,
  toUpper,
  toLower,
  head,
  tail,
  over,
  lens,
  prop,
  concat,
  take,
  splitAt,
  last
} from 'ramda'

export const updateObjectValue = curry((id, attr, value, state) => {
  return {
    ...state,
    [id]: {
      ...state[id],
      [attr]: value
    }
  }
})

export const toggleObjectValue = curry((id, attr, state) => {
  return {
    ...state,
    [id]: {
      ...state[id],
      [attr]: !state[id][attr]
    }
  }
})

export const mapObjsToIds = (objs, ids) => ids.map(id => objs[id])

export const renameKeys = curry((keysMap, obj) =>
  reduce((acc, key) => assoc(keysMap[key] || key, obj[key], acc), {}, keys(obj))
)

const capitalizeWord = compose(
  join(''),
  juxt([compose(toUpper, head), compose(toLower, tail)])
)

export const captializeTitle = compose(
  join(' '),
  map(capitalizeWord),
  split(' ')
)

export const setToCapitalize = attr =>
  over(lens(prop(attr), assoc(attr)), captializeTitle)

export const takeEmailDomain = compose(concat('@'), last, split('@'))
export const takeEmailAddress = compose(head, split('@'))
const makeSecret = map(() => '*')
const firstTwo = take(2)
export const secretAfterTwo = compose(join(''), makeSecret, last, splitAt(2))
export const obfuscatedWord = str => concat(firstTwo(str), secretAfterTwo(str))
export const secretEmail = email =>
  concat(
    compose(obfuscatedWord, takeEmailAddress)(email),
    takeEmailDomain(email)
  )
