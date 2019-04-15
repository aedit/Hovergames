import React, { Component } from 'react'
import { Square } from '../components'
import { connect } from 'react-redux'
import { store } from '../../../../store'
import { UP, DOWN, LEFT, RIGHT } from '../helpers/constants'
import { startVideo, stop } from '../../../../tracker'

class Player extends Component {
  render() {
    const {
      size,
      position: { top, left },
      gesture
    } = this.props

    let newDirection

    switch (gesture) {
      case 'left':
        newDirection = { top: 0, left: -1, dir: LEFT }
        break
      case 'up':
        newDirection = { top: -1, left: 0, dir: UP }
        break
      case 'right':
        newDirection = { top: 0, left: 1, dir: RIGHT }
        break
      case 'down':
        newDirection = { top: 1, left: 0, dir: DOWN }
        break
      default:
        return
    }

    this.props.handlePlayerMovement(newDirection)

    return (
      <div
        ref={n => {
          this.player = n
        }}
      >
        <Square size={size} position={{ top, left }} color="darkgray" />
      </div>
    )
  }

  componentDidMount = () => {
    if (this.props.ready) startVideo()
  }
  componentDidUpdate = prevProp => {
    if (prevProp.gesture === this.props.gesture)
      store.dispatch({ type: 'reset' })
  }

  componentWillUnmount = () => {
    stop()
  }
}

// Player.propTypes = {
//     size: PropTypes.number.isRequired,
//     position: PropTypes.shape({
//         top: PropTypes.number.isRequired,
//         left: PropTypes.number.isRequired
//     })
// };

const mapStateToProps = (state, props) => {
  return {
    ...state,
    ...props
  }
}

export default connect(
  mapStateToProps,
  () => {}
)(Player)
