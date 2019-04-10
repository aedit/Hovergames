import React from 'react'
import { Redirect } from 'react-router-dom'
import GameInfo from './Dodge/components/GameInfo'

var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)

const gameWidth = 0.95 * w > 1000 ? 1000 : 0.95 * w,
  //   gameHeight =
  //     document.documentElement.clientHeight -
  //     document.documentElement.clientHeight * 0.2,
  gameHeight = 0.65 * h,
  colors = ['#3c1611', '#751e1a', '##b22222', '#c54f43', '#e49689', '#fff']

class Breakout extends React.Component {
  componentDidMount = () => {
    this.update()
  }
  update = () => {
    const Width = gameWidth,
      Height = gameHeight,
      ctx = this.refs.canvas.getContext('2d'),
      brickWidth = Width / 10 - 2.25
    let ball = {
        x: Width / 2 - 3,
        y: Height / 2 - 3,
        radius: 6,
        speedX: 0,
        speedY: 3
      },
      paddle1 = {
        w: 120,
        h: 10,
        x: Width / 2 - 100 / 2, // 100 is paddle.w
        y: Height - 10,
        speed: 10
      },
      bricks = [],
      bonuses = [],
      ballOn = false,
      color,
      gameOver = 0 // 1 you lost - 2 you win

    function KeyListener() {
      this.pressedKeys = []
      this.keydown = function(e) {
        this.pressedKeys[e.keyCode] = true
      }
      this.keyup = function(e) {
        this.pressedKeys[e.keyCode] = false
      }
      document.addEventListener('keydown', this.keydown.bind(this))
      document.addEventListener('keyup', this.keyup.bind(this))
    }
    KeyListener.prototype.isPressed = function(key) {
      return this.pressedKeys[key] ? true : false
    }
    KeyListener.prototype.addKeyPressListener = function(keyCode, callback) {
      document.addEventListener('keypress', function(e) {
        if (e.keyCode === keyCode) callback(e)
      })
    }
    let keys = new KeyListener()
    // create bonus block
    function createBonus(brick) {
      let chance = Math.floor(Math.random() * (10 - 1 + 1) + 1)
      if (chance === 1) {
        let randomNum = Math.floor(Math.random() * (4 - 1 + 1) + 1),
          bonus = {
            x: brick.x + brick.w / 2 - 5,
            y: brick.y,
            w: 10,
            h: 10,
            type: randomNum
          }
        bonuses.push(bonus)
      }
    }
    // create array 60 bricks
    function createBricks() {
      let brickX = 2,
        brickY = 10,
        j = 0
      // a = 0;
      for (let i = 0; i < 60; i++) {
        let brick = {
          x: brickX,
          y: brickY,
          w: brickWidth,
          h: 10,
          color: colors[j]
        }
        bricks.push(brick)
        brickX += brickWidth + 2
        if (brickX + brickWidth + 2 > Width) {
          brickY += 12
          brickX = 2
          j++
        }
      }
    }
    createBricks()
    // check collision !!ball must be first!!
    function checkCollision(obj1, obj2) {
      if (obj1 !== ball) {
        if (
          obj1.y >= obj2.y &&
          obj1.y <= obj2.y + obj2.h &&
          obj1.x >= obj2.x &&
          obj1.x <= obj2.x + obj2.w
        ) {
          return true
        }
      } else {
        if (
          obj1.y + obj1.radius >= obj2.y &&
          obj1.y - obj1.radius <= obj2.y + obj2.h &&
          obj1.x - obj1.radius >= obj2.x &&
          obj1.x + obj1.radius <= obj2.x + obj2.w
        ) {
          return true
        }
      }
    }
    // if ball touch brick destroy
    function destroyBrick() {
      for (let i = 0; i < bricks.length; i++) {
        if (checkCollision(ball, bricks[i])) {
          ball.speedY = -ball.speedY
          createBonus(bricks[i])
          bricks.splice(i, 1)
        }
      }
    }
    // reset everything for a new gme
    function newGame() {
      bricks = []
      bonuses = []
      createBricks()
      ball.x = Width / 2 - 3
      ball.y = Height / 2 - 3
      ball.speedX = 0
      ballOn = false
      ball = {
        x: Width / 2 - 3,
        y: Height / 2 - 3,
        radius: 6,
        speedX: 0,
        speedY: 3
      }
      paddle1 = {
        w: 100,
        h: 10,
        x: Width / 2 - 100 / 2, // 100 is paddle.w
        y: Height - 10,
        speed: 10
      }
    }

    function draw() {
      ctx.clearRect(0, 0, Width, Height)
      ctx.fillStyle = '#000'
      ctx.fillRect(0, 0, Width, Height)
      // paddle
      ctx.fillStyle = 'darkgray'
      ctx.fillRect(paddle1.x, paddle1.y, paddle1.w, paddle1.h)

      if (ballOn === false) {
        ctx.font = '14px Roboto Mono'
        ctx.textAlign = 'center'
        ctx.fillText(
          'Press spacebar to start a new game.',
          Width / 2,
          Height / 2 - 25
        )
        ctx.font = '12px Roboto Mono'
        ctx.fillText(
          'Move with arrow keys or A & D.',
          Width / 2,
          Height / 2 + 25
        )
        if (gameOver === 1) {
          ctx.font = '52px Roboto Mono'
          ctx.fillText('YOU LOST!', Width / 2, Height / 2 - 90)
          ctx.font = '36px Roboto Mono'
          ctx.fillText('Keep trying!', Width / 2, Height / 2 - 50)
        } else if (gameOver === 2) {
          ctx.font = '52px Roboto Mono'
          ctx.fillText('YOU WON!', Width / 2, Height / 2 - 90)
          ctx.font = '36px Roboto Mono'
          ctx.fillText('Congratulations!', Width / 2, Height / 2 - 50)
        }
      }
      // ball
      ctx.beginPath()
      ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2)
      ctx.fill()
      //bricks
      for (let i = 0; i < bricks.length; i++) {
        ctx.fillStyle = bricks[i].color
        ctx.fillRect(bricks[i].x, bricks[i].y, bricks[i].w, bricks[i].h)
      }
      for (let i = 0; i < bonuses.length; i++) {
        // reduce paddle
        if (bonuses[i].type === 1) {
          color = '#c0392b'
          ctx.fillStyle = color
          ctx.fillRect(bonuses[i].x, bonuses[i].y, bonuses[i].w, bonuses[i].h)
        } // increase paddle
        else if (bonuses[i].type === 2) {
          color = '#27ae60'
          ctx.fillStyle = color
          ctx.fillRect(
            bonuses[i].x - bonuses[i].w / 2,
            bonuses[i].y,
            bonuses[i].w * 2,
            bonuses[i].h
          )
        } // ball speedY --
        else if (bonuses[i].type === 3) {
          color = '#2980b9'
          ctx.fillStyle = color
          ctx.beginPath()
          ctx.arc(bonuses[i].x, bonuses[i].y, ball.radius - 2, 0, Math.PI * 2)
          ctx.fill()
        } // ball speedY ++
        else {
          color = '#f1c40f'
          ctx.fillStyle = color
          ctx.beginPath()
          ctx.arc(bonuses[i].x, bonuses[i].y, ball.radius + 2, 0, Math.PI * 2)
          ctx.fill()
        }
      }
    }

