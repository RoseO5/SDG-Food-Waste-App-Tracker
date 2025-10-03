"use client";
import { useState } from "react";

export default function Home() {
  const [data, setData] = useState([
    { sector: "Households", waste: 120 },
    { sector: "Restaurants", waste: 80 },
    { sector: "Supermarkets", waste: 50 },
    { sector: "Schools", waste: 30 },
  ]);

  // Export to CSV function
  const exportToCSV = () => {
    const headers = ["Sector", "Waste (kg)"];
    const rows = data.map(item => [item.sector, item.waste]);

    let csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "food_waste_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ color: "#2c3e50" }}>SDG Food Waste Tracker</h1>
      <p>Track and reduce food waste across different sectors.</p>

      <table
        border="1"
        cellPadding="10"
        style={{
          borderCollapse: "collapse",
          width: "100%",
          marginTop: "20px",
        }}
      >
        <thead style={{ backgroundColor: "#f2f2f2" }}>
          <tr>
            <th>Sector</th>
            <th>Waste (kg)</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
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
          backgroundColor: "#27ae60",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Export to CSV
      </button>
    </div>
  );
}
