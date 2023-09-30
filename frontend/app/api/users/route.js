import axios from "axios";
import { NextResponse } from "next/server";

const login = async (request) => {
    try {
        const backendURL = process.env.BACKEND_URL || "http://localhost:5000";
        const req = await request.json();
        console.log(backendURL + "/api/v1/users/login")
        console.log(req)
        const {data} = await axios.post(backendURL + "/api/v1/users/login", req);
        console.log(data)
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.error(error);
    }
}

const register = async (request) => {
    try {
        const backendURL = process.env.BACKEND_URL || "http://localhost:5000";
        const req = await request.json();
        const {data} = await axios.post(backendURL + "/api/v1/users/", req);
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.error(error);
    }
}

export {
    login as POST,
    register as PUT
}    