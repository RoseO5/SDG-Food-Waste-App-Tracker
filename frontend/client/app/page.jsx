"use client";

import { useEffect, useState, useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const API = "/api/waste";

// helper: group by sector
function groupBySector(list) {
  const map = {};
  for (const r of list) {
    const s = r.sector || "Unknown";
    map[s] = (map[s] || 0) + Number(r.waste || 0);
  }
  return map;
}

export default function Home() {
  const [data, setData] = useState([]);
  const [sector, setSector] = useState("");
  const [waste, setWaste] = useState("");
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      setLoading(true);
      const res = await fetch(API);
      const json = await res.json();
      setData(json || []);
    } catch (e) {
      console.error(e);
      alert("Error loading data");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e) {
    e && e.preventDefault();
    const w = Number(waste);
    if (!sector || !w) return alert("Please fill sector and numeric waste");

    setLoading(true);

    try {
      if (editing) {
        // update
        const res = await fetch(API, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editing._id, sector, waste: w })
        });
        if (!res.ok) throw new Error((await res.json()).error || "Update failed");
        setEditing(null);
      } else {
        // create
        const res = await fetch(API, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sector, waste: w })
        });
        if (!res.ok) throw new Error((await res.json()).error || "Insert failed");
      }
      setSector("");
      setWaste("");
      await load();
    } catch (err) {
      console.error(err);
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  function startEdit(item) {
    setEditing(item);
    setSector(item.sector);
    setWaste(item.waste);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function doDelete(id) {
    if (!confirm("Delete this record?")) return;
    setLoading(true);
    try {
      const res = await fetch(API + `?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error((await res.json()).error || "Delete failed");
      await load();
    } catch (err) {
      console.error(err);
      alert("Error deleting: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  // CSV export
  function exportCSV() {
    const headers = ["Sector", "Waste"];
    const rows = data.map((r) => [r.sector, r.waste]);
    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "waste_data.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  const grouped = useMemo(() => groupBySector(data), [data]);
  const chartData = {
    labels: Object.keys(grouped),
    datasets: [
      {
        label: "Waste (kg)",
        data: Object.values(grouped),
        backgroundColor: "rgba(75, 192, 192, 0.6)"
      }
    ]
  };

  return (
    <main style={{ fontFamily: "system-ui, sans-serif", padding: 20, maxWidth: 900, margin: "0 auto" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ margin: 0 }}>♻️ SDG Food Waste Tracker</h1>
        <div>
          <button onClick={exportCSV} style={{ marginRight: 8 }}>Export CSV</button>
          <button onClick={load}>Refresh</button>
        </div>
      </header>

      <section style={{ marginTop: 20, background: "#fff", padding: 16, borderRadius: 8, boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
        <h3 style={{ marginTop: 0 }}>{editing ? "Edit Record" : "Add New Record"}</h3>
        <form onSubmit={handleSubmit} style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <input placeholder="Sector" value={sector} onChange={(e) => setSector(e.target.value)} style={{ padding: 8, minWidth: 200 }} />
          <input placeholder="Waste (kg)" value={waste} onChange={(e) => setWaste(e.target.value)} style={{ padding: 8, width: 140 }} />
          <div style={{ display: "flex", gap: 8 }}>
            <button type="submit" disabled={loading}>{editing ? "Save" : "Add"}</button>
            {editing && <button type="button" onClick={() => { setEditing(null); setSector(""); setWaste(""); }}>Cancel</button>}
          </div>
        </form>
      </section>

      <section style={{ marginTop: 20, display: "grid", gridTemplateColumns: "1fr 420px", gap: 20 }}>
        <div>
          <h3>Records</h3>
          {loading ? <p>Loading...</p> : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={{ textAlign: "left", borderBottom: "1px solid #ddd", padding: 8 }}>Sector</th>
                  <th style={{ textAlign: "left", borderBottom: "1px solid #ddd", padding: 8 }}>Waste (kg)</th>
                  <th style={{ borderBottom: "1px solid #ddd", padding: 8 }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.length === 0 ? (
                  <tr><td colSpan="3" style={{ padding: 8 }}>No records</td></tr>
                ) : data.map((r) => (
                  <tr key={r._id} style={{ borderBottom: "1px solid #f0f0f0" }}>
                    <td style={{ padding: 8 }}>{r.sector}</td>
                    <td style={{ padding: 8 }}>{r.waste}</td>
                    <td style={{ padding: 8 }}>
                      <button onClick={() => startEdit(r)} style={{ marginRight: 6 }}>Edit</button>
                      <button onClick={() => doDelete(r._id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div style={{ background: "#fff", padding: 12, borderRadius: 8, boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
          <h3 style={{ marginTop: 0 }}>Waste by Sector</h3>
          {Object.keys(grouped).length === 0 ? <p>No data</p> : <Bar data={chartData} />}
          <div style={{ marginTop: 12 }}>
            <strong>Total:</strong> {data.reduce((s, r) => s + (Number(r.waste) || 0), 0)} kg
          </div>
        </div>
      </section>
    </main>
  );
}
