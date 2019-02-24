import React from 'react'

const GestureBox = ({ name, description, showDisc }) => {
  return (
    <div>
      <div>
        <div className="gesture-icon" />
        <strong className="name">{name}</strong>
      </div>
      {showDisc && <div>{description}</div>}
    </div>
  )
}

export default GestureBox
