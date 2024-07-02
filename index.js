const express = require("express");
const axios = require("axios");
const cors = require("cors");

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Route to call third-party API
app.use("*", async (req, res) => {
  try {
    const url = `127.0.0.1:4903${req.originalUrl}`;
    const response = await fetch(url, {
      method: req.method,
      ...(req?.method !== "GET" && { body: JSON.stringify(req.body) }),
      headers: req.headers,
    });
    const data = await response.json();

    return res.json(data);
  } catch (error) {
    return res.status(500).json({ error });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
