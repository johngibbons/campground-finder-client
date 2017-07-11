import { curry } from 'ramda'

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
