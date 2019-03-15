import React from 'react'
import { Heading, Desc, UD } from '../../ui-components'
// import { Link } from 'react-router-dom'

export const useFromToPose = (timeOut, { from, to }) => {
  const [windowPose, setWindowPose] = React.useState(from)
  const si = () => setWindowPose(to)
  React.useEffect(() => {
    setTimeout(si, timeOut * 1000)
    return () => void clearTimeout(si)
  }, [])
  return [windowPose, setWindowPose]
}

const About = ({ informUp }) => {
  const [upDownPose, setUpDown] = useFromToPose(0.3, { from: 'up', to: 'down' })

  return (
    <UD
      onClick={() => {
        setUpDown('up')
        informUp()
      }}
      pose={upDownPose}
      style={{
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 50% 90%, 0% 100%)'
      }}
    >
      <Heading style={{ gridArea: 'heading' }}>About Page</Heading>
      <Desc>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis
        aperiam repellendus facere saepe aliquam quidem, nulla voluptas suscipit
        reprehenderit, esse autem minus atque eligendi necessitatibus. Saepe sit
        laboriosam, obcaecati minima excepturi quasi porro quidem ipsum sint
        natus pariatur similique cum eius! Deserunt impedit cumque
        necessitatibus recusandae aut eaque, eligendi architecto?Lorem ipsum
        dolor sit amet consectetur adipisicing elit. Ullam placeat a ipsum
        delectus, voluptatem deserunt eligendi praesentium neque beatae nihil
        provident autem quam deleniti quasi consectetur fugiat animi incidunt
        porro inventore voluptates dignissimos obcaecati atque. Accusantium
        ratione vel officia fugit maiores harum perferendis? Numquam pariatur
        illo reprehenderit aspernatur, similique voluptate doloremque et
        possimus doloribus ad voluptates qui saepe illum perspiciatis libero
        quia aperiam iste voluptatibus recusandae eius vero aliquam dolor. Odit,
        soluta. Error sed minus laboriosam quam quos tempore impedit. Pariatur,
        laudantium suscipit ad repellat adipisci dolorum in dolorem consequatur
        ducimus quae asperiores similique molestiae sint ab excepturi eum!
        Possimus?
      </Desc>
    </UD>
  )
}

export default About
