import axios from "axios";
import { NextResponse } from "next/server";

const getUserPhoneBook = async (route) => {
    try {
        const backendURL = process.env.BACKEND_URL || "http://localhost:5000";
        const userId = (route.url.split('/').reverse()[0])
        console.log(backendURL + "/api/v1/phonebook/user/" + userId)
        const {data} = await axios.get(backendURL + "/api/v1/phonebook/user/" + userId);
        console.log(data)
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.error(error);
    }
}

export {
    getUserPhoneBook as GET
}