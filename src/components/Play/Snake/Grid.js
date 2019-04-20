import React from 'react'
import { connect } from 'react-redux'
import { startVideo, stop } from '../../../tracker'
import { store } from '../../../store'
import { Redirect } from 'react-router-dom'

const getDefState = (rows, cols) => {
  let grid = []
  for (let i = 0; i < rows; i++) {
    let cells = []
    for (let j = 0; j < cols; j++) {
      cells.push({
        x: i,
        y: j
      })
    }
    grid.push(cells)
  }
  return {
    grid,
    closeDetected: false,
    gameState: 'stop',
    apple: {
      x: Math.floor(Math.random() * (rows - 1)),
      y: Math.floor(Math.random() * (cols - 1))
    },
    snake: {
      head: {
        x: 5,
        y: 5
      },
      tails: [
        {
          x: 4,
          y: 5
        },
        {
          x: 3,
          y: 5
        },
        {
          x: 2,
          y: 5
        }
      ],
      move: {
        dir: 'right',
        x: 1,
        y: 0
      },
      velocity: 800
    }
  }
}

class Grid extends React.Component {
  constructor(props) {
    super(props)
    this.state = getDefState(props.rows, props.cols)
  }

  ateApple = (apple, { head }) => {
    return apple.x === head.x && apple.y === head.y
  }

  collideWithWall = ({ head }, grid) => {
    const rows = grid.length,
      cols = grid[0].length
    return (
      head.x <= 0 || head.x >= rows - 1 || head.y <= 0 || head.y >= cols - 1
    )
  }

  /*bitSelf({head}, tails) {
    tails.forEach(({x, y}) => {
      if(head.x === x && head.y === y){ 
        return true
      }
    })
    return false
  }*/

  gameLoop = () => {
    const { apple, snake, grid } = this.state
    if (this.ateApple(apple, snake)) {
      this.setState(prevState => {
        const { snake } = prevState
        const newTail = {
          ...snake.tails[snake.tails.length - 1]
        }
        this.props.update(5)
        return {
          ...prevState,
          apple: {
            x: Math.floor(Math.random() * (grid.length - 3)) + 2,
            y: Math.floor(Math.random() * (grid[0].length - 3)) + 2
          },
          snake: {
            ...snake,
            tails: [...snake.tails, newTail]
          }
        }
      })
    } else if (this.collideWithWall(snake, grid)) {
      // if (this.state.interval) {
      //   clearInterval(this.state.interval)
      // }
      this.setState({
        ...getDefState(this.props.rows, this.props.cols),
        gameState: 'start'
      })
      store.dispatch({ type: 'reset' })
    }
    let { head, tails, move } = this.state.snake
    let newTails = []
    for (let i = tails.length - 1; i > 0; i--) {
      newTails.push({
        x: tails[i - 1].x,
        y: tails[i - 1].y
      })
    }
    newTails.push({ ...head })
    newTails.reverse()
    let newHead = {
      x: head.x + move.x,
      y: head.y + move.y
    }
    this.setState(ps => ({
      ...ps,
      snake: {
        ...ps.snake,
        head: newHead,
        tails: newTails
      }
    }))
  }

  isEqual = (i, j, obj) => {
    return i === obj.x && j === obj.y
  }

  isApple = (i, j, apple) => {
    return this.isEqual(i, j, apple)
  }

  isSnakeHead = (i, j, head) => {
    return this.isEqual(i, j, head)
  }

  isSnakeTail = (i, j, tails) => {
    let res = false
    tails.forEach(tail => {
      if (this.isEqual(i, j, tail)) res = true
    })
    return res
  }

  snakeMove = () => {
    let move = this.state.snake.move
    switch (this.props.gesture + move.dir) {
      case 'right':
      case 'rightup':
      case 'rightdown':
        move = {
          dir: 'right',
          x: 0,
          y: 1
        }
        break
      case 'left':
      case 'leftup':
      case 'leftdown':
        move = {
          dir: 'left',
          x: 0,
          y: -1
        }
        break
      case 'up':
      case 'upleft':
      case 'upright':
        move = {
          dir: 'up',
          x: -1,
          y: 0
        }
        break
      case 'down':
      case 'downleft':
      case 'downright':
        move = {
          dir: 'down',
          x: 1,
          y: 0
        }
        break
      case 'close':
        this.setState({ closeDetected: true })
        break
      default:
        break
    }
    // console.log(this.props.gesture, move)
    this.setState(ps => ({
      ...ps,
      snake: {
        ...ps.snake,
        move
      }
    }))
    window.requestAnimationFrame(this.snakeMove)
  }

  xyz = prevProp => {
    // console.log('xyz')
    if (!prevProp.ready && this.props.ready) {
      const { snake } = this.state
      let interval = setInterval(() => {
        this.gameLoop()
      }, snake.velocity / 2)
      this.setState({
        interval
      })
      startVideo()
      this.setState({
        gameState: 'start'
      })
      this.snakeMove()
      console.log(true)
    }
  }

  componentDidUpdate = prevProp => {
    this.xyz(prevProp)
  }

  componentDidMount = () => {
    this.xyz({ ready: false })
  }

  componentWillUnmount = () => {
    if (this.state.interval) {
      clearTimeout(this.state.interval)
    }
    stop()
    store.dispatch({ type: 'reset' })
    window.cancelAnimationFrame(this.snakeMove)
  }

  render = () => {
    const { grid, apple, snake } = this.state

    return this.state.closeDetected ? (
      <Redirect to="/Dashboard" />
    ) : (
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${this.props.cols}, 1fr)`,
          gridTemplateRows: `repeat(${this.props.rows}, 1fr)`
        }}
      >
        {grid.map((cells, i) =>
          cells.map((_, j) => {
            let type = 'cell'
            if (this.isSnakeHead(i, j, snake.head)) {
              type += ' snake-head'
            } else if (this.isSnakeTail(i, j, snake.tails)) {
              type += ' snake-tail'
            } else if (this.isApple(i, j, apple)) {
              type += ' apple'
            }
            return <span key={i + j * j} className={type} />
          })
        )}
      </div>
    )
  }
}
const mapStateToProps = (state, prop) => ({ ...state, ...prop })

export default connect(
  mapStateToProps,
  () => {}
)(Grid)
