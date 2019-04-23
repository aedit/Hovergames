import React from 'react'
import { Heading, Subtitle } from '../../ui-components'

const divStyle = {
  height: '400px',
  width: '275px',
  gridArea: 'profile',
  borderRadius: '8px',
  border: '4px dotted #6FFFE9',
}

const Profile = ({ name, dp, description }) => {
  return (
    <div style={divStyle}>
      <img src={dp} height="60%" alt={name} />
      <Heading style={{ fontSize: '1.5rem' }}>
        <span className="code-block"> {name} </span>
        <Subtitle style={{ fontSize: '1rem' }}>{description}</Subtitle>
      </Heading>
    </div>
  )
}

export default Profile
