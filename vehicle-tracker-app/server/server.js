const express = require('express');
const cors = require('cors');
const app = express();
const port = 5001;

app.use(cors());

const vehicleData = [
  {"latitude": 16.94913, "longitude": 81.69065, "timestamp": "2024-08-02T10:00:00Z"},
  {"latitude": 17.99901, "longitude": 78.78282, "timestamp": "2024-08-02T10:00:05Z"},
  // Add more dummy data here
];

app.get('/api/vehicle', (req, res) => {
  res.json(vehicleData);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
