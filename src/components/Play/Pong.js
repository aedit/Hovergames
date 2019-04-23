import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import GameInfo from './Dodge/components/GameInfo'
import { startVideo, stop } from '../../tracker'
import { connect } from 'react-redux'
import { store } from '../../store'

const DIRECTION = {
  IDLE: 0,
  UP: 1,
  DOWN: 2,
  LEFT: 3,
  RIGHT: 4,
}

let rounds = [5, 5, 3, 3, 2]
let colors = ['#751e1a', '#b22222', '#c54f43', '#e49689', '#fff']

let paddlespeed = 10
let paddleheight = 150
let ballspeed = 14
let paddlecolor = colors[0]

class Game {
  initialize = (canvasRef, returnTurn) => {
    this.canvas = canvasRef
    this.context = canvasRef.getContext('2d')
    this.canvas.width = 1400
    this.canvas.height = 1000
    this._resetTurn = returnTurn

    this.canvas.style.width = this.canvas.width / 2 + 'px'
    this.canvas.style.height = this.canvas.height / 2 + 'px'

    this.player = new Paddle(canvasRef).new('left')
    this.paddle = new Paddle(canvasRef).new('right')
    this.ball = new Ball(canvasRef).new()

    this.paddle.speed = paddlespeed
    this.running = this.over = false
    this.turn = this.paddle
    this.timer = this.round = 0
    this.color = '#000'

    pong.menu()
  }

  endGameMenu = text => {
    pong.context.font = '50px Courier New'
    pong.context.fillStyle = this.color

    pong.context.fillRect(
      pong.canvas.width / 2 - 350,
      pong.canvas.height / 2 - 48,
      700,
      100,
    )

    pong.context.fillStyle = 'white'

    pong.context.fillText(
      text,
      pong.canvas.width / 2,
      pong.canvas.height / 2 + 15,
    )

    setTimeout(() => {
      pong = new Game()
      pong.initialize(this.canvas)
    }, 3000)
  }

  menu = () => {
    pong.draw()

    this.context.font = '50px Courier New'
    this.context.fillStyle = this.color

    this.context.fillRect(
      this.canvas.width / 2 - 350,
      this.canvas.height / 2 - 48,
      700,
      100,
    )

    this.context.fillStyle = 'white'

    this.context.fillText(
      'Gesture Left to begin',
      this.canvas.width / 2,
      this.canvas.height / 2 + 15,
    )
  }

  update = () => {
    if (!this.over) {
      if (this.ball.x <= 0) pong._resetTurn(this.paddle, this.player)
      if (this.ball.x >= this.canvas.width - this.ball.width)
        pong._resetTurn(this.player, this.paddle)
      if (this.ball.y <= 0) this.ball.moveY = DIRECTION.DOWN
      if (this.ball.y >= this.canvas.height - this.ball.height)
        this.ball.moveY = DIRECTION.UP

      if (this.player.move === DIRECTION.UP) this.player.y -= this.player.speed
      else if (this.player.move === DIRECTION.DOWN)
        this.player.y += this.player.speed

      if (pong._turnDelayIsOver() && this.turn) {
        this.ball.moveX =
          this.turn === this.player ? DIRECTION.LEFT : DIRECTION.RIGHT
        this.ball.moveY = [DIRECTION.UP, DIRECTION.DOWN][
          Math.round(Math.random())
        ]
        this.ball.y = Math.floor(Math.random() * this.canvas.height - 200) + 200
        this.turn = null
      }

      if (this.player.y <= 0) this.player.y = 0
      else if (this.player.y >= this.canvas.height - this.player.height)
        this.player.y = this.canvas.height - this.player.height

      if (this.ball.moveY === DIRECTION.UP) this.ball.y -= this.ball.speed / 1.5
      else if (this.ball.moveY === DIRECTION.DOWN)
        this.ball.y += this.ball.speed / 1.5
      if (this.ball.moveX === DIRECTION.LEFT) this.ball.x -= this.ball.speed
      else if (this.ball.moveX === DIRECTION.RIGHT)
        this.ball.x += this.ball.speed

      if (this.paddle.y > this.ball.y - this.paddle.height / 2) {
        if (this.ball.moveX === DIRECTION.RIGHT)
          this.paddle.y -= this.paddle.speed / 1.5
        else this.paddle.y -= this.paddle.speed / 4
      }
      if (this.paddle.y < this.ball.y - this.paddle.height / 2) {
        if (this.ball.moveX === DIRECTION.RIGHT)
          this.paddle.y += this.paddle.speed / 1.5
        else this.paddle.y += this.paddle.speed / 4
      }

      if (this.paddle.y >= this.canvas.height - this.paddle.height)
        this.paddle.y = this.canvas.height - this.paddle.height
      else if (this.paddle.y <= 0) this.paddle.y = 0

      if (
        this.ball.x - this.ball.width <= this.player.x &&
        this.ball.x >= this.player.x - this.player.width
      ) {
        if (
          this.ball.y <= this.player.y + this.player.height &&
          this.ball.y + this.ball.height >= this.player.y
        ) {
          this.ball.x = this.player.x + this.ball.width
          this.ball.moveX = DIRECTION.RIGHT
        }
      }

      if (
        this.ball.x - this.ball.width <= this.paddle.x &&
        this.ball.x >= this.paddle.x - this.paddle.width
      ) {
        if (
          this.ball.y <= this.paddle.y + this.paddle.height &&
          this.ball.y + this.ball.height >= this.paddle.y
        ) {
          this.ball.x = this.paddle.x - this.ball.width
          this.ball.moveX = DIRECTION.LEFT
        }
      }
    }

    if (this.player.score === rounds[this.round]) {
      if (!rounds[this.round + 1]) {
        this.over = true
        setTimeout(() => {
          pong.endGameMenu('Winner!')
        }, 1000)
      } else {
        paddlecolor = colors[this.round + 1]
        this.player.score = this.paddle.score = 0
        this.player.speed += 0.5
        this.paddle.speed += 1
        this.ball.speed += 1
        this.round += 1
      }
    } else if (this.paddle.score === rounds[this.round]) {
      this.over = true
      setTimeout(function() {
        pong.endGameMenu('Game Over!')
      }, 1000)
    }
  }

