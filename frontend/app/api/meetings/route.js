import { CREATE_MEET_ROOM_URL } from '@/app/constants/Api';
import { ENV } from '@/app/constants/EnvVars';
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        if (request.method === 'POST') {
            console.log(request.body)
            const {
                meetTitle,
                meetDescription,
                muteOnEntry,
                disableVideo,
            } = await request.json();
            const res = await fetch(
                CREATE_MEET_ROOM_URL,
                {
                    method: 'POST',
                    body: JSON.stringify({
                        title: meetTitle,
                        description: meetDescription,
                        muteOnEntry: muteOnEntry,
                        videoOnEntry: disableVideo,
                        roomLocked: true,
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                        'x-api-key': ENV.API_KEY,
                    },
                }
            );
            // Return the Axios response to the client
            const response = await res.json();
            console.log(response)
            return NextResponse.json({
                status: response.status,
                data: response.data,
            });
        } else {
            return NextResponse.error('Method not allowed', 405);
        }
    } catch (error) {
        return NextResponse.json({
            status: 500,
            error: error.message,
        });
    }
}
