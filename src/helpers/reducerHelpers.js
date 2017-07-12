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
  prop
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
