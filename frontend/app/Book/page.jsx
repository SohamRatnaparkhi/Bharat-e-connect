"use client";

import React from "react";
import { useState, useEffect } from "react";

const Book = () => {
  const [data, setData] = useState([]);
  // const [filteredData, setFilteredData] = useState([]);
  const [filter, setFilter] = useState("");
  useEffect(() => {
    fetch("api/nest/phonebook/")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setData(data);
      });
    const getData = async () => {
      const { data } = await axios.get("/api/nest/users/");
      setData(data);
    };
  }, []);
  return (
    <div>
      Full data:
      {JSON.stringify(data)}
      {/* <button onClick={handleLogin}>dvhsjk</button> */}
      <br />
      filtered data
      <br />
      <div>
        <label
          for="first_name"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          First name
        </label>
        <input
          type="text"
          id="first_name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="filter"
          required
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      {data
        .filter((item) => {
          return item.name.toLowerCase().includes(filter.toLowerCase());
        })
        .map((item) => {
          return (
            <div>
              <div>
                {item.name} : {item.address}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Book;
