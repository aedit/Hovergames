import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Grid from './Grid'
import './index.css'
import { store } from '../../../store'
import { startVideo, stop } from '../../../tracker'

class Snake extends Component {
  componentDidUpdate = prevProp => {
    if (prevProp.gesture === this.props.gesture)
      store.dispatch({ type: 'reset' })
  }

  componentDidMount = () => {
    if (this.props.ready) startVideo()
  }

  componentWillUnmount = () => {
    stop()
  }

  render() {
    const isLoggedin =
      localStorage.hasOwnProperty('token') ||
      localStorage.hasOwnProperty('guestid')
    return !isLoggedin ? (
      <Redirect to="/" />
    ) : (
      <Grid style={{ border: '5px solid #252525' }} rows={30} cols={50} />
    )
  }
}

export default Snake
