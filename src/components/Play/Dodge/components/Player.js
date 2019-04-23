import React, { Component } from 'react'
import { Square } from '../components'

class Player extends Component {
  render() {
    const {
      size,
      position: { top, left },
    } = this.props

    return (
      <div
        ref={n => {
          this.player = n
        }}>
        <Square size={size} position={{ top, left }} color="darkgray" />
      </div>
    )
  }
}

export default Player
