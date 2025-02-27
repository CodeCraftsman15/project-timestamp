const express = require("express");
const cors = require("cors");

const app = express();

// Enable CORS for FCC testing
app.use(cors({ optionsSuccessStatus: 200 }));

// Serve static files
app.use(express.static("public"));

// Root route serves an HTML file
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

// API Endpoint: Timestamp Microservice
app.get("/api/timestamp/:date?", (req, res) => {
  let { date } = req.params;

  // Handle Empty Input - Return Current Time
  if (!date) {
    let now = new Date();
    return res.json({
      unix: now.getTime(),
      utc: now.toUTCString(),
    });
  }

  // Handle UNIX timestamps correctly
  if (/^\d+$/.test(date)) {
    date = parseInt(date); // Convert to integer
  }

  let parsedDate = new Date(date);

  // Handle Invalid Dates
  if (parsedDate.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  // Return Valid JSON Response
  res.json({
    unix: parsedDate.getTime(),
    utc: parsedDate.toUTCString(),
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Your app is listening on port ${PORT}`);
});
