import React from 'react'
import { Window, useFromToPose, Heading, Subtitle } from '../../ui-components'
import Game from '../Game'

const Dashboard = () => {
  const windowPose = useFromToPose(0.3, { from: 'hidden', to: 'visible' })
  const [selectedGame, setSelectedGame] = React.useState(0)
  return (
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
          name="Game1"
          selected={selectedGame === 0}
          changeSelect={() => setSelectedGame(0)}
          color="red"
          desc="Game is awesome! :P"
        />
        <Game
          key={2}
          name="Game2"
          selected={selectedGame === 1}
          changeSelect={() => setSelectedGame(1)}
          color="blue"
          desc="Game is awesome! :P"
        />
        <Game
          key={3}
          name="Game3"
          selected={selectedGame === 2}
          changeSelect={() => setSelectedGame(2)}
          color="green"
          desc="Game is awesome! :P"
        />
      </div>
    </Window>
  )
}

export default Dashboard