  draw = () => {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)

    this.context.fillStyle = this.color

    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height)

    this.context.fillStyle = paddlecolor

    this.context.fillRect(
      this.player.x,
      this.player.y,
      this.player.width,
      this.player.height,
    )

    this.context.fillRect(
      this.paddle.x,
      this.paddle.y,
      this.paddle.width,
      this.paddle.height,
    )

    if (pong._turnDelayIsOver()) {
      this.context.beginPath()
      this.context.arc(this.ball.x, this.ball.y, 15, 0, 2 * Math.PI)
      this.context.fill()
    }

    this.context.beginPath()
    this.context.setLineDash([7, 15])
    this.context.moveTo(this.canvas.width / 2, this.canvas.height - 140)
    this.context.lineTo(this.canvas.width / 2, 140)
    this.context.lineWidth = 10
    this.context.strokeStyle = 'darkgray'
    this.context.stroke()

    this.context.fillStyle = 'white'

    this.context.font = '75px Courier New'
    this.context.textAlign = 'center'

    this.context.fillText(
      this.player.score.toString(),
      this.canvas.width / 2 - 300,
      200,
    )

    this.context.fillText(
      this.paddle.score.toString(),
      this.canvas.width / 2 + 300,
      200,
    )

    this.context.font = '30px Courier New'

    this.context.fillText(
      'Round ' + (pong.round + 1),
      this.canvas.width / 2,
      35,
    )

    this.context.font = '40px Courier'

    this.context.fillText(
      rounds[pong.round] ? rounds[pong.round] : rounds[pong.round - 1],
      this.canvas.width / 2,
      100,
    )
  }

  loop = () => {
    pong.update()
    pong.draw()

    if (!pong.over) requestAnimationFrame(pong.loop)
  }

  _turnDelayIsOver = () => {
    return new Date().getTime() - this.timer >= 1000
  }

  _generateRoundColor = () => {
    let newColor = colors[Math.floor(Math.random() * colors.length)]
    if (newColor === paddlecolor) return pong._generateRoundColor()
    return newColor
  }
}

let pong = new Game()

class Ball {
  constructor(canvas) {
    this.canvas = canvas
  }
  new = incrementedSpeed => {
    return {
      width: 18,
      height: 18,
      x: this.canvas.width / 2 - 9,
      y: this.canvas.height / 2 - 9,
      moveX: DIRECTION.IDLE,
      moveY: DIRECTION.IDLE,
      speed: incrementedSpeed || ballspeed,
    }
  }
}

class Paddle {
  constructor(canvas) {
    this.canvas = canvas
  }
  new = side => {
    return {
      width: 18,
      height: paddleheight,
      x: side === 'left' ? 150 : this.canvas.width - 150,
      y: this.canvas.height / 2 - 35,
      score: 0,
      move: DIRECTION.IDLE,
      speed: 10,
    }
  }
}

const Pong = ({ gesture, ready, x, y }) => {
  const canvas = React.useRef()
  let [started, setStarted] = useState(false)
  let [score, setScore] = useState(0)
  let [highscore, sethighscore] = useState(0)
  let [closeDetected, setCloseDetected] = useState(false)

  const gestureListener = () => {
    if (started) {
      if (gesture === 'close') {
        store.dispatch({ type: 'reset' })
        setCloseDetected(true)
      }
      let newY = (y * 1000) / 480 - paddleheight / 2
      pong.player.y = newY > -10 && newY < 1000 ? newY : pong.player.y

      if (gesture === 'left' && pong.running === false) {
        pong.running = true
        window.requestAnimationFrame(pong.loop)
      }
    }
  }

  const _resetTurn = (victor, loser) => {
    pong.ball = new Ball(pong.canvas).new(pong.ball.speed)
    pong.turn = loser
    pong.timer = new Date().getTime()

    victor.score++
    if (victor.x === 150) {
      let gamescore = score + pong.round * 10
      setScore(gamescore)
      sethighscore(highscore > score ? highscore : score)
    }
  }

  React.useEffect(() => {
    if (ready) {
      startVideo()
      setStarted(true)
    }
    pong.initialize(canvas.current, _resetTurn)
  }, [ready])

  React.useEffect(gestureListener, [started, y])

  React.useEffect(() => () => void stop(), [])

  const isLoggedin =
    localStorage.hasOwnProperty('token') ||
    localStorage.hasOwnProperty('guestid')
  return !isLoggedin ? (
    <Redirect to="/" />
  ) : closeDetected ? (
    <Redirect to="/Dashboard" />
  ) : (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',

        width: '95vw',
        maxWidth: '1100px',
        margin: '0 auto',
        background: '#000',
        padding: '1em',
        borderRadius: '10px',
        boxShadow: '0 0 100px black',
        height: '90vh',
      }}>
      <GameInfo name="Pong" playerScore={score} highScore={highscore} />
      <canvas
        style={{ alignSelf: 'center', border: '5px solid #252525' }}
        ref={canvas}
      />
    </div>
  )
}

const mapStateToProps = state => {
  return {
    ...state,
  }
}

export default connect(
  mapStateToProps,
  () => {},
)(Pong)
