import { NextResponse } from 'next/server';
import prisma from '@/app/lib/PrismaDb';

async function getMeeting(route) {
    try {
        const roomId = (route.url.split('/').reverse()[0])
        console.log(roomId)
        const meeting = await prisma.meeting.findMany({
            where: {
                roomId: roomId,
            },
        });
        return NextResponse.json({
            status: 200,
            data: meeting[0],
        });
    } catch (error) {
        console.log(error)
        return NextResponse.error({
            status: 500,
            error: error.message,
        });
    }
}

export {
    getMeeting as GET,
}