import * as handTrack from 'handtrackjs'
import { store } from './store'

const video = document.getElementById('vid')
const canvas = document.getElementById('vidc')
const context = canvas.getContext('2d')

const modelParams = {
  flipHorizontal: true,
  imageScaleFactor: 0.65,
  maxNumBoxes: 3,
  iouThreshold: 0.5,
  scoreThreshold: 0.87
}

let oldRegion = ''

let model = null
handTrack.load(modelParams).then(lmodel => {
  // detect objects in the image.
  console.log('Loaded Model!', lmodel)
  model = lmodel
  // startVideo();
  store.dispatch({ type: 'ready' })
})

export const startVideo = (getPos = false) => {
  handTrack.startVideo(video).then(function(status) {
    console.log('video started', status)
    if (status) {
      console.log('Video started. Now tracking')
      runDetection(getPos)
    } else {
      console.log('Please enable video')
    }
  })
}

const X = 640,
  Y = 480

const getGrid = (a, A) => {
  if (a < A * 0.3) return 0
  if (a <= 0.7 * A) return 1
  return 2
}

const getRegion = (x, y) => {
  const col = getGrid(x, X)
  const row = getGrid(y, Y)
  let region = ''
  if (row === 0 && col === 1) region = 'up'
  else if (row === 1 && col === 1) region = 'center'
  else if (row === 1 && col === 0) region = 'left'
  else if (row === 1 && col === 2) region = 'right'
  else if (row === 2 && col === 1) region = 'down'
  else if (row === col) {
    const S = Y / X
    const slope = (Y - 3 * y) / (X - 3 * x)
    if (slope > S) region = row === 0 ? 'up' : 'down'
    else region = row === 2 ? 'right' : 'left'
  } else {
    const S = -Y / X
    const slope = -y / (X - x)
    if (slope > S) region = row === 0 ? 'up' : 'left'
    else region = row === 2 ? 'down' : 'right'
  }
  return region
}

const opcodeDirection = predictions => {
  //start opcode calculation
  let direction = ''
  const x1 = parseInt(predictions[0].bbox[0])
  const W = parseInt(predictions[0].bbox[2])
  const y1 = parseInt(predictions[0].bbox[1])
  const H = parseInt(predictions[0].bbox[3])
  // correct center formula
  const [x, y] = [x1 + W / 2, y1 + H / 2]

  const region = getRegion(x, y)

  if (region === 'center') {
    oldRegion = 'center'
  } else if (oldRegion === 'center') {
    oldRegion = region
    direction = region
    store.dispatch({ type: direction })
    // console.table(region)
  } else {
    direction = ''
  }
  console.log('direction', direction)
}

let oldInCenter = null

const opcodeOpenClose = predictions => {
  let movement = ''
  //start opcode calculation for hand 1
  const x1 = parseInt(predictions[0].bbox[0])
  const W1 = parseInt(predictions[0].bbox[2])
  const y1 = parseInt(predictions[0].bbox[1])
  const H1 = parseInt(predictions[0].bbox[3])
  // correct center formula
  const [a, b] = [x1 + W1 / 2, y1 + H1 / 2]
  const h1Region = getRegion(a, b)
  //start opcode calculation for hand 2
  const x2 = parseInt(predictions[1].bbox[0])
  const W2 = parseInt(predictions[1].bbox[2])
  const y2 = parseInt(predictions[1].bbox[1])
  const H2 = parseInt(predictions[1].bbox[3])
  // correct center formula
  const [c, d] = [x2 + W2 / 2, y2 + H2 / 2]
  const h2Region = getRegion(c, d)

  let inCenter = [h1Region, h2Region].every(e => e === 'center')
  inCenter = inCenter
    ? inCenter
    : (h1Region === 'left' && h2Region === 'right') ||
      (h2Region === 'left' && h1Region === 'right')
  if (oldInCenter === null) oldInCenter = inCenter
  else if (inCenter && !oldInCenter) {
    movement = 'close'
    oldInCenter = null
  } else if (!inCenter && oldInCenter) {
    movement = 'open'
    oldInCenter = null
  }
  console.log('open/close', movement)
  store.dispatch({ type: movement })
}

async function runDetection() {
  await model.detect(video).then(predictions => {
    if (predictions.length === 1) {
      opcodeDirection(predictions)
    } else if (predictions.length >= 2) {
      opcodeOpenClose(predictions)
    }

    model.renderPredictions(predictions, canvas, context, video)
    requestAnimationFrame(runDetection)
  })
}

export function stop() {
  handTrack.stopVideo()
}
