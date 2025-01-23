const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { scrapeGFG } = require("./scraper");

const app = express();

app.use(cors());
app.use(bodyParser.json());

// API Route
app.get("/api/gfg/:username", async (req, res) => {
    const { username } = req.params;
    try {
        const data = await scrapeGFG(username);
        res.json({ username, data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Bind to the correct port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
