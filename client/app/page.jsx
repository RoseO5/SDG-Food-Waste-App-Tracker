import React, { useState } from "react";

export default function Home() {
  const [wasteEntry, setWasteEntry] = useState({
    sector: "household",
    foodItem: "",
    quantity: "",
    unit: "kg",
    reason: "spoilage",
    date: new Date().toISOString().split("T")[0]
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const sectors = ["household","restaurant","cafe","bakery","supermarket","retail","school","hospital","farm"];
  const foodItems = ["Chicken","Fish","Bread","Eggs","Sardines","Beans","Tomatoes","Beef","Pork","Rice","Salad","Prawns","Fruits","Vegetables","Dairy"];
  const reasons = ["spoilage","overproduction","cosmetic_standards","expiration","portion_waste","damaged_packaging"];

  const handleChange = (e) => {
    setWasteEntry({...wasteEntry,[e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    if (!wasteEntry.foodItem || !wasteEntry.quantity || !wasteEntry.sector) {
      setMessage("Please fill in all required fields");
      setLoading(false);
      return;
    }
    try {
      const response = await fetch("/api/waste/record", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(wasteEntry)
      });
      const data = await response.json();
      if (response.ok) {
        setMessage("Food waste record added successfully!");
        setWasteEntry({...wasteEntry, foodItem:"", quantity:"", date:new Date().toISOString().split("T")[0]});
      } else {
        setMessage(`Error: ${data.error || "Failed to record waste"}`);
      }
    } catch (err) {
      setMessage(`Network error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{fontFamily:"Arial, sans-serif",maxWidth:"800px",margin:"0 auto",padding:"20px",backgroundColor:"#f5f5f5",minHeight:"100vh"}}>
      <div style={{backgroundColor:"white",padding:"30px",borderRadius:"10px",boxShadow:"0 0 10px rgba(0,0,0,0.1)",marginBottom:"20px"}}>
        <h1 style={{color:"#2c7873",textAlign:"center",marginBottom:"30px"}}>🌱 SDG Food Waste Tracker</h1>
        <p style={{textAlign:"center",color:"#666",marginBottom:"30px",fontSize:"16px"}}>Track food waste across different sectors to support Sustainable Development Goal 12</p>
        {message && <div style={{padding:"10px",margin:"20px 0",backgroundColor: message.includes("Error") ? "#ffebee" : "#e8f5e8",border: `1px solid ${message.includes("Error") ? "#ffcdd2" : "#c8e6c9"}`,borderRadius:"5px",color: message.includes("Error") ? "#c62828" : "#2e7d32"}}>{message}</div>}
        <form onSubmit={handleSubmit} style={{display:"grid",gap:"20px"}}>
          <div>
            <label style={{display:"block",marginBottom:"5px",fontWeight:"bold",color:"#555"}}>Sector:</label>
            <select name="sector" value={wasteEntry.sector} onChange={handleChange} style={{width:"100%",padding:"12px",border:"1px solid #ddd",borderRadius:"5px",fontSize:"16px"}}>
              {sectors.map(s=> <option key={s} value={s}>{s.charAt(0).toUpperCase()+s.slice(1)}</option>)}
            </select>
          </div>
          <div>
            <label style={{display:"block",marginBottom:"5px",fontWeight:"bold",color:"#555"}}>Food Item:</label>
            <select name="foodItem" value={wasteEntry.foodItem} onChange={handleChange} required style={{width:"100%",padding:"12px",border:"1px solid #ddd",borderRadius:"5px",fontSize:"16px"}}>
              <option value="">Select food item...</option>
              {foodItems.map(i=> <option key={i} value={i}>{i}</option>)}
            </select>
          </div>
          <div style={{display:"flex",gap:"10px"}}>
            <div style={{flex:2}}>
              <label style={{display:"block",marginBottom:"5px",fontWeight:"bold",color:"#555"}}>Quantity:</label>
              <input type="number" name="quantity" value={wasteEntry.quantity} onChange={handleChange} required min="0" step="0.1" placeholder="0.0" style={{width:"100%",padding:"12px",border:"1px solid #ddd",borderRadius:"5px",fontSize:"16px"}}/>
            </div>
            <div style={{flex:1}}>
              <label style={{display:"block",marginBottom:"5px",fontWeight:"bold",color:"#555"}}>Unit:</label>
              <select name="unit" value={wasteEntry.unit} onChange={handleChange} style={{width:"100%",padding:"12px",border:"1px solid #ddd",borderRadius:"5px",fontSize:"16px"}}>
                <option value="kg">kg</option>
                <option value="grams">grams</option>
                <option value="units">units</option>
                <option value="liters">liters</option>
              </select>
            </div>
          </div>
          <div>
            <label style={{display:"block",marginBottom:"5px",fontWeight:"bold",color:"#555"}}>Reason for Waste:</label>
            <select name="reason" value={wasteEntry.reason} onChange={handleChange} style={{width:"100%",padding:"12px",border:"1px solid #ddd",borderRadius:"5px",fontSize:"16px"}}>
              {reasons.map(r=> <option key={r} value={r}>{r.split("_").map(w=>w.charAt(0).toUpperCase()+w.slice(1)).join(" ")}</option>)}
            </select>
          </div>
          <div>
            <label style={{display:"block",marginBottom:"5px",fontWeight:"bold",color:"#555"}}>Date:</label>
            <input type="date" name="date" value={wasteEntry.date} onChange={handleChange} style={{width:"100%",padding:"12px",border:"1px solid #ddd",borderRadius:"5px",fontSize:"16px"}}/>
          </div>
          <button type="submit" disabled={loading} style={{backgroundColor:"#2c7873",color:"white",padding:"14px",border:"none",borderRadius:"5px",cursor:"pointer",fontSize:"16px",fontWeight:"bold",marginTop:"10px"}}>{loading ? "Recording..." : "Record Food Waste"}</button>
        </form>
      </div>
    </div>
  );
}
