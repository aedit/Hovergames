import React from 'react'
import styled from 'styled-components'
import LoadImg from '../../designs/LoadImg.webp'

const Spin = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`

const Spinner = () => {
  return (
    <Spin>
      {/* <span /> */}
      <img src={LoadImg} alt="Loader" />
    </Spin>
  )
}

export default Spinner
