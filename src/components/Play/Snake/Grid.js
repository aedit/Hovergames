import React from 'react'
import GameOver from './GameOver'

class Grid extends React.Component {
  constructor(props) {
    super(props)
    const { rows, cols } = props
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

    this.state = {
      grid,
      gameState: 'start',
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
          x: 1,
          y: 0
        },
        velocity: 500
      }
    }
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
            x: Math.floor(Math.random() * (grid.length - 1)),
            y: Math.floor(Math.random() * (grid[0].length - 1))
          },
          snake: {
            ...snake,
            tails: [...snake.tails, newTail]
          }
        }
      })
    } else if (this.collideWithWall(snake, grid)) {
      if (this.state.interval) {
        clearInterval(this.state.interval)
      }
      this.setState({
        gameState: 'over'
      })
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

  keyListener = ({ key }) => {
    let move = this.state.snake.move
    switch (key) {
      case 'ArrowRight':
        move = {
          x: 0,
          y: 1
        }
        break
      case 'ArrowLeft':
        move = {
          x: 0,
          y: -1
        }
        break
      case 'ArrowUp':
        move = {
          x: -1,
          y: 0
        }
        break
      case 'ArrowDown':
        move = {
          x: 1,
          y: 0
        }
        break
      default:
        break
    }
    this.setState(ps => ({
      ...ps,
      snake: {
        ...ps.snake,
        move
      }
    }))
  }

  componentDidMount = () => {
    const { snake } = this.state
    let interval = setInterval(() => {
      this.gameLoop()
    }, snake.velocity / 2)
    this.setState({
      interval
    })
    document.addEventListener('keydown', this.keyListener)
  }

  componentWillUnmount = () => {
    if (this.state.interval) {
      clearTimeout(this.state.interval)
    }
    document.removeEventListener('keydown', this.keyListener)
  }

  render = () => {
    const { grid, apple, snake } = this.state
    if (this.state.gameState === 'over')
      return <GameOver score={this.state.score} />
    else
      return (
        <div
          className="grid"
          style={{
            gridTemplateColumns: `repeat(${this.props.cols}, 1fr)`,
            gridTemplateRows: `repeat(${this.props.rows}, 1fr)`
          }}
        >
          {grid.map((cells, i) =>
            cells.map((cell, j) => {
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

export default Grid
