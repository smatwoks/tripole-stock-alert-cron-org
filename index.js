const express = require("express");
const axios = require("axios");

const app = express();
app.get("/", (req, res) => {
  res.send("Server Running");
});

app.get("/check-stock", async (req, res) => {
  try {
    const { data } = await axios.get(
      "https://tripole.in/products/tripole-walker-pro-60-litre-rucksack-for-trekking-and-hiking-black.js"
    );

    const variant = data.variants.find(
      v => v.id === 54761702129955
    );

    if (variant?.available) {
      await axios.post(
        "https://ntfy.sh/tripole-bhumireddy-alert",
        "🚨 Tripole Walker Pro 60L is AVAILABLE!"
      );
    }

    res.send("Checked successfully");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
