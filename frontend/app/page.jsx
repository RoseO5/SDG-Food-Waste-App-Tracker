"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function Home() {
  const [wasteData, setWasteData] = useState([]);
  const [sector, setSector] = useState("");
  const [waste, setWaste] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch data from Supabase
  useEffect(() => {
    const fetchWasteData = async () => {
      let { data, error } = await supabase.from("waste").select("*");
      if (error) {
        console.error("Error fetching waste data:", error);
      } else {
        setWasteData(data);
      }
    };
    fetchWasteData();
  }, []);

  // Handle form submission (add new record)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase
      .from("waste")
      .insert([{ sector, waste: Number(waste) }]);

    if (error) {
      console.error("Insert error:", error);
    } else {
      setWasteData((prev) => [...prev, ...data]);
      setSector("");
      setWaste("");
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4 text-green-700">
        ♻️ SDG Food Waste Tracker
      </h1>

      <form onSubmit={handleSubmit} className="bg-white p-4 rounded-xl shadow-md mb-6 w-full max-w-sm">
        <input
          type="text"
          placeholder="Sector"
          value={sector}
          onChange={(e) => setSector(e.target.value)}
          className="w-full p-2 border mb-3 rounded"
          required
        />
        <input
          type="number"
          placeholder="Waste (kg)"
          value={waste}
          onChange={(e) => setWaste(e.target.value)}
          className="w-full p-2 border mb-3 rounded"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          {loading ? "Saving..." : "Add Record"}
        </button>
      </form>

      <div className="bg-white p-4 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-lg font-semibold mb-2 text-gray-800">Waste Records</h2>
        {wasteData.length > 0 ? (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="border-b p-2">Sector</th>
                <th className="border-b p-2">Waste (kg)</th>
              </tr>
            </thead>
            <tbody>
              {wasteData.map((item, index) => (
                <tr key={index}>
                  <td className="border-b p-2">{item.sector}</td>
                  <td className="border-b p-2">{item.waste}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500">No data yet</p>
        )}
      </div>
    </main>
  );
}
