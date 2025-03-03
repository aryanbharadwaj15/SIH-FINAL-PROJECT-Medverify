const express = require("express");
const fetch = require("node-fetch");

const app = express();

app.get("/fetch", async (req, res) => {
    const targetUrl = req.query.url;
    try {
        const response = await fetch(targetUrl);
        const data = await response.text();
        res.send(data);
    } catch (error) {
        res.status(500).send("Error fetching data");
    }
});

app.listen(5500, () => {
    console.log("Server is running on http://localhost:3000");
});
