const { NextResponse } = require("next/server");

const addParticipants = async (request, route) => {
    try {
        const roomId = (route.url.split('/').reverse()[1]);
        const meeting = await prisma.meeting.findMany({
            where: {
                roomId: roomId,
            },
        });
        if (!meeting) {
            return NextResponse.error({
                status: 404,
                error: 'Meeting not found',
            });
        }
        const { participants } = await request.json();
        const oldParticipants = meeting.participantAddresses;
        oldParticipants.push(...participants);
        const newMeeting = await prisma.meeting.update({
            where: {
                roomId: roomId,
            },
            data: {
                participantAddresses: oldParticipants,
            },
        });
        return NextResponse.json({
            status: 200,
            data: newMeeting,
        });
    } catch (error) {
        return NextResponse.error({
            status: 500,
            error: error.message,
        });
    }
}

const addRecording = async (request, route) => {
    try {
        const roomId = (route.url.split('/').reverse()[1]);
        const meeting = await prisma.meeting.findMany({
            where: {
                roomId: roomId,
            },
        });
        if (!meeting) {
            return NextResponse.error({
                status: 404,
                error: 'Meeting not found',
            });
        }
        const { recording } = await request.json();
        const oldRecording = meeting.recording;
        oldRecording.push(recording);
        const newMeeting = await prisma.meeting.update({
            where: {
                roomId: roomId,
            },
            data: {
                recording: oldRecording,
            },
        });
        return NextResponse.json({
            status: 200,
            data: newMeeting,
        });
    } catch (error) {
        return NextResponse.error({
            status: 500,
            error: error.message,
        });
    }
}

export {
    addParticipants as PUT,
    addRecording as PATCH,
}