    function move() {
      // bonus fall
      for (let i = 0; i < bonuses.length; i++) {
        bonuses[i].y += 4
        if (checkCollision(bonuses[i], paddle1)) {
          if (bonuses[i].type === 1) {
            paddle1.w -= 10
          } else if (bonuses[i].type === 2) {
            paddle1.w += 10
          } else if (bonuses[i].type === 3) {
            ball.radius -= 1
          } else {
            ball.radius += 1
          }
          bonuses.splice(i, 1)
          return
        }
        if (bonuses[i].y > Height) {
          bonuses.splice(i, 1)
        }
      }
      // paddle movement
      if ((keys.isPressed(65) || keys.isPressed(37)) && paddle1.x > 0) {
        // LEFT
        paddle1.x -= paddle1.speed
      } else if (
        (keys.isPressed(68) || keys.isPressed(39)) &&
        paddle1.x + paddle1.w < Width
      ) {
        // RIGHT
        paddle1.x += paddle1.speed
      }
      // start ball on space key
      if (keys.isPressed(32) && ballOn === false) {
        ballOn = true
        gameOver = 0
      }
      // ball movement
      if (ballOn === true) {
        ball.x += ball.speedX
        ball.y += ball.speedY
        // check ball hit ceiling
        if (ball.y <= 0) {
          ball.speedY = -ball.speedY
        }
        // check ball hit paddle and angle
        if (
          ball.y + ball.radius >= paddle1.y &&
          ball.x - ball.radius >= paddle1.x &&
          ball.x + ball.radius <= paddle1.x + paddle1.w
        ) {
          ball.speedY = -ball.speedY
          let deltaX = ball.x - (paddle1.x + paddle1.w / 2)
          ball.speedX = deltaX * 0.06
        }
        // check ball hit wall left-right
        if (ball.x >= Width || ball.x <= 0) {
          ball.speedX = -ball.speedX
        }
        // check if lost
        if (ball.y > Height) {
          gameOver = 1
          newGame()
        }
        destroyBrick()
        // check if win
        if (bricks.length < 1) {
          gameOver = 2
          newGame()
        }
      }
    }

    function loop() {
      move()
      draw()
      requestAnimationFrame(loop)
    }

    requestAnimationFrame(loop)
  }
  render = () => {
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
        <GameInfo name="Breakout" playerScore="0" highScore="0" />
        <canvas
          ref="canvas"
          width={gameWidth}
          height={gameHeight}
          id="gameCanvas"
          style={{ borderRadius: '8px', margin: '15px auto' }}
        />
      </div>
    )
  }
}

export default Breakout
