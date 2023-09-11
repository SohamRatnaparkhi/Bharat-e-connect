import { getMeetType } from '@/app/hooks/MeetApiCalls';
import React from 'react'

const MeetTypeMiddleware = async ({ params }) => {
    const meetType = await getMeetType(params.meetId);

    return (
        <div>

        </div>
    )
}

export default MeetTypeMiddleware
