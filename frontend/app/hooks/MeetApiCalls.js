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

const getMeeting = async (roomId) => {
    try {
        console.log("In outer")
        const { data, status, error } = await axios.get(`/api/meetings/${roomId}`);
        console.log(data, status, error)
        if (status === 200) {
            return {
                data,
                error: null,
            }
        }
        return {
            data,
            error: error,
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
    getMeeting,
}

