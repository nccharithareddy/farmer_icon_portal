const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const marketData = {
  tomato: {
    bangalore: [1200, 1400, 1300, 1500, 1700],
    mysore: [1100, 1200, 1250, 1400, 1600]
  },
  onion: {
    bangalore: [1000, 1100, 900, 1200, 1300],
    mysore: [950, 1000, 1050, 1150, 1250]
  },
  rice: {
    bangalore: [2000, 2100, 1900, 2200, 2300],
    mysore: [1900, 2000, 2100, 2200, 2250]
  }
};

app.get("/api/prices", (req, res) => {
  const { crop, location } = req.query;

  if (!marketData[crop] || !marketData[crop][location]) {
    return res.status(404).json({ error: "Data not found" });
  }

  res.json({
    prices: marketData[crop][location]
  });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log("Server running on http://localhost:3000");
});