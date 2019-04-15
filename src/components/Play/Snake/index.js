import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import GameInfo from '../Dodge/components/GameInfo'
import Grid from './Grid'
import './index.css'
import { connect } from 'react-redux'

class Snake extends Component {
  constructor(props) {
    super(props)
    this.state = {
      highScore: 0,
      score: 0
    }
  }
  updateScore = inc => {
    this.setState(prevState => ({
      score: prevState.score + inc,
      highScore:
        prevState.score + inc > prevState.highScore
          ? prevState.score + inc
          : prevState.highScore
    }))
  }
  render() {
    const isLoggedin =
      sessionStorage.hasOwnProperty('token') ||
      sessionStorage.hasOwnProperty('guestid')
    return !isLoggedin ? (
      <Redirect to="/" />
    ) : (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '95vw',
          maxWidth: '1100px',
          margin: '0 auto',
          background: '#0b132b',
          padding: '1em',
          borderRadius: '10px',
          boxShadow: '0 0 100px black',
          height: '90vh'
        }}
      >
        <GameInfo
          name="Snake"
          playerScore={this.state.score}
          highScore={this.state.highScore}
        />
        <Grid
          rows={30}
          cols={50}
          score={this.state.score}
          update={this.updateScore}
        />
      </div>
    )
  }
}

export default Snake
