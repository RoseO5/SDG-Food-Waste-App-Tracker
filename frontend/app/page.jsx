"use client";
import { useState } from "react";

export default function Home() {
  const [data, setData] = useState([
    { sector: "Households", waste: 120 },
    { sector: "Restaurants", waste: 80 },
    { sector: "Supermarkets", waste: 50 },
    { sector: "Schools", waste: 30 },
  ]);

  const exportToCSV = () => {
    const headers = ["Sector", "Waste (kg)"];
    const rows = data.map(item => [item.sector, item.waste]);

    let csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map(e => e.join(",")).join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = "food_waste_data.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <main style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center" }}>🍽️ SDG Food Waste Tracker</h1>
      <p style={{ textAlign: "center" }}>
        Track and reduce food waste across different sectors.
      </p>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "20px",
        }}
      >
        <thead>
          <tr>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Sector</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Waste (kg)</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {item.sector}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {item.waste}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button
          onClick={exportToCSV}
          style={{
            background: "#0070f3",
            color: "#fff",
            border: "none",
            padding: "10px 20px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Export to CSV
        </button>
      </div>
    </main>
  );
}
