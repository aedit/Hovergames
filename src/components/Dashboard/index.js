import React from 'react'
import { Redirect } from 'react-router-dom'
import { Window, useFromToPose, Heading, Subtitle } from '../../ui-components'
import Game from '../Game'
import { connect } from 'react-redux'
import { startVideo, stop } from '../../tracker'
import { store } from '../../store'
import Dodge from '../../designs/Dodge.png'
import Breakout from '../../designs/Breakout.png'
import Snake from '../../designs/Snake.png'

const games = ['Snake', 'Dodge', 'breakout']

const Dashboard = ({ gesture, ready }) => {
  const windowPose = useFromToPose(0.3, { from: 'hidden', to: 'visible' })
  const [selectedGame, setSelectedGame] = React.useState(1)
  const [redirect, setRedirect] = React.useState(false)
  React.useEffect(() => {
    switch (gesture) {
      case 'open':
        setRedirect(true)
        break
      case 'right':
        setSelectedGame(prev => {
          switch (prev) {
            case 0:
              return 1
            case 1:
              return 2
            case 2:
              return 0
            default:
              return 1
          }
        })

        break
      case 'left':
        setSelectedGame(prev => {
          switch (prev) {
            case 0:
              return 2
            case 1:
              return 0
            case 2:
              return 1
            default:
              return 1
          }
        })

        break
      default:
        break
    }
    console.log('gesture', gesture)
    // console.log(gesture, selectedGame)
    return () => void store.dispatch({ type: 'reset' })
  }, [gesture])
  React.useEffect(() => {
    if (ready) startVideo()
  }, [ready])
  React.useEffect(() => () => void stop(), [])
  const isLoggedin =
    sessionStorage.hasOwnProperty('token') ||
    sessionStorage.hasOwnProperty('guestid')
  return !isLoggedin ? (
    <Redirect to="/" />
  ) : redirect ? (
    <Redirect to={`/${games[selectedGame]}`} />
  ) : (
    <Window pose={windowPose}>
      <Heading>
        Dashboard
        <Subtitle>Select a Game</Subtitle>
      </Heading>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-evenly',
          gridArea: 'list'
        }}
      >
        <Game
          key={1}
          name="Snake"
          selected={selectedGame === 0}
          changeSelect={() => setSelectedGame(0)}
          background={Snake}
          desc="Eat the Blocks!"
        />
        <Game
          key={2}
          name="Dodge"
          selected={selectedGame === 1}
          changeSelect={() => setSelectedGame(1)}
          background={Dodge}
          desc="Ditch the blocks!"
        />
        <Game
          key={3}
          name="Breakout"
          selected={selectedGame === 2}
          changeSelect={() => setSelectedGame(2)}
          background={Breakout}
          desc="Break the blocks!"
        />
      </div>
    </Window>
  )
}

const mapStateToProps = state => ({
  ...state
})

export default connect(
  mapStateToProps,
  () => {}
)(Dashboard)
