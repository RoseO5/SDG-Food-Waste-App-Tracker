"use client";

import { useState, FormEvent, ChangeEvent } from "react";

interface WasteEntry {
  sector: string;
  foodItem: string;
  quantity: string;
  unit: string;
  reason: string;
  date: string;
}

export default function Home() {
  const [wasteEntry, setWasteEntry] = useState<WasteEntry>({
    sector: "household",
    foodItem: "",
    quantity: "",
    unit: "kg",
    reason: "spoilage",
    date: new Date().toISOString().split("T")[0],
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const sectors = [
    "household",
    "restaurant",
    "cafe",
    "bakery",
    "supermarket",
    "retail",
    "school",
    "hospital",
    "farm",
  ];

  const foodItems = [
    "Chicken",
    "Fish",
    "Bread",
    "Eggs",
    "Sardines",
    "Beans",
    "Tomatoes",
    "Beef",
    "Pork",
    "Rice",
    "Salad",
    "Prawns",
    "Fruits",
    "Vegetables",
    "Dairy",
  ];

  const reasons = [
    "spoilage",
    "overproduction",
    "cosmetic_standards",
    "expiration",
    "portion_waste",
    "damaged_packaging",
  ];

  const handleChange = (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setWasteEntry({ ...wasteEntry, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (!wasteEntry.foodItem || !wasteEntry.quantity || !wasteEntry.sector) {
      setMessage("Please fill in all required fields");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/waste/record", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(wasteEntry),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Food waste record added successfully!");
        setWasteEntry({
          ...wasteEntry,
          foodItem: "",
          quantity: "",
          date: new Date().toISOString().split("T")[0],
        });
      } else {
        setMessage(`Error: ${data.error || "Failed to record waste"}`);
      }
    } catch (error: any) {
      setMessage(`Network error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", maxWidth: 800, margin: "0 auto", padding: 20, minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <div style={{ backgroundColor: "white", padding: 30, borderRadius: 10, boxShadow: "0 0 10px rgba(0,0,0,0.1)", marginBottom: 20 }}>
        <h1 style={{ color: "#2c7873", textAlign: "center", marginBottom: 30 }}>🌱 SDG Food Waste Tracker</h1>
        <p style={{ textAlign: "center", color: "#666", marginBottom: 30, fontSize: 16 }}>
          Track food waste across different sectors to support Sustainable Development Goal 12
        </p>

        {message && (
          <div style={{
            padding: 10,
            margin: "20px 0",
            backgroundColor: message.includes("Error") ? "#ffebee" : "#e8f5e8",
            border: `1px solid ${message.includes("Error") ? "#ffcdd2" : "#c8e6c9"}`,
            borderRadius: 5,
            color: message.includes("Error") ? "#c62828" : "#2e7d32"
          }}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "grid", gap: 20 }}>
          <div>
            <label style={{ display: "block", marginBottom: 5, fontWeight: "bold", color: "#555" }}>Sector:</label>
            <select name="sector" value={wasteEntry.sector} onChange={handleChange} style={{ width: "100%", padding: 12, border: "1px solid #ddd", borderRadius: 5, fontSize: 16 }}>
              {sectors.map((s) => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
            </select>
          </div>

          <div>
            <label style={{ display: "block", marginBottom: 5, fontWeight: "bold", color: "#555" }}>Food Item:</label>
            <select name="foodItem" value={wasteEntry.foodItem} onChange={handleChange} required style={{ width: "100%", padding: 12, border: "1px solid #ddd", borderRadius: 5, fontSize: 16 }}>
              <option value="">Select food item...</option>
              {foodItems.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <div style={{ flex: 2 }}>
              <label style={{ display: "block", marginBottom: 5, fontWeight: "bold", color: "#555" }}>Quantity:</label>
              <input type="number" name="quantity" value={wasteEntry.quantity} onChange={handleChange} required min="0" step="0.1" placeholder="0.0" style={{ width: "100%", padding: 12, border: "1px solid #ddd", borderRadius: 5, fontSize: 16 }} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: "block", marginBottom: 5, fontWeight: "bold", color: "#555" }}>Unit:</label>
              <select name="unit" value={wasteEntry.unit} onChange={handleChange} style={{ width: "100%", padding: 12, border: "1px solid #ddd", borderRadius: 5, fontSize: 16 }}>
                <option value="kg">kg</option>
                <option value="grams">grams</option>
                <option value="units">units</option>
                <option value="liters">liters</option>
              </select>
            </div>
          </div>

          <div>
            <label style={{ display: "block", marginBottom: 5, fontWeight: "bold", color: "#555" }}>Reason for Waste:</label>
            <select name="reason" value={wasteEntry.reason} onChange={handleChange} style={{ width: "100%", padding: 12, border: "1px solid #ddd", borderRadius: 5, fontSize: 16 }}>
              {reasons.map((r) => <option key={r} value={r}>{r.split("_").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}</option>)}
            </select>
          </div>

          <div>
            <label style={{ display: "block", marginBottom: 5, fontWeight: "bold", color: "#555" }}>Date:</label>
            <input type="date" name="date" value={wasteEntry.date} onChange={handleChange} style={{ width: "100%", padding: 12, border: "1px solid #ddd", borderRadius: 5, fontSize: 16 }} />
          </div>

          <button type="submit" disabled={loading} style={{ backgroundColor: "#2c7873", color: "white", padding: 14, border: "none", borderRadius: 5, cursor: "pointer", fontSize: 16, fontWeight: "bold", marginTop: 10 }}>
            {loading ? "Recording..." : "Record Food Waste"}
          </button>
        </form>
      </div>

      <div style={{ backgroundColor: "white", padding: 20, borderRadius: 10, boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}>
        <h3 style={{ color: "#2c7873", marginTop: 0 }}>How It Helps SDG 12:</h3>
        <ul style={{ color: "#555", lineHeight: 2 }}>
          <li>📈 <strong>Track Progress:</strong> Monitor reduction in food waste over time</li>
          <li>💰 <strong>Saving Money:</strong> Reduce unnecessary food purchases and spoilage</li>
          <li>🌍 <strong>Environmental Impact:</strong> Lower greenhouse gas emissions from landfills</li>
          <li>📊 <strong>Data for Change:</strong> Provide insights for policy makers and organizations</li>
        </ul>
      </div>
    </div>
  );
}
