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
import Leaderboard from '../Leaderboard'

const games = ['Snake', 'Pong', 'breakout']
var dashboardCenter = true

const Dashboard = ({ gesture, ready }) => {
  const windowPose = useFromToPose(0.3, { from: 'hidden', to: 'visible' })
  const [selectedGame, setSelectedGame] = React.useState(1)
  const [redirect, setRedirect] = React.useState(false)
  const [isScaleDown, setIsScaleDown] = React.useState('center')
  React.useEffect(() => {
    switch (gesture) {
      case 'open':
        if (dashboardCenter) setRedirect(true)
        break
      case 'close':
        if (dashboardCenter) {
          sessionStorage.clear()
          break
        }
        break
      case 'right':
        if (dashboardCenter)
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
        if (dashboardCenter)
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
      case 'down':
        setIsScaleDown('down')
        dashboardCenter = false
        break
      case 'up':
        setIsScaleDown('center')
        dashboardCenter = true
        break
      default:
        break
    }

    return () => void store.dispatch({ type: 'reset' })
  }, [gesture])
  React.useEffect(() => {
    if (ready) startVideo()
    store.dispatch({ type: 'reset' })
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
    <React.Fragment>
      {isScaleDown === 'down' && <Leaderboard />}
      <Window pose={isScaleDown === 'center' ? windowPose : isScaleDown}>
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
            name="Pong"
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
    </React.Fragment>
  )
}

const mapStateToProps = state => ({
  ...state
})

export default connect(
  mapStateToProps,
  () => {}
)(Dashboard)
