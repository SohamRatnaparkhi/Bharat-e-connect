import axios from "axios";

const createMeeting = async (meetPresets) => {
    try {
        const { data } = await axios.post('/api/meetings', {
            ...meetPresets
        });
        return {
            data,
            error: null,
        }
    } catch (error) {
        return {
            data: null,
            error: error,
        }
    }
};

const getMeetType = async (roomId) => {
    try {
        const { data } = await axios.get(`/api/meetings/${roomId}`);
        return {
            data,
            error: null,
        }
    } catch (error) {
        return {
            data: null,
            error: error,
        }
    }
}
export {
    createMeeting,
    getMeetType,
}

