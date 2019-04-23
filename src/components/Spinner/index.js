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
  z-index: 1000;
  span {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 5px solid rgba(0, 0, 0, 0);
    border-top-color: #7afdd6;
    border-bottom-color: #7afdd6;
    animation: spin 1s linear infinite;
  }
  @keyframes spin {
    from {
      transform: rotate(0deg) scale(1);
    }
    50% {
      transform: rotate(180deg) scale(1.2);
    }
    to {
      transform: rotate(360deg) scale(1);
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
