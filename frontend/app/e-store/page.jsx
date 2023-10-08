"use client";

import React from "react";
import { useState } from "react";
import Button from "../components/Button";
import storeData from "./fileData.json"

const Dashboard = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const data = storeData["e-store-data"]; 
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    return (
        <div className="flex flex-col h-full">
            <header className="flex items-center justify-between h-16 px-6 bg-white">
                <h1 className="text-xl font-bold">Bharat e-Store</h1>
                <div className="flex items-center">
                    <input
                        type="search"
                        placeholder="Search in Store"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </div>
            </header>
            <main className="flex-1 overflow-auto">
                <section className="p-6">
                    <h3>My Store</h3>
                    <table className="w-full mt-4">
                        <thead>
                            <tr>
                                <th className="text-left">Name</th>
                                <th className="text-left">File Type</th>
                                <th className="text-left">Date</th>
                                <th className="text-left">Share</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((file) => (
                                <tr key={file.id} className="hover:bg-[#dddddd] ease-in-out duration-300">
                                    <td>{file.name}</td>
                                    <td>{file.type}</td>
                                    <td>{file.date}</td>
                                    <td><Button>Share file</Button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </main>
        </div>
    );
};

export default Dashboard;
