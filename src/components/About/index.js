import React from 'react'
import { Window, Heading } from '../../ui-components'
import { Link } from 'react-router-dom'

const About = () => {
  return (
    <Window>
      <Heading>About Page</Heading>
      <Link to="/">Back</Link>
    </Window>
  )
}

export default About
