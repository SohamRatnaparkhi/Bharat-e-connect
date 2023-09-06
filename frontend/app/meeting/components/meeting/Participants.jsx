import React from 'react'

const Participants = ({ peers }) => {
    return (
        <div>
            {Object.values(peers)
                .map((peer) => (
                    <>
                        {peer.displayName?.split(',')?.[0]}
                        <br />
                    </>
                ))}
        </div>
    )
}

export default Participants
