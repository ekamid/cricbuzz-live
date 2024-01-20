const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.send("Express on Vercel");
});

app.listen(5000, () => {
    console.log("Running on port 5000.");
});

// Export the Express API
module.exports = app;