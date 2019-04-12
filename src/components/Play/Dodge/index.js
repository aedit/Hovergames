import React from 'react'
import { Game } from './containers'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

const Dodge = () => {
  const isLoggedin =
    sessionStorage.hasOwnProperty('token') ||
    sessionStorage.hasOwnProperty('guestid')
  return !isLoggedin ? (
    <Redirect to="/" />
  ) : (
    <Game boardSize={20} playerSize={25} />
  )
}

const mapStateToProps = state => ({
  ...state
})

export default connect(
  mapStateToProps,
  () => {}
)(Dodge)
