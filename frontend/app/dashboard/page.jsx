"use client";
import { useState } from "react";

export default function Dashboard() {
  const [entries, setEntries] = useState([
    { sector: "Restaurant", foodType: "Rice", quantity: 25, date: "2025-09-26" },
    { sector: "Supermarket", foodType: "Bread", quantity: 10, date: "2025-09-25" },
  ]);

  const [formData, setFormData] = useState({
    sector: "",
    foodType: "",
    quantity: "",
    date: "",
  });

  // Handle form input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  // Add new entry
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.sector && formData.foodType && formData.quantity && formData.date) {
      setEntries([...entries, formData]);
      setFormData({ sector: "", foodType: "", quantity: "", date: "" });
    }
  };

  // Export table to CSV
  const exportToCSV = () => {
    let rows = [
      ["Sector", "Food Type", "Quantity (kg)", "Date"],
      ...entries.map((e) => [e.sector, e.foodType, e.quantity, e.date]),
    ];

    let csvContent = "data:text/csv;charset=utf-8," + rows.map(r => r.join(",")).join("\n");
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", "food_waste_data.csv");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", background: "#f5f6fa", minHeight: "100vh" }}>
      <header style={{ background: "#2c3e50", color: "white", padding: "1rem", textAlign: "center" }}>
        <h1>Food Waste Tracker Dashboard</h1>
      </header>

      <div style={{ padding: "2rem", maxWidth: "900px", margin: "auto" }}>
        {/* Form Section */}
        <div style={{ marginBottom: "2rem", padding: "1rem", background: "white", borderRadius: "6px", boxShadow: "0 2px 6px rgba(0,0,0,0.1)" }}>
          <h2>Add New Waste Entry</h2>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "1rem" }}>
              <label>Sector</label>
              <select id="sector" value={formData.sector} onChange={handleChange} required style={inputStyle}>
                <option value="">Select sector</option>
                <option>Restaurant</option>
                <option>Supermarket</option>
                <option>Household</option>
                <option>School</option>
                <option>Other</option>
              </select>
            </div>
            <div style={{ marginBottom: "1rem" }}>
              <label>Food Type</label>
              <input id="foodType" type="text" value={formData.foodType} onChange={handleChange} required style={inputStyle} />
            </div>
            <div style={{ marginBottom: "1rem" }}>
              <label>Quantity (kg)</label>
              <input id="quantity" type="number" value={formData.quantity} onChange={handleChange} required style={inputStyle} />
            </div>
            <div style={{ marginBottom: "1rem" }}>
              <label>Date</label>
              <input id="date" type="date" value={formData.date} onChange={handleChange} required style={inputStyle} />
            </div>
            <button type="submit" style={btnStyle}>Add Entry</button>
          </form>
        </div>

        {/* Export Button */}
        <button onClick={exportToCSV} style={{ ...btnStyle, background: "#2980b9" }}>
          Export to CSV
        </button>

        {/* Table */}
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "1rem" }}>
          <thead>
            <tr>
              <th style={thStyle}>Sector</th>
              <th style={thStyle}>Food Type</th>
              <th style={thStyle}>Quantity (kg)</th>
              <th style={thStyle}>Date</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry, index) => (
              <tr key={index}>
                <td style={tdStyle}>{entry.sector}</td>
                <td style={tdStyle}>{entry.foodType}</td>
                <td style={tdStyle}>{entry.quantity}</td>
                <td style={tdStyle}>{entry.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "0.5rem",
  border: "1px solid #ccc",
  borderRadius: "4px",
};

const btnStyle = {
  display: "inline-block",
  padding: "0.6rem 1rem",
  margin: "0.5rem 0",
  background: "#27ae60",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

const thStyle = {
  padding: "0.8rem",
  border: "1px solid #ccc",
  textAlign: "left",
  background: "#34495e",
  color: "white",
};

const tdStyle = {
  padding: "0.8rem",
  border: "1px solid #ccc",
  textAlign: "left",
};
