const path = require("path");
const express = require("express");
const app = express();


const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/build", express.static(path.join(__dirname, "../build")));
app.get("/", (req, res) => {
    return res.status(200).sendFile(path.join(__dirname, "../src/index.html"));
});

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}...`);
});

module.exports = app;