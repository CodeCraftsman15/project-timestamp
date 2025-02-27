const express = require("express");
const cors = require("cors");
const app = express();

// Enable CORS so that your API is remotely testable by FCC
app.use(cors({ optionsSuccessStatus: 200 }));

// Serve static files from the 'public' folder
app.use(express.static("public"));

// Root route: serve the index.html file
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

// Example test endpoint (not required by the timestamp project, but typically included)
app.get("/api/hello", (req, res) => {
  res.json({ greeting: "hello API" });
});

/**
 * Timestamp API:
 * Route: /api/:date?
 * - If :date is empty => returns current time
 * - If :date is valid => returns UTC and Unix
 * - If :date is invalid => returns { error: "Invalid Date" }
 */
app.get("/api/:date?", (req, res) => {
  let dateInput = req.params.date;
  let date;

  // 1) If no date is provided, use current date/time
  if (!dateInput) {
    date = new Date();
  } else {
    // 2) If the date param is only digits, treat it as a Unix timestamp in ms
    if (/^\d+$/.test(dateInput)) {
      date = new Date(parseInt(dateInput));
    } else {
      // Otherwise, try to parse it as a normal date string
      date = new Date(dateInput);
    }
  }

  // 3) Check if it's an invalid date
  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  // 4) Return valid date in JSON
  res.json({
    unix: date.getTime(),            // number of milliseconds since 1970
    utc: date.toUTCString(),         // e.g. 'Fri, 25 Dec 2015 00:00:00 GMT'
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Your app is listening on port " + PORT);
});
