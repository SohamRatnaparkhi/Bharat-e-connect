import axios from "axios";
import { NextResponse } from "next/server";

const getAllContacts = async () => {
    try {
        const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";
        const {data} = await axios.get(backendURL + "/api/phonebook");
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.error(error);
    }
};

const addContact = async (request) => {
    try {
        const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";
        const req = await request.json();
        const {data} = await axios.post(backendURL + "/api/phonebook", req);
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.error(error);
    }
};


export {
    getAllContacts as GET,
    addContact as POST
}