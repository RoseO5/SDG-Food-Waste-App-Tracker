"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from /api/waste when the page loads
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/waste");
        const json = await res.json();
        setData(json);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const exportToCSV = () => {
    if (!data.length) return;

    const headers = ["Sector", "Waste (kg)"];
    const rows = data.map(item => [item.sector, item.waste]);

    let csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map(e => e.join(",")).join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = "waste-data.csv";
    link.click();
  };

  if (loading) return <p>Loading...</p>;

  return (
    <main style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>SDG Food Waste Tracker</h1>
      <table border="1" cellPadding="10" style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>Sector</th>
            <th>Waste (kg)</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => (
            <tr key={i}>
              <td>{item.sector}</td>
              <td>{item.waste}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={exportToCSV}
        style={{
          marginTop: "20px",
          padding: "10px 15px",
          backgroundColor: "green",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Export to CSV
      </button>
    </main>
  );
}
