import axios from 'axios';
import { NextResponse } from 'next/server';

export async function POST(request) {
    console.log("object")
    try {
        if (request.method === 'POST') {
            console.log(request.body)
            const {
                meetTitle,
                meetDescription,
                muteOnEntry,
                disableVideo,
                hostWalletAddresses,
                API_KEY,
            } = await request.json();
            const res = await fetch(
                'https://api.huddle01.com/api/v1/create-room',
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
                        'x-api-key': API_KEY,
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
