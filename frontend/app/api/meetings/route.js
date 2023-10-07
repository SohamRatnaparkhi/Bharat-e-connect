import { CREATE_MEET_ROOM_URL } from '@/app/constants/Api';
import { ENV } from '@/app/constants/EnvVars';
import prisma from '@/app/lib/PrismaDb';
import { NextResponse } from 'next/server';

async function createMeeting(request) {
    try {
        if (request.method === 'POST') {
            const {
                meetTitle,
                meetDescription,
                muteOnEntry,
                isPrivate,
                disableVideo,
                hostWalletAddresses,
                participantsWalletAddresses,
                date,
                startTime,
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
                        roomLocked: false,
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                        'x-api-key': ENV.API_KEY,
                    },
                }
            );
            // insert meeting into database
            const response = await res.json();
            console.log(`Date: ${date} startTime: ${startTime}`)
            const newMeeting = await prisma.meeting.create({
                data: {
                    hostAddresses: hostWalletAddresses,
                    participantAddresses: participantsWalletAddresses,
                    title: meetTitle,
                    roomId: response.data.roomId,
                    roomPassword: "",
                    contractAddress: "",
                    description: meetDescription,
                    meetConfig: {
                        videoDisabled: disableVideo,
                        isPrivate: isPrivate,
                        audioDisabled: muteOnEntry,
                        date: date,
                        startTime: startTime,
                    }
                },
            });
            // Return the Axios response to the client
            console.log(newMeeting)
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

const getAllMeetings = async (request) => {
    try {
        if (request.method === 'PATCH') {
            const body = await request.json();
            const myMeetings = await prisma.meeting.findMany({
                where: {
                    hostAddresses: {
                        has: body.address
                    }
                }
            });
            
            const myMeetings2 = await prisma.meeting.findMany({
                where: {
                    participantAddresses: {
                        has: body.address
                    }
                }
            });

            // const meetings = await prisma.meeting.findMany();
            return NextResponse.json({
                status: 200,
                data:  [...myMeetings, ...myMeetings2]
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

export {
    createMeeting as POST,
    getAllMeetings as PATCH,
}