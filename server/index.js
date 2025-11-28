const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

const wasteSchema = new mongoose.Schema({
  sector: String,
  foodItem: String,
  quantity: Number,
  unit: String,
  reason: String,
  date: String
});
const Waste = mongoose.model("Waste", wasteSchema);

app.post("/api/waste/record", async (req, res) => {
  try {
    const entry = new Waste(req.body);
    await entry.save();
    res.status(200).json({ message: "Recorded successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to record waste" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
