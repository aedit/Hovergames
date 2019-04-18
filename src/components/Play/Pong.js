import React from 'react'
import { Redirect } from 'react-router-dom'
import GameInfo from './Dodge/components/GameInfo'
import { startVideo, stop } from '../../tracker'
import { connect } from 'react-redux'

const DIRECTION = {
  IDLE: 0,
  UP: 1,
  DOWN: 2,
  LEFT: 3,
  RIGHT: 4
}

let rounds = [5, 5, 3, 3, 2]
let colors = ['#751e1a', '##b22222', '#c54f43', '#e49689', '#fff']

let paddlespeed = 6
let paddleheight = 150
let ballspeed = 8
let paddlecolor = colors[4]

let score = 0
let highscore = 0

class Game {
  initialize = canvasRef => {
    this.canvas = canvasRef
    this.context = canvasRef.getContext('2d')
    this.canvas.width = 1400
    this.canvas.height = 1000

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
    // Change the canvas font size and color
    pong.context.font = '50px Courier New'
    pong.context.fillStyle = this.color

    // Draw the rectangle behind the 'Press any key to begin' text.
    pong.context.fillRect(
      pong.canvas.width / 2 - 350,
      pong.canvas.height / 2 - 48,
      700,
      100
    )

    // Change the canvas color;
    pong.context.fillStyle = 'white'

    // Draw the end game menu text ('Game Over' and 'Winner')
    pong.context.fillText(
      text,
      pong.canvas.width / 2,
      pong.canvas.height / 2 + 15
    )

    setTimeout(() => {
      pong = new Game()
      pong.initialize(this.canvas)
    }, 3000)
  }

  menu = () => {
    // Draw all the pong objects in their current state
    pong.draw()

    // Change the canvas font size and color
    this.context.font = '50px Courier New'
    this.context.fillStyle = this.color

    // Draw the rectangle behind the 'Press any key to begin' text.
    this.context.fillRect(
      this.canvas.width / 2 - 350,
      this.canvas.height / 2 - 48,
      700,
      100
    )

    // Change the canvas color;
    this.context.fillStyle = 'white'

    // Draw the 'press any key to begin' text
    this.context.fillText(
      'Gesture Open to begin',
      this.canvas.width / 2,
      this.canvas.height / 2 + 15
    )
  }

  // Update all objects (move the player, paddle, ball, increment the score, etc.)
  update = () => {
    if (!this.over) {
      // If the ball collides with the bound limits - correct the x and y coords.
      if (this.ball.x <= 0) pong._resetTurn(this.paddle, this.player)
      if (this.ball.x >= this.canvas.width - this.ball.width)
        pong._resetTurn(this.player, this.paddle)
      if (this.ball.y <= 0) this.ball.moveY = DIRECTION.DOWN
      if (this.ball.y >= this.canvas.height - this.ball.height)
        this.ball.moveY = DIRECTION.UP

      // Move player if they player.move value was updated by a keyboard event
      if (this.player.move === DIRECTION.UP) this.player.y -= this.player.speed
      else if (this.player.move === DIRECTION.DOWN)
        this.player.y += this.player.speed

      // On new serve (start of each turn) move the ball to the correct side
      // and randomize the direction to add some challenge.
      if (pong._turnDelayIsOver() && this.turn) {
        this.ball.moveX =
          this.turn === this.player ? DIRECTION.LEFT : DIRECTION.RIGHT
        this.ball.moveY = [DIRECTION.UP, DIRECTION.DOWN][
          Math.round(Math.random())
        ]
        this.ball.y = Math.floor(Math.random() * this.canvas.height - 200) + 200
        this.turn = null
      }

      // If the player collides with the bound limits, update the x and y coords.
      if (this.player.y <= 0) this.player.y = 0
      else if (this.player.y >= this.canvas.height - this.player.height)
        this.player.y = this.canvas.height - this.player.height

      // Move ball in intended direction based on moveY and moveX values
      if (this.ball.moveY === DIRECTION.UP) this.ball.y -= this.ball.speed / 1.5
      else if (this.ball.moveY === DIRECTION.DOWN)
        this.ball.y += this.ball.speed / 1.5
      if (this.ball.moveX === DIRECTION.LEFT) this.ball.x -= this.ball.speed
      else if (this.ball.moveX === DIRECTION.RIGHT)
        this.ball.x += this.ball.speed

      // Handle paddle (AI) UP and DOWN movement
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

      // Handle paddle (AI) wall collision
      if (this.paddle.y >= this.canvas.height - this.paddle.height)
        this.paddle.y = this.canvas.height - this.paddle.height
      else if (this.paddle.y <= 0) this.paddle.y = 0

      // Handle Player-Ball collisions
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

      // Handle paddle-ball collision
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

    // Handle the end of round transition
    // Check to see if the player won the round.
    if (this.player.score === rounds[this.round]) {
      // Check to see if there are any more rounds/levels left and display the victory screen if
      // there are not.
      if (!rounds[this.round + 1]) {
        this.over = true
        setTimeout(() => {
          pong.endGameMenu('Winner!')
        }, 1000)
      } else {
        // If there is another round, reset all the values and increment the round number.
        paddlecolor = this._generateRoundColor()
        this.player.score = this.paddle.score = 0
        this.player.speed += 0.5
        this.paddle.speed += 1
        this.ball.speed += 1
        this.round += 1

        // beep3.play()
      }
    }
    // Check to see if the paddle/AI has won the round.
    else if (this.paddle.score === rounds[this.round]) {
      this.over = true
      setTimeout(function() {
        pong.endGameMenu('Game Over!')
      }, 1000)
    }
  }

  // Draw the objects to the canvas element
  draw = () => {
    // Clear the Canvas
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)

    // Set the fill style to black
    this.context.fillStyle = this.color

    // Draw the background
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height)

