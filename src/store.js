import { createStore } from 'redux'

const reducer = (state = { gesture: '' }, action) => {
  switch (action.type) {
    case 'up':
      return { gesture: 'up' }
    case 'down':
      return { gesture: 'down' }
    case 'right':
      return { gesture: 'right' }
    case 'left':
      return { gesture: 'left' }
    default:
      return state
  }
}

export let store = createStore(reducer)
