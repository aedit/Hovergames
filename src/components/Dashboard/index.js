import React from 'react'
import { Window, useFromToPose, Heading } from '../../ui-components'

const Dashboard = () => {
  const windowPose = useFromToPose(0.3, { from: 'hidden', to: 'visible' })
  return (
    <Window pose={windowPose}>
      <Heading>Dashboard</Heading>
    </Window>
  )
}

export default Dashboard
// const Sidebar = posed.div({
//   open: {
//     scale: 1,
//     delayChildren: 200,
//     staggerChildren: 50
//   },
//   closed: { scale: 0, delay: 300 }
// })

// const Item = posed.div({
//   open: { scale: 1, opacity: 1 },
//   closed: { scale: 0, opacity: 0 }
// })

// const WindowGroup = styled(Sidebar)`
//   display: flex;
//   align-self: center;
//   height: 100%;
//   justify-content: center;
//   align-items: center;
// `

// const ChildWindow = styled(Item)`
//   border-radius: 8px;
//   box-shadow: 0 0 100px black;
//   height: 30vh;
//   flex-basis: 33%;
//   background: #0575e6; /* fallback for old browsers */
//   background: -webkit-linear-gradient(
//     to right,
//     #021b79,
//     #0575e6
//   ); /* Chrome 10-25, Safari 5.1-6 */
//   background: linear-gradient(
//     to right,
//     #021b79,
//     #0575e6
//   ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
//   &:nth-of-type(1) {
//   }
//   &:nth-of-type(2) {
//     position: relative;
//     transform: translate3d(20px, 0, 0);
//   }
//   &:nth-of-type(3) {
//   }
// `

// const StyledWindow = styled(Window)`
//   overflow: hidden;
//   grid-template-areas:
//     'heading'
//     'games'
//     'empty';
//   grid-template-rows: auto 3fr 20px;
// `

// const Dashboard = () => {
//   const windowPose = useFromToPose(0.3, { from: 'hidden', to: 'visible' })
//   const gamePose = useFromToPose(1, { from: 'close', to: 'open' })
//   return (
//     <StyledWindow pose={windowPose}>
//       <Heading>Games</Heading>
//       <WindowGroup pose={gamePose}>
//         <ChildWindow />
//         <ChildWindow />
//         <ChildWindow />
//       </WindowGroup>
//     </StyledWindow>
//   )
// }

// export default Dashboard
