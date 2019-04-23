import React from 'react'
import styled from 'styled-components'

const Spin = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: #0f0c29;
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    width: 100px;
    height: 100px;
    border: 5px solid rgba(0, 0, 0, 0);
    border-top-color: #7afdd6;
    border-bottom-color: #7afdd6;
    animation: spin 300ms ease-in-out infinite;
  }
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`

const Spinner = () => {
  return (
    <Spin>
      <span />
    </Spin>
  )
}

export default Spinner
