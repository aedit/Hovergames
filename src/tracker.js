import * as handTrack from 'handtrackjs'
import { store } from './store'

const video = document.getElementById('vid')
const canvas = document.getElementById('vidc')
const context = canvas.getContext('2d')

const modelParams = {
  flipHorizontal: true,
  imageScaleFactor: 0.7,
  maxNumBoxes: 3,
  iouThreshold: 0.5,
  scoreThreshold: 0.8
}

let [distx, disty] = [null, null]
let [ox, oy] = [0, 0]
let gestRecorded = true
let oldRegion = ''
let h1OldRegion = ''
let h2OldRegion = ''

// let distOld = -1
// let dif = 0
// let gestureCount = 0

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
/*
const getDirection = predictions => {
  let direction = ''
  const p1x1 = parseInt(predictions[0].bbox[0])
  const p1y1 = parseInt(predictions[0].bbox[1])
  const p1x2 = parseInt(predictions[0].bbox[2])
  const p1y2 = parseInt(predictions[0].bbox[3])
  const [x, y] = [(p1x1 + p1x2) / 2, (p1y1 + p1y2) / 2] //center points for the hand

  if (gestRecorded) {
    ox = x
    oy = y
    gestRecorded = false
  } else {
    distx = x - ox
    disty = y - oy

    if (Math.abs(distx) > 80 || Math.abs(disty) > 40) {
      direction =
        Math.abs(distx) > Math.abs(disty)
          ? distx > 0 && Math.abs(distx) > 80
            ? 'right'
            : 'left'
          : disty > 0 && Math.abs(disty) > 40
          ? 'down'
          : 'up'
      if (direction !== ''){ 
        gestRecorded = true
        ;[distx, disty] = [null, null]
        ;[ox, oy] = [0, 0]
      }
    }
  }
  return direction
}

*/
const X = 640,
  Y = 480

const getGrid = (a, A) => {
  if (a < A / 3) return 0
  if (a <= (2 * A) / 3) return 1
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
    if (slope > S) region = row === 0 ? 'up' : 'down'
    else region = row === 2 ? 'left' : 'right'
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

  if (region === 'center') oldRegion = 'center'
  if (oldRegion === 'center' && region !== 'center') {
    oldRegion = region
    direction = region
    store.dispatch({ type: direction })
  } else {
    direction = ''
  }

  console.table(region)
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
  if (oldInCenter === null) oldInCenter = inCenter
  else if (inCenter && !oldInCenter) movement = 'close'
  else if (!inCenter && oldInCenter) movement = 'open'
  store.dispatch({ type: movement })
}

// const getOpenClose = predictions => {
//   //start and end points for both hands are assigned here
//   const p1x1 = parseInt(predictions[0].bbox[0]);
//   const p1y1 = parseInt(predictions[0].bbox[1]);
//   const p1x2 = parseInt(predictions[0].bbox[2]);
//   const p1y2 = parseInt(predictions[0].bbox[3]);
//   const p2x1 = parseInt(predictions[1].bbox[0]);
//   const p2y1 = parseInt(predictions[1].bbox[1]);
//   const p2x2 = parseInt(predictions[1].bbox[2]);
//   const p2y2 = parseInt(predictions[1].bbox[3]);
//   //both hands center points
//   const [x1, y1] = [(p1x1 + p1x2) / 2, (p1y1 + p1y2) / 2];
//   const [x2, y2] = [(p2x1 + p2x2) / 2, (p2y1 + p2y2) / 2];
//   // distance between both hands
//   const dist = Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
//   //debouncing for open and close gestures
//   if (gestureCount > 3 || gestureCount < -3) gestureCount = 0;
//   if (distOld === -1) {
//     //initiating for the first distance between hands
//     distOld = dist;
//     return;
//   }

//   //calculating new difference between the old and new distance between hands
//   dif = Math.abs(distOld - dist - dif) > 5 ? distOld - dist : dif;

//   let gesture = "NONE";

//   //if distance is changed by a threshold of 5, change the difference else keep it the same
//   if (dif === distOld - dist) {
//     //calculation for actual gestures open or close
//     gesture = dif > 0 ? "close" : "open";
//     if (gesture === "open") gestureCount++;
//     //incrementing for 3 consecutive open captures
//     else gestureCount--;
//     //decrementing for 3 consecutive close captures
//   }
//   //assigning the new distance to the old distance
//   distOld = dist;
//   // return gesture
//   if (gestureCount > 2) {
//     return "open";
//   } else if (gestureCount < -2) {
//     return "close";
//   }
// };

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
