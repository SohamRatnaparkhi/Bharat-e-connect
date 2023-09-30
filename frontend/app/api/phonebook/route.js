import axios from "axios";
import { NextResponse } from "next/server";

const getAllContacts = async () => {
    try {
        const backendURL = process.env.BACKEND_URL;
        console.log("in")
        console.log(backendURL + "/api/v1/phonebook")
        const {data} = await axios.get(backendURL + "/api/v1/phonebook");
        console.log(data)
        console.log("in")
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.error(error);
    }
};

const addContact = async (request) => {
    try {
        const backendURL = process.env.BACKEND_URL || "http://localhost:5000";
        const req = await request.json();
        const {data} = await axios.post(backendURL + "/api/v1/phonebook", req);
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.error(error);
    }
};


export {
    getAllContacts as GET,
    addContact as POST
}