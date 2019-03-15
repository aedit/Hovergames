import React from 'react'
import { Heading, Subtitle } from '../../ui-components'

const divStyle = {
  height: '400px',
  width: '275px',
  gridArea: 'profile',
  borderRadius: '8px',
  border: '4px dotted orangered'
}

const Profile = ({ name, image, description }) => {
  return (
    <div style={divStyle}>
      <img src="" alt="" />
      <Heading style={{ fontSize: '1.5rem' }}>
        <span className="code-block"> {name} </span>
        <Subtitle style={{ fontSize: '1rem' }}>{description}</Subtitle>
      </Heading>
    </div>
  )
}

export default Profile
