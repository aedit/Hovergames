import { createStore } from 'redux'

const reducer = (
  state = { ready: false, gesture: '', guest: false },
  action,
) => {
  switch (action.type) {
    case 'reset':
      return { ...state, gesture: '' }
    case 'pos':
      return { ...state, ...action.payload }
    case 'up':
      return { ...state, gesture: 'up' }
    case 'down':
      return { ...state, gesture: 'down' }
    case 'right':
      return { ...state, gesture: 'right' }
    case 'left':
      return { ...state, gesture: 'left' }
    case 'ready':
      return { ...state, ready: true }
    case 'open':
      return { ...state, gesture: 'open' }
    case 'close':
      return { ...state, gesture: 'close' }
    case 'guest':
      return { ...state, ...action.payload }
    default:
      return state
  }
}

export let store = createStore(reducer)
