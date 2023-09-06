import { ENV } from "./EnvVars";

const HUDDLE_API_URL = ENV.HUDDLE_API_URL;
const CREATE_MEET_ROOM_URL = HUDDLE_API_URL + "/create-room";

export {
    CREATE_MEET_ROOM_URL
}