    // Set the fill style to white (For the paddles and the ball)
    this.context.fillStyle = paddlecolor

    // Draw the Player
    this.context.fillRect(
      this.player.x,
      this.player.y,
      this.player.width,
      this.player.height
    )

    // Draw the Paddle
    this.context.fillRect(
      this.paddle.x,
      this.paddle.y,
      this.paddle.width,
      this.paddle.height
    )

    // Draw the Ball
    if (pong._turnDelayIsOver()) {
      // this.context.fillRect(
      //   this.ball.x,
      //   this.ball.y,
      //   this.ball.width,
      //   this.ball.height
      // )
      this.context.beginPath()
      this.context.arc(this.ball.x, this.ball.y, 15, 0, 2 * Math.PI)
      this.context.fill()
    }

    // Draw the net (Line in the middle)
    this.context.beginPath()
    this.context.setLineDash([7, 15])
    this.context.moveTo(this.canvas.width / 2, this.canvas.height - 140)
    this.context.lineTo(this.canvas.width / 2, 140)
    this.context.lineWidth = 10
    this.context.strokeStyle = 'darkgray'
    this.context.stroke()

    //Set the color for the score and round text
    this.context.fillStyle = 'white'
    // Set the default canvas font and align it to the center
    this.context.font = '75px Courier New'
    this.context.textAlign = 'center'

    // Draw the players score (left)
    this.context.fillText(
      this.player.score.toString(),
      this.canvas.width / 2 - 300,
      200
    )

    // Draw the paddles score (right)
    this.context.fillText(
      this.paddle.score.toString(),
      this.canvas.width / 2 + 300,
      200
    )

    // Change the font size for the center score text
    this.context.font = '30px Courier New'

    // Draw the winning score (center)
    this.context.fillText(
      'Round ' + (pong.round + 1),
      this.canvas.width / 2,
      35
    )

    // Change the font size for the center score value
    this.context.font = '40px Courier'

    // Draw the current round number
    this.context.fillText(
      rounds[pong.round] ? rounds[pong.round] : rounds[pong.round - 1],
      this.canvas.width / 2,
      100
    )
  }

  loop = () => {
    pong.update()
    pong.draw()
    // If the game is not over, draw the next frame.
    if (!pong.over) requestAnimationFrame(pong.loop)
  }

  // Reset the ball location, the player turns and set a delay before the next round begins.
  _resetTurn = (victor, loser) => {
    this.ball = new Ball(this.canvas).new(this.ball.speed)
    this.turn = loser
    this.timer = new Date().getTime()

    victor.score++
    if (victor.x === 150) {
      score += this.round * 10
    } else {
      score -= this.round * 5
    }
    // beep2.play()
  }

  // Wait for a delay to have passed after each turn.
  _turnDelayIsOver = () => {
    return new Date().getTime() - this.timer >= 1000
  }

  // Select a random color as the background of each level/round.
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
      speed: incrementedSpeed || ballspeed
    }
  }
}

// The paddle object (The two lines that move up and down)
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
      speed: 10
    }
  }
}

const Pong = ({ gesture, ready }) => {
  const canvas = React.useRef()

  highscore = highscore < score ? score : highscore

  const gestureListener = () => {
    // Handle the 'Press any key to begin'  and start the game.
    if (gesture === 'open' && pong.running === false) {
      pong.running = true
      window.requestAnimationFrame(pong.loop)
    }

    // Handle up arrow and w key events
    if (gesture === 'up') pong.player.move = DIRECTION.UP

    // Handle down arrow and s key events
    if (gesture === 'down') pong.player.move = DIRECTION.DOWN

    // Stop the player from moving when there are no keys being pressed.
    if (gesture === 'left' || gesture === 'right')
      pong.player.move = DIRECTION.IDLE
  }

  React.useEffect(gestureListener, [gesture])

  React.useEffect(() => {
    if (ready) {
      startVideo()
    }
    pong.initialize(canvas.current, gestureListener)
  }, [ready])

  React.useEffect(() => () => void stop(), [])

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
      <GameInfo name="Pong" playerScore={score} highScore={highscore} />
      <canvas style={{ alignSelf: 'center' }} ref={canvas} />
    </div>
  )
}

const mapStateToProps = state => {
  return {
    ...state
  }
}

export default connect(
  mapStateToProps,
  () => {}
)(Pong)
