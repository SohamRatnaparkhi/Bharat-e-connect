import React from 'react'

const Participants = ({ peers }) => {
    return (
        <div>
            Participants
            <br />
            {Object.values(peers)
                .map((peer) => (
                    <>
                        {JSON.stringify(peer)}
                        <br />
                    </>
                ))}
        </div>
    )
}

export default Participants
