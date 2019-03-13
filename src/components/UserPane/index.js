import React from 'react'
import { Heading, Window, useFromToPose, Subtitle,RL,useFromToPoseInf } from '../../ui-components'
import {CardBody, CardTitle,Card} from 'reactstrap'

const UserPane = () => {
    const guestPose = useFromToPose(1.5, { from: 'hidden', to: 'visible' })
    const R2L = useFromToPoseInf({ from: 'right', to: 'left' })

    return (
        <Window pose={guestPose} className='guest left'>
            <Heading>
                Welcome back
                <Subtitle style={{fontSize:'0.35em'}}>
                    Please wait while we recognize you!
                </Subtitle>
            </Heading>
            <Card className="options" style={{gridArea: 'contd'}}>
              <RL pose={R2L}>
                <i className="far fa-hand-paper" />
              </RL>
              <CardBody>
                <CardTitle>Hover to continue</CardTitle>
              </CardBody>
            </Card>
            
        </Window>
    )
}

export default UserPane