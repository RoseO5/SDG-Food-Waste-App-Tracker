"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [wasteData, setWasteData] = useState([]);
  const [sector, setSector] = useState("");
  const [waste, setWaste] = useState("");

  // Fetch data from MongoDB API route
  const fetchData = async () => {
    const res = await fetch("/api/waste");
    const data = await res.json();
    setWasteData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Insert new record
  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/waste", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sector, waste }),
    });

    const result = await res.json();

    if (!result.error) {
      fetchData(); // refresh list
      setSector("");
      setWaste("");
    }
  };

  return (
    <main style={{ padding: "20px" }}>
      <h1>Food Waste Tracker (MongoDB)</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Sector"
          value={sector}
          onChange={(e) => setSector(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Waste"
          value={waste}
          onChange={(e) => setWaste(e.target.value)}
          required
        />
        <button type="submit">Add Record</button>
      </form>

      <h2>Records:</h2>
      <ul>
        {wasteData.map((item) => (
          <li key={item._id}>
            {item.sector}: {item.waste}
          </li>
        ))}
      </ul>
    </main>
  );
}
