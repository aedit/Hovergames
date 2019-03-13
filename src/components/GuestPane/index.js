import React from 'react'
import { Heading, Window, useFromToPose, Subtitle } from '../../ui-components'

const randomString = (length = 5) => Math.random().toString(36).replace(/\W+/g, '').substr(0, length)

const GuestPane = React.memo(() => {
    const guestPose = useFromToPose(1.5, { from: 'hidden', to: 'visible' })
    const guestid = localStorage.hasOwnProperty('guestid') ? localStorage.getItem('guestid') : randomString()
    localStorage.setItem('guestid', guestid)

    return (
        <Window pose={guestPose} className='guest'>
            <Heading>
                Welcome Guest!
                <Subtitle style={{fontSize:'0.35em'}}>
                    Your GuestID is <strong>{guestid}</strong>
                </Subtitle>
            </Heading>
        </Window>

    )
})

export default GuestPane
