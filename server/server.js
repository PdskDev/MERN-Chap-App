const express = require("express");
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.SERVER_PORT || 8080;

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.get("/", (request, response) => {
  response.json({
    message: `Server running at ${PORT}`,
  });
});

app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
