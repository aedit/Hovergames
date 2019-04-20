import { createStore } from 'redux'

const reducer = (state = { ready: false, gesture: '' }, action) => {
  switch (action.type) {
    case 'reset':
      return { ...state, gesture: '' }
    case 'pos':
      return { ...state, ...action.payload }
    case 'up':
      return { ...state, gesture: 'up', ...action.payload }
    case 'down':
      return { ...state, gesture: 'down', ...action.payload }
    case 'right':
      return { ...state, gesture: 'right', ...action.payload }
    case 'left':
      return { ...state, gesture: 'left', ...action.payload }
    case 'ready':
      return { ...state, ready: true }
    case 'open':
      return { ...state, gesture: 'open' }
    case 'close':
      return { ...state, gesture: 'close' }
    default:
      return state
  }
}

export let store = createStore(reducer)
